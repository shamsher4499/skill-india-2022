from django import forms

from .models import *

class Registration_User(forms.ModelForm):
    class Meta:
        model = Registration
        exclude = ('user','verify_email',)
        # List = ('aadhar_number', 'confirm_aadhar_number', 'id_type', 'id_number', 'name', 'verify_name', 'change_name_type', 'change_name', 'father_name', 'verify_father_name', 'mother_name', 'verify_mother_name', 'dob', 'verify_dob', 'education_board', 'verify_education_board', 'roll_number', 'verify_roll_number', 'passing_year', 'verify_passing_year', 'gender', 'verify_gender', 'education_level', 'mobile_number', 'verify_mobile_number', 'email_id', 'verify_email_id', 'state')

class AdditionalDetailForm(forms.ModelForm):
    class Meta:
        model = AdditionDetail
        exclude = ('user', 'is_disability', 'type_disability', 'certificate_disability_num',)

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        exclude = ('user',)

class AdmitCardForm(forms.ModelForm):
    class Meta:
        model = AdmitCard
        exclude = ('user','application','exam_duration',)