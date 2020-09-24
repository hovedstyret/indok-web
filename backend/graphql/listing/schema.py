import graphene

from graphql.listing.types import ListingType
from listing.models import Listing as ListingModel

from .mutation import CreateListing

class ListingQuery(graphene.ObjectType):
    listings = graphene.List(ListingType)
    listing_by_id = graphene.Field(ListingType, id=graphene.String())

    def resolve_listings(root, info, **kwargs):
        return ListingModel.objects.all()

    def resolve_listing_by_id(root, info, id):
        listing = ListingModel.objects.get(pk=id)
        if listing is None:
            return None
        return listing

class Mutations(graphene.ObjectType):
    create_listing = CreateListing.Field()

class Queries(graphene.ObjectType):
    listings = ListingQuery