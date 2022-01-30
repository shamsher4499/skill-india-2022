import json, random
from django.contrib import messages
from random import random
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from .models import *
from .forms import *
from .choices import *
import uuid, datetime
from django.contrib.auth.decorators import login_required
from django.utils import timezone


# Create your views here.
from .utils import send_email, send_otp, unique_email

from random import randint


def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)


def home(request):
    notification = Notifications.objects.all()
    footer_img = FooterImage.objects.all()
    template_name = 'template/body.html'
    return render(request, template_name, context={'notification':notification, 'footer_img':footer_img})

def match_otp(request):
    if request.method=="POST":
        otp = request.POST.get('otp')
        u = request.POST.get('username_otp')
        store = StorePassword.objects.get(user_name=u)
        user = User.objects.get(username=u)
        register = Registration.objects.get(user=user)
        if store.otp == otp:
            register.verify_email =  True
            register.save()
            messages.success(request, 'Email Verification Complete! Registration ID and Password has been sent on your e-mail address.')
            send_email(register.user.username, store.pass_word, register.email_id)
            return redirect('home')

def forgetpassword(request):
    template_name = 'template/body.html'
    original = None
    forget = True
    u = None
    if request.method=='POST':
        email = request.POST.get('email')
        password = random_with_N_digits(5)
        new_user = User.objects.get(email=email)
        new_store = StorePassword.objects.get(user=new_user)
        new_store.pass_word = password
        new_store.save()
        send_otp(new_user.username, password, email, 'NSDC Forget password otp..!')
        original = True
        u = new_user.username
    return render(request, template_name, {'original':original, 'forget':forget, 'u':u})
    

def register(request, pid=None):
    register = None
    original = None
    new_store = None
    if pid:
        register = Registration.objects.get(id=pid)
    if request.method=='POST':
        form = Registration_User(request.POST, instance=register)
        email = request.POST.get('email_id')
        obj = unique_email(email)
        if obj or register:
            if form.is_valid():
                new_data = form.save()
                if not pid:
                    while 1:
                        try:
                            registeruser = User.objects.get(username=random_with_N_digits(12))
                        except:
                            username = random_with_N_digits(12)
                            break
                    password = random_with_N_digits(5)
                    password2 = random_with_N_digits(5)
                    email = request.POST.get('email_id')
                    new_user = User.objects.create(username=username, password=password, email=email)
                    new_store = StorePassword.objects.create(user_name=username, user=new_user, pass_word=password, otp = password2)
                    new_data.user = new_user
                    new_data.save()
                    send_otp(username,password2,email, 'NSDC Email Verfication')
                    original = True
                else:
                    try:
                        addition = AdditionDetail.objects.get(user=request.user)
                    except:
                        addition = None
                    if addition:
                        return redirect('edit_additional', addition.id)
                    else:
                        return redirect('addition_details')  
            else:
                print(form.errors)
        else:
            messages.success(request, 'Email already exist...!')
    template_name = 'template/Registration/register.html'
    d = {'new_store':new_store, 'original':original, 'register':register,'type_of_id':TYPE_OF_ID, 'education_board':EDUCATION_BOARD, 'year_of_passing':YEAR_OF_PASSING, 'education_level':EDUCATION_LEVEL, 'state':STATE}
    return render(request, template_name, d)


def additionDetails(request,pid=None):
    register = None
    if pid:
        register = AdditionDetail.objects.filter(user=request.user).first()
    if request.method=='POST':
        form = AdditionalDetailForm(request.POST, instance=register)
        if form.is_valid():
            new_data = form.save()
            if request.POST['is_disability'] == "1":
                new_data.type_disability = request.POST['type_disability']
                new_data.certificate_disability_num = request.POST['certificate_disability_num']
                new_data.is_disability = True
            else:
                new_data.type_disability = 0
                new_data.certificate_disability_num = None
                new_data.is_disability = False
            new_data.user = request.user
            new_data.save()
            messages.success(request, 'Additional Detail added Successfully')
            return redirect('agreecondition')
        else:
            print(form.errors)
    template_name = 'template/Registration/additional_details.html'
    d = {'register':register, 'country':COUNTRY, 'education_board':EDUCATION_BOARD, 'year_of_passing':YEAR_OF_PASSING, 'education_level':EDUCATION_LEVEL, 'state':STATE, 'disability':TYPE_OF_DISABILITES}
    return render(request, template_name, d)

def AgreeCondition(request):
    error = False
    register = None
    try:
        register = AdditionDetail.objects.get(user = request.user)
        
    except:
        error = True
    if request.method == "POST":
        register.agreement = request.POST.get('agreement')
        register.save()
        messages.success(request, 'Final submit successfully')
        return redirect('/candidate-profile/')
    template_name = 'template/Registration/Declaration.html'
    return render(request, template_name,{'error':error, 'register':register})

def login_user(request):
    template_name = 'template/body.html'
    original = None
    u = None
    if request.method == "POST":
        u = request.POST.get('username')
        p = request.POST.get('password')
        store = StorePassword.objects.filter(user_name=u, pass_word=p)
        if store:
            original = True
        else:
            user = authenticate(username=u, password=p)
            print(user)
            if user:
                login(request, user)
                messages.success(request, 'Logged in successfully')
                registration = Registration.objects.get(user=user)
                addition = AdditionDetail.objects.filter(user = user).first()
                if addition:
                    return redirect('candidate')
                else:
                    return redirect('edit_register', registration.id)
            else:
                messages.success(request, 'Credentials Invalid')
    return render(request, template_name, {'original': original, 'u':u})


def Change_Password(request):
    if request.method=="POST":
        o = request.POST['old_password']
        u = request.POST['username']
        n = request.POST['new_password']
        c = request.POST['confirm_password']
        store = StorePassword.objects.filter(user_name=u, pass_word=o)
        if store:
            u = User.objects.get(username__exact=u)
            u.set_password(n)
            u.save()
            messages.success(request, 'Password Changed Successfully')
            return redirect('home')
        else:
            messages.success(request, 'Old Password not matching,Try again...')
            return redirect('home')
    return render(request, 'template/body.html', {'original':True})


def notice(request):
    notice = NoticeHeading.objects.all()
    notice_set = Notice.objects.all()
    template_name = 'template/notice.html'
    return render(request, template_name, {'notice':notice, 'notice_set':notice_set})


def answer_key(request):
    answers = AnswerKey_pdf.objects.all()
    template_name = 'template/answerkey.html'
    return render(request, template_name, {'answers':answers})

def apply(request):
    job = JobCategory.objects.all()
    job_set = Job.objects.all()
    template_name = 'template/hi/Portal/apply.html'
    return render(request, template_name, {'job':job, 'job_set':job_set})

def results(request):
    result = NoticeHeading.objects.all()
    result_exam = Result.objects.all()
    template_name = 'template/hi/Portal/results.html'
    return render(request, template_name, {'result':result, 'result_exam':result_exam})

def feedback(request):
    template_name = 'template/hi/Portal/feedback.html'
    return render(request, template_name)

def Logout(request):
    logout(request)
    messages.success(request, 'Logout Successfully')
    return redirect('home')


def application_form(request, job_id, pid=None):
    register = Registration.objects.filter(user=request.user).first()
    addtion = AdditionDetail.objects.filter(user=request.user).first()
    job = Job.objects.get(id=job_id)
    age = datetime.date.today()-register.dob
    age = (age.days)/365
    application = None
    if pid:
        application = Application.objects.filter(user=request.user).first()
    if request.method=='POST':
        form = ApplicationForm(request.POST, request.FILES, instance=application)
        if form.is_valid():
            new_data = form.save()
            new_data.user = request.user
            new_data.save()
            messages.success(request, 'Your Application Form Successfully Submitted..!')
            return redirect('payment_request',job_id)
        else:
            print(form.errors)
    template_name = 'template/Registration/Profile.html'
    d = {'application':application,'register':register, 'addtion':addtion, 'age':int(age), 'job':job, 'centers1':CENTER1, 'centers2':CENTER2, 'centers3':CENTER3, 'age_relaxation_code':AGE_RELAXATION_CODE, 'highest_qualification':HIGHEST_QUALIFICATION, 'year':YEAR_OF_PASSING, 'state_ut':STATE_UT, 'board_name':BOARD_NAME}
    return render(request, template_name, d)

def payment_request(request, job_id):
    return render(request, 'template/hi/Portal/payment_notification.html', {'job_id':job_id})

def admin_portal(request):
    if not request.user.is_staff:
        return redirect('login_user')
    template_name = 'template/Admin_Portal/dashboard.html'
    return render(request, template_name)


def get_district(request):
    state = request.GET.get('state')
    data = DISTRICT
    lst = data.get(state)
    return HttpResponse(json.dumps(lst), content_type="application/json")


def user_portal(request):
    if not request.user.is_staff:
        return redirect('login_user')
    template_name = 'template/Admin_Portal/user.html'
    return render(request, template_name)

def notification_portal(request):
    if not request.user.is_staff:
        return redirect('login_user')
    template_name = 'template/Admin_Portal/notifications.html'
    return render(request, template_name)

def get_board(request):
    state = request.GET.get('state')
    data = BOARD_NAME
    lst = data.get(state)
    return HttpResponse(json.dumps(lst), content_type="application/json")


def candidate_profile(request):
    job_notice = LatestNotification.objects.all()
    template_name = 'template/Registration/candidate.html'
    return render(request, template_name, {'job_notice':job_notice})

def candidate_marks(request):
    template_name = 'template/Registration/marks.html'
    return render(request, template_name)

def candidate_history(request):
    application = Application.objects.filter(user=request.user)
    template_name = 'template/Registration/applicationhistory.html'
    return render(request, template_name, {'application':application})

def admit_card(request):
    job = Job.objects.filter()
    addtion = AdditionDetail.objects.filter()
    admit_card = Application.objects.filter()
    if request.user.username:
       admit_card = Application.objects.filter(user=request.user)
    template_name = 'template/admitcards.html'
    return render(request, template_name, {'admit_card':admit_card, 'addtion':addtion, 'job':job})

def application_view(request):
    if not request.user.is_staff:
        return redirect('login_user')
    application = Application.objects.filter(status='Not Available')
    if request.method == "POST":
        total_stage = request.POST.get('total_stage')
        exam_reporting_time = request.POST.get('exam_reporting_time')
        exam_date = request.POST.get('exam_date')
        exam_duration = request.POST.get('exam_duration')
        exam_start_time = request.POST.get('exam_start_time')
        exam_end_time = request.POST.get('exam_end_time')
        exam_shift = request.POST.get('exam_shift')
        exam_gate_close = request.POST.get('exam_gate_close')
        examination_controller = request.FILES['examination_controller']
        for i in range(1,int(total_stage)+1):
            invent = request.POST.get('inventory-'+str(i))
            invent_id = request.POST.get('inventory_id-'+str(i))
            if invent:
                invent_itm = Application.objects.filter(id=invent_id)
                list1 = [invent_itm.first().center1,invent_itm.first().center2,invent_itm.first().center3]
                admit_card = AdmitCard.objects.create(
                                exam_venue = 'Exam Venue will be updated soon by company side.',
                                exam_center = invent_itm.first().center1,
                                exam_reporting_time = exam_reporting_time,
                                exam_date = exam_date,
                                exam_start_time = exam_start_time,
                                exam_end_time = exam_end_time,
                                exam_shift = exam_shift,
                                exam_gate_close = exam_gate_close,
                                examination_controller = examination_controller,
                                application = invent_itm.first(),
                                user = invent_itm.first().user,)
                invent_itm.update(status = 'Available')
                messages.success(request, "selected application's admit card are issued..")
                return redirect('application-view')
    template_name = 'template/Admin_Portal/tables.html'
    return render(request, template_name, {'application':application})

@login_required(login_url = '/login-user/')
def issue_admit_card(request, aid, pid=None):
    if not request.user.is_staff:
        return redirect('login_user')
    admit_card = None
    application = Application.objects.get(id=aid)
    if pid:
        admit_card = AdmitCard.objects.get(id=pid)
    if request.method == 'POST':
        form = AdmitCardForm(request.POST, request.FILES, instance=admit_card)
        if form.is_valid():
            new_admit_card = form.save()
            new_admit_card.user = application.user
            new_admit_card.application = application
            new_admit_card.application.status = "Available"
            new_admit_card.save()
            new_admit_card.application.save()
            messages.success(request, 'Admit card issued..!')
            return redirect('application-view')
        else:
            print(form.errors)
    template_name = 'template/Admin_Portal/issue_admit_card.html'
    return render(request, template_name, {'application':application, 'admit_card':admit_card})

def view_admit_card(request, pid):
    admit_card = AdmitCard.objects.get(id=pid)
    template_name = 'template/Registration/admitcard.html'
    return render(request, template_name, {'admit_card':admit_card})


def available_application(request):
    application = Application.objects.filter(status = 'Available')
    template_name = 'template/Admin_Portal/available_application.html'
    return render(request, template_name, {'application':application})

def error_404(request, exception):
    return render(request,'template/404.html', {})

def error_500(request):
    return render(request,'template/404.html',{})
