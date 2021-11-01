from django.contrib.auth.models import Group
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from guardian.shortcuts import assign_perm

from apps.organizations.models import Membership, Organization
from apps.permissions.constants import (
    ORGANIZATION,
    DEFAULT_ORG_GROUPS,
    ORG_MEMBER_GROUP_TYPE,
)
from apps.permissions.models import ResponsibleGroup


@receiver(post_save, sender=Membership)
def handle_new_member(instance: Membership, **kwargs):
    user = instance.user

    org_group: Group = Group.objects.get(name=ORGANIZATION)
    user.groups.add(org_group)

    groups: list[ResponsibleGroup] = instance.groups
    if not any(group.group_type == ORG_MEMBER_GROUP_TYPE for group in groups.all()):
        primary_group = instance.organization.permission_groups.get(group_type=ORG_MEMBER_GROUP_TYPE)
        groups.add(primary_group)
    for group in groups.all():
        user.groups.add(group.group)


@receiver(pre_delete, sender=Membership)
def handle_removed_member(instance: Membership, **kwargs):
    groups: list[ResponsibleGroup] = instance.groups
    org_group: Group = Group.objects.get(name=ORGANIZATION)

    user = instance.user
    for group in groups.all():
        user.groups.remove(group.group)
    if not user.memberships.all().exists():
        user.groups.remove(org_group)


@receiver(post_save, sender=Organization)
def ensure_default_groups(instance: Organization, **kwargs):
    """
    Ensures that organizations have correct default organization permission groups.
    """
    for default_group in DEFAULT_ORG_GROUPS:
        default_group_included = False

        existing_group: ResponsibleGroup
        for existing_group in instance.permission_groups.all():
            if existing_group.group_type == default_group.group_type:
                default_group_included = True

                existing_group_changed = False

                if existing_group.name != default_group.name:
                    existing_group.name = default_group.name
                    existing_group_changed = True

                updated_description = default_group.create_description(instance.name)
                if existing_group.description != updated_description:
                    existing_group.description = updated_description
                    existing_group_changed = True

                if set(existing_group.group.permissions.all()) != set(default_group.permissions):
                    existing_group.group.permissions.set(default_group.permissions)

                if existing_group_changed:
                    existing_group.save()

                break

        if not default_group_included:
            group = ResponsibleGroup.objects.create(
                group_type=default_group.group_type,
                name=default_group.name,
                description=default_group.create_description(instance.name),
                organization=instance,
            )
            for permission in default_group.permissions:
                if permission[0] == "organizations":
                    assign_perm(f"{permission[0]}.{permission[1]}", group.group, instance)
