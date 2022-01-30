from django.http import HttpResponse
from django.contrib import messages
from django.shortcuts import redirect
from instamojo_wrapper import Instamojo
from skill_india.settings import PAYMENT_API_AUTH_TOKEN, PAYMENT_API_KEY
from website.models import Application, Job, PaymentMethod

api = Instamojo(api_key=PAYMENT_API_KEY, auth_token=PAYMENT_API_AUTH_TOKEN, endpoint='https://test.instamojo.com/api/1.1/')


def payment_method(request, job_id):
    user = request.user.email
    job = Job.objects.get(id=job_id)

    application = Application.objects.get(job=job, user=request.user)
    payment = PaymentMethod.objects.create(application=application, user=request.user)
# Create a new Payment Request
    response = api.payment_request_create(
    amount = job.amount,
    purpose = job.job_name,
    send_email = True,
    email = request.user.email,
    redirect_url = "http://localhost:8000/payment_status/" + str(payment.id) + "/" + str(application.id)
    )
    payment_id = response['payment_request']['id']
    payment.payment_id = payment_id
    payment.save()
    # print the long URL of the payment request.
    return redirect(response['payment_request']['longurl'])
    # print the unique ID(or payment request ID)
    

def payment_status(request, pid, aid):
    payment = PaymentMethod.objects.get(id=pid)
    application = Application.objects.get(id=aid)
    response = api.payment_request_status(payment.payment_id)
    status = response['payment_request']['status']
    print(status)
    if status == 'Credit':
        payment.payment_status = status
        application.payment_status1 = status
        payment.save()
        application.save()
        messages.success(request, 'your payment is successfully completed.')
    return redirect('candidate')

import json
import razorpay
from django.views import View
from django.conf import settings
keyid = settings.RAZORPAY_KEYID
keysecret = settings.RAZORPAY_KEYSECRET
razorpay_client = razorpay.Client(auth=(keyid, keysecret))


class PayFee(View):
    def get(self, request):
        return redirect("home")
    def post(self, request):
        job = Job.objects.get(id=request.POST["job_id"])
        application = Application.objects.get(job=job, user=request.user)
        Payment = PaymentMethod.objects.create(application=application, user=request.user)

        amount = int(job.amount)
        payment = razorpay_client.order.create(
            {'amount':amount*100,
            "currency":"INR",
            "payment_capture":"1"}
            )
        callback_url = request.build_absolute_uri()+"payment_status/"

        Payment.payment_id = payment["id"]
        Payment.save()
        data = {
            "amount":amount,
            "orderid":payment["id"],
            "callback_url":callback_url,
            "keyid":keyid,
            "job_name":job.job_name
            }
        response = json.dumps(data, default=str)
        return  HttpResponse(response)
        

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def handlerequest(request):
    if request.method == "POST":
        data = request.POST
        payment_id = data.get('razorpay_payment_id')
        order_id = data.get('razorpay_order_id')
        signature = data.get('razorpay_signature')
        params_dict = {
        'razorpay_order_id': order_id,
        'razorpay_payment_id': payment_id,
        'razorpay_signature': signature
        }
        result = razorpay_client.utility.verify_payment_signature(params_dict)
        if result is None:
            payment = PaymentMethod.objects.get(payment_id=order_id)
            application = Application.objects.get(id=payment.application.id)
            payment.payment_status = 'Completed'
            application.payment_status1 = 'Completed'
            payment.save()
            application.save()
            messages.success(request, 'your payment is successfully completed.')
        else:
            messages.error(request, 'your payment is Failed.')
        return redirect('candidate')
    