import graphene

from apps.archive.schema import ArchiveMutations, ArchiveQueries
from apps.blogs.schema import BlogMutations, BlogQueries
from apps.cabins.schema import CabinMutations, CabinQueries
from apps.events.schema import EventMutations, EventQueries
from apps.forms.schema import FormMutations, FormQueries
from apps.listings.schema import ListingMutations, ListingQueries
from apps.organizations.schema import OrganizationMutations, OrganizationQueries
from apps.permissions.schema import PermissionQueries
from apps.users.schema import UserMutations, UserQueries
from utils.graphql.schema import UtilQueries
from apps.ecommerce.schema import EcommerceMutations, EcommerceQueries


class Queries(
    EventQueries,
    ArchiveQueries,
    UserQueries,
    CabinQueries,
    OrganizationQueries,
    ListingQueries,
    FormQueries,
    UtilQueries,
    EcommerceQueries,
    BlogQueries,
    PermissionQueries,
):
    pass


class Mutations(
    EventMutations,
    ArchiveMutations,
    UserMutations,
    CabinMutations,
    OrganizationMutations,
    ListingMutations,
    FormMutations,
    EcommerceMutations,
    BlogMutations,
):
    pass


schema = graphene.Schema(query=Queries, mutation=Mutations)
