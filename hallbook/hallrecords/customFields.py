

#-------------------Custom field--------------------

from django import forms
from django.db import models
from django.core.validators import RegexValidator

# Define a custom phone number field for Nepal
class NPPhoneNumberField(models.CharField):
    # Set a description for the field
    description = "Nepal phone number field"
        # Add the max_length attribute
    

    def __init__(self, *args, **kwargs):
        
        # Add max_length field as it is compulsory
        kwargs.setdefault('max_length', 20)
        # Add a regular expression validator to ensure phone numbers are in the correct format
        super().__init__(*args, **kwargs)
        self.validators.append(RegexValidator(
            r'^9\d{9}$',
            'Enter a valid Nepal phone number starting with 9',
            'invalid'
        ))

    def from_db_value(self, value, expression, connection):
        # Convert the value from the database to a Python object
        return self.to_python(value)

    def to_python(self, value):
        # Convert the value to a Python string
        if value is None:
            return value
        return str(value)

    def get_prep_value(self, value):
        # Prepare the value for saving to the database
        return value

    def formfield(self, **kwargs):
        # Customize the form widget to accept phone numbers without the "+977-" prefix
        defaults = {
            'widget': forms.TextInput(attrs={
                'type': 'tel',
                'pattern': r'^9\d{9}$',
                'title': 'Enter a valid Nepal phone number starting with 9',
            })
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)

    def pre_save(self, model_instance, add):
        # Remove the "+977-" prefix from the phone number before saving it to the database
        value = getattr(model_instance, self.attname)
        if value is not None:
            value = value.replace('+977-', '').strip()
        setattr(model_instance, self.attname, value)
        return value
