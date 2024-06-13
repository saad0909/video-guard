from speech_to_text import transcribe_audio, estimate_timestamps
from beep_clip import censor_video, extract_audio_from_video
from detect import analyze_text
from pydub import AudioSegment
import math
import sys


video_path = ""
for ind, x in enumerate(sys.argv):
    if ind != 0:
        video_path += x+" "

# Step 0: Extract Audio from Video
audio_path = extract_audio_from_video(video_path)
print(audio_path)




# Step 1: Speech-to-Text
transcription_results = transcribe_audio(audio_path)

audio = AudioSegment.from_file(audio_path)
# Get the duration in milliseconds and convert it to seconds
duration_seconds = len(audio) / 1000.0
print( "duration sec  "  , duration_seconds)

timestamps = estimate_timestamps(transcription_results,duration_seconds)

print(timestamps[0]['start_time'])




toxic_segments = []
for chunk in timestamps:
    #print(chunk)
    toxicity_score = analyze_text(chunk['segment'])
    print("Toxicity Score:", toxicity_score)
    if toxicity_score > 0.5:
        print(chunk['segment'])
        toxic_segments.append((math.floor(chunk['start_time']), math.ceil(chunk['end_time']+0.6)))
        #print(chunk['start_time'], chunk['end_time']+0.6)



censor_video(video_path, toxic_segments)
