from moviepy.editor import VideoFileClip, concatenate_videoclips, AudioFileClip, AudioClip


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

def make_silence(duration):
    return  AudioClip(lambda t: 0, duration=duration)

def censor_video(video_path, censor_segments):
    print("censor_segments are :---", processlist(censor_segments), end="")

# video_processing.py
def extract_audio_from_video(video_path, audio_output_path="extracted_audio.wav"):
    clip = VideoFileClip(video_path)
    audio = clip.audio
    audio.write_audiofile(audio_output_path)
    return audio_output_path