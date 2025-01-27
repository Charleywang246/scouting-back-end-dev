# Generated by Django 5.1 on 2024-08-25 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scouting', '0002_rename_speaker_count_gamedata_speaker'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameInput',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scouter_name', models.CharField(max_length=10)),
                ('speaker_count', models.PositiveIntegerField()),
                ('team_number', models.PositiveIntegerField()),
                ('not_participated', models.BooleanField()),
                ('auto_taxi', models.BooleanField()),
                ('auto_amp', models.PositiveIntegerField()),
                ('auto_speaker', models.PositiveIntegerField()),
                ('teleop_amp', models.PositiveIntegerField()),
                ('teleop_speaker', models.PositiveIntegerField()),
                ('endgame_state', models.CharField(max_length=10)),
                ('disabled', models.BooleanField()),
                ('driver_defense', models.PositiveIntegerField()),
                ('driver_counterdefense', models.PositiveIntegerField()),
                ('game_point', models.PositiveIntegerField()),
                ('oppo_penal_points', models.PositiveIntegerField()),
                ('comment', models.CharField(max_length=255)),
            ],
        ),
        migrations.DeleteModel(
            name='GameData',
        ),
    ]
