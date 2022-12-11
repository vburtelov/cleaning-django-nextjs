from celery import shared_task
from django.core.mail import send_mail
import time
from django.conf import settings


@shared_task()
def send_verification_email(user_id, confirmation_token, receiver, sender):
    activation_link = f'{settings.FRONT_BASE_URL}/account/verify/?user_id={user_id}&confirmation_token={confirmation_token}'
    subject = "Cleany | Подтвердите почту"
    message = "Подтвердите вашу почту: " + activation_link
    time.sleep(20)
    send_mail(subject, message, sender, [receiver], fail_silently=False)
