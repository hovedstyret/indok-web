import graphene
from graphene import NonNull

from .mutations import (
    AssignMembership,
    CreateOrganization,
    DeleteOrganization,
    UpdateOrganization,
)
from .resolvers import MembershipResolvers, OrganizationResolvers
from .types import MembershipType, OrganizationType


class OrganizationMutations(graphene.ObjectType):
    create_organization = CreateOrganization.Field()
    update_organization = UpdateOrganization.Field()
    delete_organization = DeleteOrganization.Field()

    assign_membership = AssignMembership.Field()


class OrganizationQueries(graphene.ObjectType, OrganizationResolvers, MembershipResolvers):
    all_organizations = graphene.List(NonNull(OrganizationType), search=graphene.String())
    organization = graphene.Field(
        OrganizationType,
        id=graphene.ID(required=False),
        slug=graphene.String(required=False),
    )
    event_filtered_organizations = graphene.List(NonNull(OrganizationType))

    memberships = graphene.List(NonNull(MembershipType), organization_id=graphene.ID())
