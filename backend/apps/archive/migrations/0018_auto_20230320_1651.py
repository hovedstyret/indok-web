# Generated by Django 3.2.18 on 2023-03-20 15:51

from django.db import migrations

from apps.archive.google_drive_api import GoogleDriveAPI

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from apps.archive.models import ArchiveDocument


def resolve_thumbnail(apps, schema_editor):
    ArchiveDocument = apps.get_model("archive", "ArchiveDocument")
    drive = GoogleDriveAPI()

    document: "ArchiveDocument"
    for document in ArchiveDocument.objects.all():
        url = drive.get_thumbnail(document.file_location)
        document.thumbnail = url
        document.save()


class Migration(migrations.Migration):
    dependencies = [
        ("archive", "0017_archivedocument_thumbnail"),
    ]

    operations = [migrations.RunPython(resolve_thumbnail, migrations.RunPython.noop)]
