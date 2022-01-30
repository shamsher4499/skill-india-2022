from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import get_template
from .models import *


def send_email(username,password,email):
    subject, from_email, to = 'NSDC Registration Successful', settings.EMAIL_HOST_USER, email
    text_content = 'This is an important message.'
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    d = {'username':username,'password':password}
    html_content = get_template('template/email/emailtemplate.html').render(d)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

def send_otp(username,password,email,subject):
    subject, from_email, to = subject, settings.EMAIL_HOST_USER, email
    text_content = 'This is your OTP'
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    d = {'otp':str(password)}
    html_content = get_template('template/email/email.html').render(d)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

def unique_email(obj):
    user = Registration.objects.filter(email_id=obj, verify_email=True).first()
    user1 = Registration.objects.filter(email_id=obj, verify_email=False).first()
    if user1:
        check = User.objects.get(email=obj)
        check.delete()
    if user:
        return 0
    else:
        return 1