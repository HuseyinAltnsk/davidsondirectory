import pymongo
import datetime
from pymongo import MongoClient
from sets import Set
import json
import getData
import sys
client = MongoClient('mongodb://localhost:27017/')
db = client.DavidsonDirectory
#db.Accident.remove({})
#db.Accident.insert({"hey":"there"})

Accident = db.Accident
#indexTourney = tournament.create_index([('tourney_id', pymongo.ASCENDING)], unique=True)
#indexWinner = player.create_index([('player_id', pymongo.ASCENDING)], unique=True)
#winner = {"hey":"there"}
#print indexWinner
#winner_id = player.insert_one(winner).inserted_id
#print indexWinner, indexWinner2, winner_id
# tournament.remove({})
# player.remove({})
# match.remove({})
dictAccident = {}
sys.stdout.flush()
data = getData.main()[0:-1]
 #STDOUT DOESNT'T RETURN ALL THE DATA, STOPS SOMEWHERE IN THE MIDDLE. DOESNT TAKE ALL THE DATA FROM THE API CALL RESULT
print (data)
print ("++++++++")