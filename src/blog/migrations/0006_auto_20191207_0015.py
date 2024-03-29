# Generated by Django 3.0 on 2019-12-06 23:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("blog", "0005_delete_image"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="illustration",
        ),
        migrations.CreateModel(
            name="PostImage",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("file", models.ImageField(upload_to="blog/")),
                ("title", models.CharField(max_length=256)),
                ("tags", models.ManyToManyField(blank=True, to="blog.Tag")),
            ],
        ),
        migrations.AddField(
            model_name="post",
            name="images",
            field=models.ManyToManyField(blank=True, to="blog.PostImage"),
        ),
    ]
