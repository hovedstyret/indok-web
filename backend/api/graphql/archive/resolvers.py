from apps.archive.models import ArchiveDocument
from django.db.models import Q
from django.db.models.sql import Query
from graphql_jwt.decorators import login_required


class ArchiveDocumentResolvers:
    @login_required
    def resolve_all_archives(self, info):
        return ArchiveDocument.objects.all()

    @login_required
    def resolve_archive(self, info, id):
        try:
            return ArchiveDocument.objects.get(id=id)
        except ArchiveDocument.DoesNotExist:
            return None

    @login_required
    def resolve_archive_by_date(self, info, date):
        try:
            return ArchiveDocument.objects.get(date=date)
        except ArchiveDocument.DoesNotExist:
            return None

    @login_required
    def resolve_archive_by_types(self, info, type_doc, year=None, names=None):
        documents = ArchiveDocument.objects.all()
        if type_doc:
            documents = documents.filter(type_doc__in=type_doc)
        if year is not None:
            documents = documents.filter(year=year)
        if names is not None:
            l = list(names.split(" "))
            for element in l:
                documents = documents.filter(title__icontains=element)
        return reversed(documents)

    @login_required
    def resolve_archive_by_names(self, info, names):
        if names:
            filteredDocs = ArchiveDocument.objects
            for element in names:
                filteredDocs = filteredDocs.filter(title__icontains=element)
            return filteredDocs
        return ArchiveDocument.objects.all()