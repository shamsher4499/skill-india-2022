from django.contrib.auth.models import User
from django.db import models
from .choices import *
import os
from django.conf import settings

# Create your models here.


class Notifications(models.Model):
    class Meta:
        ordering = ['-not_date']
    not_date = models.DateField(null=True)
    not_icon = models.ImageField(upload_to='media', null=True, blank=True)
    not_title = models.CharField(max_length=200,null=True)
    not_pdf = models.FileField(upload_to='media', null=True)

    def get_size(self):
        pdf_path = self.not_pdf
        file_size = os.path.getsize(str(settings.MEDIA_ROOT)+'/'+str(pdf_path))
        formatted_float = "{:.2f}".format(file_size/1024)
        return formatted_float

    def __str__(self):
        return self.not_title

class FooterImage(models.Model):
    img = models.ImageField(upload_to='media', null=True)
    img_alt = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.img_alt

class Registration(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    is_aadhar = models.BooleanField(default=False, null=True, blank=True)
    aadhar_number = models.CharField(max_length=12, null=True, blank=True)
    # confirm_aadhar_number = models.CharField(max_length=12, null=True)
    id_type = models.IntegerField(choices=TYPE_OF_ID, default=0, null=True)
    id_number = models.CharField(max_length=20, null=True)
    name = models.CharField(max_length=30, null=True)
    # verify_name = models.CharField(max_length=30, null=True)
    change_name_type = models.BooleanField(default=False, null=True, blank=True)
    change_name = models.CharField(max_length=30, blank=True, null=True)
    father_name = models.CharField(max_length=30, null=True)
    # verify_father_name = models.CharField(max_length=30, null=True)
    mother_name = models.CharField(max_length=30, null=True)
    # verify_mother_name = models.CharField(max_length=30, null=True)
    dob = models.DateField(null=True)
    # verify_dob = models.DateField(null=True)
    education_board = models.IntegerField(choices=EDUCATION_BOARD, default=0, null=True)
    # verify_education_board = models.IntegerField(choices=EDUCATION_BOARD, default=0, null=True)
    roll_number = models.CharField(max_length=20, null=True)
    # verify_roll_number = models.CharField(max_length=20, null=True)
    passing_year = models.IntegerField(choices=YEAR_OF_PASSING, default=0, null=True)
    # verify_passing_year = models.IntegerField(choices=YEAR_OF_PASSING, default=0, null=True)
    gender = models.IntegerField(choices=GENDER, default=0, null=True)
    # verify_gender = models.IntegerField(choices=GENDER, default=0, null=True)
    education_level = models.IntegerField(choices=EDUCATION_LEVEL, default=0, null=True)
    mobile_number = models.CharField(max_length=10, null=True)
    # verify_mobile_number = models.CharField(max_length=10, null=True)
    email_id = models.EmailField(null=True)
    # verify_email_id = models.EmailField(null=True)
    state = models.IntegerField(choices=STATE, default=0, null=True)
    # verify_email_id = models.EmailField(null=True)
    verify_email = models.BooleanField(blank=True, default=False)


    def __str__(self):
        return self.name


class AdditionDetail(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    category = models.CharField(max_length=200, blank=True, null=True)
    nationality = models.IntegerField(choices=COUNTRY, default=0, null=True)
    indent_mark = models.CharField(max_length=250, blank=True, null=True)
    is_disability = models.BooleanField(default=False, blank=True, null=True)
    type_disability = models.IntegerField(choices=TYPE_OF_DISABILITES, default=0)
    certificate_disability_num = models.CharField(max_length=200, blank=True, null=True)
    permanent_address = models.CharField(max_length=200, blank=True, null=True)
    state = models.IntegerField(choices=STATE, null=True)
    district = models.CharField(max_length=254, blank=True, null=True)
    pin_code = models.CharField(max_length=200, blank=True, null=True)
    is_address_same = models.BooleanField(default=False, null=True)
    agreement = models.BooleanField(default=False, null=True)
    other_contact = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return str(self.user.username)


class AnswerKey_pdf(models.Model):
    ans_name = models.CharField(max_length=300, null=True)
    ans_img = models.ImageField(upload_to='media', null=True)
    ans_pdf = models.FileField(upload_to='media', null=True)
    ans_size = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.ans_name


class NoticeHeading(models.Model):
    notice_name = models.CharField(max_length=254, null=True)

    def __str__(self):
        return self.notice_name
class Notice(models.Model):
    class Meta:
        ordering = ['-upload_date']
    notice_exam = models.ForeignKey(NoticeHeading, on_delete=models.CASCADE, null=True)
    exam_name = models.CharField(max_length=254, null=True)
    upload_date = models.DateField(null=True)
    # notice_year = models.CharField(max_length=5, null=True)
    notice_pdf = models.FileField(upload_to="media", null=True)

    def get_size(self):
        pdf_path = self.notice_pdf
        file_size = os.path.getsize(str(settings.MEDIA_ROOT)+'/'+str(pdf_path))
        formatted_float = "{:.2f}".format(file_size/1024)
        return formatted_float

    def __str__(self):
        return self.exam_name


class Result(models.Model):
    class Meta:
        ordering = ['-upload_date']
    result_exam = models.ForeignKey(NoticeHeading, on_delete=models.CASCADE, null=True)
    exam_name = models.CharField(max_length=254, null=True)
    upload_date = models.DateField(null=True)
    exam_year = models.CharField(max_length=5, null=True)
    notice_pdf = models.FileField(upload_to="media", null=True)
    result_pdf = models.FileField(upload_to="media", null=True)
    
    def get_size(self):
        pdf_path = self.notice_pdf
        file_size = os.path.getsize(str(settings.MEDIA_ROOT)+'/'+str(pdf_path))
        formatted_float = "{:.2f}".format(file_size/1024)
        return formatted_float
    
    def get_size_1(self):
        pdf_path = self.result_pdf
        file_size = os.path.getsize(str(settings.MEDIA_ROOT)+'/'+str(pdf_path))
        formatted_float = "{:.2f}".format(file_size/1024)
        return formatted_float
        
    def __str__(self):
        return self.exam_name


class StorePassword(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    user_name = models.CharField(max_length=100, null=True)
    pass_word = models.CharField(max_length=100, null=True)
    otp = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.user_name

class JobCategory(models.Model):
    name = models.CharField(max_length=254, null=True)

    def __str__(self):
        return self.name


class Job(models.Model):
    job_category = models.ForeignKey(JobCategory, on_delete=models.CASCADE, null=True)
    job_name = models.CharField(max_length=254, null=True)
    job_year = models.CharField(max_length=5, null=True)
    amount = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.job_name


class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True)
    center1 = models.IntegerField(choices=CENTER1, null=True)
    center2 = models.IntegerField(choices=CENTER2, null=True)
    center3 = models.IntegerField(choices=CENTER3, null=True)
    test_meduim = models.CharField(max_length=10, null=True)
    science_student = models.BooleanField(null=True, blank=True)
    ex_Serviceman = models.BooleanField(null=True, blank=True)
    discharge_ex_serviceman = models.DateField(null=True, blank=True)
    service_inyears = models.CharField(max_length=2, null=True, blank=True)
    join_civil = models.BooleanField(null=True, blank=True)
    date_join_civil = models.DateField(null=True, blank=True)
    suffering_cerebral_palsy = models.BooleanField(null=True, blank=True)
    provide_exam_help = models.BooleanField(null=True, blank=True)
    scribe_required = models.BooleanField(null=True, blank=True)
    arrangement_own_scribe = models.BooleanField(null=True, blank=True)
    arranged_by = models.BooleanField(null=True, blank=True)
    age_relaxation = models.BooleanField(null=True, blank=True)
    age_relaxation_code = models.CharField(max_length=254, null=True, blank=True)
    highest_qualification = models.IntegerField(choices=HIGHEST_QUALIFICATION, null=True)
    qualifying_educational_qualification = models.CharField(max_length=254, null=True)
    education_status = models.CharField(max_length=20, null=True)
    education_passing_year = models.IntegerField(choices=YEAR_OF_PASSING, null=True)
    education_state = models.IntegerField(choices=STATE_UT, null=True)
    education_boards = models.CharField(max_length=254, null=True)
    roll_num = models.CharField(max_length=20, null=True)
    pertencage = models.CharField(max_length=5, null=True)
    share_info = models.BooleanField(null=True)
    photo =  models.FileField(upload_to='media', null=True)
    signature = models.FileField(upload_to='media', null=True)
    date_of_photo = models.DateField(null=True)
    date_mentioned_photo = models.BooleanField(null=True)
    i_agree = models.BooleanField(null=True)
    roll_number = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=50, default="Not Available", null=True, blank=True)
    payment_status1 = models.CharField(max_length=254, null=True, blank=True, default="Pending")
    
    
    def __str__(self):
        return str(self.user.username)+" -- "+self.job.job_name

class AdmitCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    application = models.ForeignKey(Application, on_delete=models.CASCADE, null=True)
    exam_center = models.CharField(max_length=254, null=True)
    exam_venue = models.CharField(max_length=254, null=True)
    exam_reporting_time = models.TimeField(null=True)
    exam_date = models.DateField(null=True)
    exam_duration = models.CharField(max_length=254, null=True)
    exam_start_time = models.TimeField(null=True)
    exam_end_time = models.TimeField(null=True)
    exam_shift = models.CharField(max_length=254, null=True)
    exam_gate_close = models.TimeField(null=True)
    examination_controller = models.FileField(upload_to='signature', null=True)

    def __str__(self):
        return str(self.user.username)+" -- "+self.application.job.job_name

class LatestNotification(models.Model):
    job_name = models.ForeignKey(Job, on_delete=models.CASCADE, null=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    last_payment_date = models.DateField(null=True)
    last_chalan_date = models.DateField(null=True)
    last_bank_date = models.DateField(null=True)
    job_notification = models.FileField(upload_to='media', null=True, blank=True)
    job_status = models.CharField(max_length=254, null=True, blank=True, default="Active")
    double_payment_status = models.CharField(max_length=254, null=True, blank=True, default="Active")

    def __str__(self):
        return str(self.job_name)

class PaymentMethod(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, null=True)
    payment_status = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    payment_request_id = models.CharField(max_length=200, null=True, blank=True)
    payment_id = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return str(self.user.username)+" -- "+self.application.job.job_name+" -- "+self.payment_status
