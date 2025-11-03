from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from rest_framework import status
from .models import Team,Player,Match
from .seralizers import TeamSerializer,PlayerSerializer,MatchSerializer

# Create your views here.


@api_view(['GET'])
def health(request):
    return Response({
        "status": "ok",
        "service": "hcafc-backend",
    })



@api_view(['GET', 'POST'])
def team_list(request):
    if request.method == 'GET':
        teams = Team.objects.all().order_by('name')
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE','PATCH'])
def team_detail(request, pk: int):
    try:
        team = Team.objects.get(pk=pk)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TeamSerializer(team)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = TeamSerializer(team, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])
def player_list(request):
    if request.method == 'GET':
        players = Player.objects.select_related('primary_team').all().order_by('last_name','first_name')
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET", "PUT", "PATCH", "DELETE"])
def players_detail(request, pk: int):
    player = get_object_or_404(Player, pk=pk)

    if request.method == "GET":
        return Response(PlayerSerializer(player, context={"request": request}).data)

    if request.method in ["PUT", "PATCH"]:
        partial = (request.method == "PATCH")
        serializer = PlayerSerializer(player, data=request.data, partial=partial,
                                      context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        player.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(["GET", "POST"])
def matches_list_create(request):
    if request.method == "GET":
        qs = Match.objects.select_related("match_team").all().order_by("-date")
        team_id = request.query_params.get("team")
        if team_id:
            qs = qs.filter(match_team_id=team_id)

        completed = request.query_params.get("completed")
        if completed is not None:
            # treat ?completed=true / false (case-insensitive)
            completed_bool = completed.lower() in ("1", "true", "yes")
            qs = qs.filter(match_completed=completed_bool)

        # date range filters ?from=YYYY-MM-DD&to=YYYY-MM-DD
        from_date = request.query_params.get("from")
        to_date = request.query_params.get("to")
        if from_date:
            qs = qs.filter(date__gte=from_date)
        if to_date:
            qs = qs.filter(date__lte=to_date)

        serializer = MatchSerializer(qs, many=True)
        return Response(serializer.data)

    # POST
    serializer = MatchSerializer(data=request.data)
    if serializer.is_valid():
        obj = serializer.save()
        return Response(MatchSerializer(obj).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def matches_detail(request, pk: int):
    obj = get_object_or_404(Match, pk=pk)

    if request.method == "GET":
        return Response(MatchSerializer(obj).data)

    if request.method in ["PUT", "PATCH"]:
        partial = (request.method == "PATCH")
        serializer = MatchSerializer(obj, data=request.data, partial=partial)
        if serializer.is_valid():
            obj = serializer.save()
            return Response(MatchSerializer(obj).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)