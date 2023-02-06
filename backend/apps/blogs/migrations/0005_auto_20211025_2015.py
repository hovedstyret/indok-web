# Generated by Django 3.2.5 on 2021-10-25 18:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("organizations", "0033_merge_0031_auto_20210909_1813_0032_auto_20210824_1457"),
        ("blogs", "0004_blogpost_blog"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blog",
            name="organization",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="blog",
                to="organizations.organization",
            ),
        ),
        migrations.AlterField(
            model_name="blogpost",
            name="blog",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, related_name="blog_posts", to="blogs.blog"
            ),
        ),
    ]
