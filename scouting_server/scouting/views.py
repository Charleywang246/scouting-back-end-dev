from django.shortcuts import render
from django.core.handlers.wsgi import WSGIRequest
from scouting.models import GameInput

def scouting(request : WSGIRequest):
    if request.method == "POST":
        data = GameInput(
            scouter_name=request.POST.get("scouter_name"),
            game_number=request.POST.get("game_number"),
            team_number=request.POST.get("team_number"),
            not_participated=request.POST.get("not_participated"),
            auto_taxi=request.POST.get("auto_taxi"),
            auto_amp=request.POST.get("auto_amp"),
            auto_speaker=request.POST.get("auto_speaker"),
            teleop_amp=request.POST.get("teleop_amp"),
            teleop_speaker=request.POST.get("teleop_speaker"),
            endgame_state=request.POST.get("endgame_state"),
            disabled=request.POST.get("disabled"),
            driver_defense=request.POST.get("driver_defense"),
            driver_counterdefense=request.POST.get("driver_counterdefense"),
            game_point=request.POST.get("game_point"),
            oppo_penal_points=request.POST.get("oppo_penal_points"),
            comment=request.POST.get("comment")
        )
        data.save()
    return render(request, "FSscouting.html")

def display(request : WSGIRequest):
    data = GameInput.objects.all().values()
    context = {
        "data": data
    }
    return render(request, "display.html", context)
