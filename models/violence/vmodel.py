import time
import sys
from video_model import violence_model
#from sensor import predict_violence
from video import video_model

filepath = ""
for ind, x in enumerate(sys.argv):
    if ind != 0:
        filepath += x+" "

#print(filepath)

#time.sleep(5)

def processlist(lst):
 if len(lst) == 0:
    return "empty"
 stri = ""
 for ind, x in enumerate(lst):
     if ind != 0:
        stri += ","
     stri+=str(x[0])
     stri+=","
     stri+=str(x[1])
 return stri

timeframes = []

timeframes = video_model(filepath)

#timeframes = predict_violence(filepath)

print("timeframes2: ", timeframes)
valuess = processlist(timeframes)
print("timeframes: ", timeframes)
print(":---", valuess, end="")