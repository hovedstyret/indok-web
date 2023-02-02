from django.db import models
from datetime import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from .google_drive_api import GoogleDriveAPI
from django.core.exceptions import FieldError


class FileType(models.TextChoices):
    BUD = ("Budsjett og Regnskap",)
    SUM = ("Generalforsamling",)
    YBO = ("Årbøker",)
    REG = ("Foreningens lover",)
    SUP = ("Støtte fra HS",)
    EXC = ("Utveksling",)
    OTH = ("Annet",)
    JSS = ("Januscript",)


class JanuscriptDocument(models.Model):
    title = models.CharField(max_length=128)
    type_doc = models.CharField(max_length=20, choices=[(tag, tag.value) for tag in FileType])
    file_location = models.CharField(max_length=2000, default=None, null=False)
    uploaded_date = datetime.now()
    featured = models.BooleanField(default=False)
    year = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
    )
    web_link = models.CharField(
        max_length=2050,
        default=None,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title


@receiver(post_save, sender=JanuscriptDocument)
def notify_doc(sender, instance, created, **kwargs):
    if created:
        drive = GoogleDriveAPI()
        instance.web_link = drive.get_url(instance.file_location)
        if instance.web_link is None:
            instance.delete()
            raise FieldError(
                "This document does not seem to exist in Drive. Are you sure you gave the right file location?"
            )
        instance.save()
