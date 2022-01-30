from django.contrib import admin
from django.contrib.auth import models
from .models import *

# Register your models here.

admin.site.register(Notifications)
admin.site.register(FooterImage)
# admin.site.register(Registration)
# admin.site.register(StorePassword)
admin.site.register(AnswerKey_pdf)
admin.site.register(Notice)
# admin.site.register(AdditionDetail)
admin.site.register(JobCategory)
# admin.site.register(Job)
admin.site.register(NoticeHeading)
# admin.site.register(Application)
# admin.site.register(AdmitCard)
# admin.site.register(LatestNotification)



class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'user','job', 'roll_num', 'highest_qualification', 'qualifying_educational_qualification', 'education_status', 'education_passing_year', 'education_state'
    )

admin.site.register(Application, ApplicationAdmin)

class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'name', 'father_name', 'mother_name', 'dob', 'education_board', 'roll_number', 'mobile_number', 'email_id', 'state'
    )

admin.site.register(Registration, RegistrationAdmin)

class AddtionalAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'category', 'nationality', 'indent_mark', 'state', 'district', 'pin_code'
    )

admin.site.register(AdditionDetail, AddtionalAdmin)

class AdmitCardAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'application', 'exam_center', 'exam_venue', 'exam_reporting_time', 'exam_date', 'exam_duration', 'exam_start_time', 'exam_end_time', 'exam_shift', 'exam_gate_close'
    )

admin.site.register(AdmitCard, AdmitCardAdmin)

class JobAdmin(admin.ModelAdmin):
    list_display = (
        'job_category', 'job_name', 'job_year'
    )

admin.site.register(Job, JobAdmin)

class LatestNotificationAdmin(admin.ModelAdmin):
    list_display = (
        'job_name', 'start_date', 'end_date', 'last_payment_date', 'last_chalan_date', 'last_bank_date', 'job_status', 'double_payment_status'
    )

admin.site.register(LatestNotification, LatestNotificationAdmin)

class StorePasswordAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'user_name', 'pass_word', 'otp'
    )

admin.site.register(StorePassword, StorePasswordAdmin)

class ResultAdmin(admin.ModelAdmin):
    list_display = (
        'result_exam', 'exam_name', 'upload_date', 'exam_year'
    )

admin.site.register(Result, ResultAdmin)
admin.site.register(PaymentMethod)