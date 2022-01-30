from django import template
register = template.Library()

@register.filter
def get_upper_letter(obj):
    return obj.upper()