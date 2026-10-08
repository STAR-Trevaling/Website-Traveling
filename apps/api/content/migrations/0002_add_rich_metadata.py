from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="article",
            name="read_time",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name="article",
            name="category",
            field=models.CharField(blank=True, max_length=80),
        ),
        migrations.AddField(
            model_name="article",
            name="author_name",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AddField(
            model_name="article",
            name="author_role",
            field=models.CharField(blank=True, max_length=160),
        ),
        migrations.AddField(
            model_name="article",
            name="author_avatar",
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name="article",
            name="tags",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
