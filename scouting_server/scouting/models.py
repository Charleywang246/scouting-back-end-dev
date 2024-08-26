from django.db import models

class GameInput(models.Model):
    scouter_name = models.CharField(max_length=10)
    game_number = models.PositiveIntegerField()
    team_number = models.PositiveIntegerField()
    not_participated = models.BooleanField()
    auto_taxi = models.BooleanField()
    auto_amp = models.PositiveIntegerField()
    auto_speaker = models.PositiveIntegerField()
    teleop_amp = models.PositiveIntegerField()
    teleop_speaker = models.PositiveIntegerField()
    endgame_state = models.CharField(max_length=10)
    disabled = models.BooleanField()
    driver_defense = models.PositiveIntegerField()
    driver_counterdefense = models.PositiveIntegerField()
    game_point = models.PositiveIntegerField()
    oppo_penal_points = models.PositiveIntegerField()
    comment = models.CharField(max_length=255)
