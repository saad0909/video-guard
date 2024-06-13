from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips, CompositeAudioClip
from skimage.filters import gaussian
import numpy as np
import os
import cv2
import sys


filepath = ""
for ind, x in enumerate(sys.argv):
    if ind != 0:
        filepath += x+" "

# print("filepath = ", filepath)

def blur_frame(frame, ksize=(101, 101)):
    return cv2.GaussianBlur(frame, ksize, 0)

class filter_video:
	def __init__(self, video_path, output_path=None):
		self.video_path = video_path
		if output_path is None:
			self.output_path = f"filtered_videos/filtered_{os.path.basename(video_path)}"
		else:
			self.output_path = output_path
		
		self.video = VideoFileClip(video_path)
	
	def remove_audio(self, timeframes, ):
		parts = []
		prev = 0
		for x in range(len(timeframes)):
			if x % 2 == 0:
				part1 = self.video.subclip(prev, timeframes[x])
				part2 = self.video.subclip(timeframes[x], timeframes[x+1]).without_audio()
				prev = timeframes[x+1]
				parts.append(part1)
				parts.append(part2)
		
		parts.append(self.video.subclip(prev, self.video.duration))

		final_video = concatenate_videoclips(parts)

		final_video.write_videofile(self.output_path, codec="libx264", audio_codec="aac")

		final_video.close()

		return self.output_path

	def add_beep(self, start_time, end_time):
		beep = AudioFileClip("beep.wav").subclip(0, end_time - start_time)

		part1 = self.video.subclip(0, start_time)
		part2 = self.video.subclip(start_time, end_time).without_audio()
		part3 = self.video.subclip(end_time, self.video.duration)

		part2 = part2.set_audio(beep)
		
		final_video = concatenate_videoclips([part1, part2, part3])

		final_video.write_videofile(self.output_path, codec="libx264", audio_codec="aac")
		return self.output_path
		

	def skip_scene(self, timeframes):
		parts = []
		prev = 0
		for x in range(len(timeframes)):
			if x % 2 == 0:
				part1 = self.video.subclip(prev, timeframes[x])
				prev = timeframes[x+1]
				parts.append(part1)
		
		parts.append(self.video.subclip(prev, self.video.duration))

		final_video = concatenate_videoclips(parts)

		final_video.write_videofile(self.output_path, codec="libx264", audio_codec="aac")

		final_video.close()
		
		return self.output_path
	
	def add_shutter(self, timeframes):
		parts = []
		prev = 0
		for x in range(len(timeframes)):
			if x % 2 == 0:
				part1 = self.video.subclip(prev, timeframes[x])
				part2 = self.video.subclip(timeframes[x], timeframes[x+1])
				prev = timeframes[x+1]
				blurred_frames = []
				for t in np.arange(part2.duration):
					frame = part2.get_frame(t)
					blurred_frame = gaussian(frame, sigma=3)
					blurred_frames.append(blurred_frame)
				
				blurred_part2 = [part2.fl(lambda gf, t: blurred_frames[min(int(t * part2.fps), len(blurred_frames) - 1)])]
				parts.append(part1)
				parts.append(*blurred_part2)
		
		parts.append(self.video.subclip(prev, self.video.duration))

		final_video = concatenate_videoclips(parts)

		final_video.write_videofile(self.output_path, codec="libx264", audio_codec="aac")

		final_video.close()
		
		return self.output_path

	def add_blur(self, timeframes):
		parts = []
		prev = 0
		for x in range(len(timeframes)):
			if x % 2 == 0:
				part1 = self.video.subclip(prev, timeframes[x])
				part2 = self.video.subclip(timeframes[x], timeframes[x+1]).fl_image(blur_frame)
				prev = timeframes[x+1]
				parts.append(part1)
				parts.append(part2)
		
		parts.append(self.video.subclip(prev, self.video.duration))

		final_video = concatenate_videoclips(parts)

		final_video.write_videofile(self.output_path, codec="libx264", audio_codec="aac")

		final_video.close()
		
		return self.output_path


def get_timeframes():
	audio_timeframes = []
	video_timeframes = []
	audio_filter = ""
	video_filter = ""
	with open("timeframes\\audio.txt", 'r') as f:
		for ind, x in enumerate(f):
			if (ind == 0):
				audio_filter = x.strip()
			else:
				for n in x.strip().split(','):
					audio_timeframes.append(int(n))
	f.close()

	with open("timeframes\\video.txt", 'r') as f:
		for ind, x in enumerate(f):
			if (ind == 0):
				video_filter = x.strip()
			else:
				for n in x.strip().split(','):
					video_timeframes.append(int(n))
	f.close()

	return audio_timeframes, video_timeframes, audio_filter, video_filter


audio_timeframes, video_timeframes, audio_filter, video_filter = get_timeframes()

# print("audio_timeframes = ", audio_timeframes)
# print("video_timeframes = ", video_timeframes)
# print("audio_filter = ", audio_filter)
# print("video_filter = ", video_filter)


vid = filter_video(filepath.strip())
output_path = vid.remove_audio(audio_timeframes)

vid = filter_video(output_path)
if video_filter == "skip":
	output_path2 = vid.skip_scene(video_timeframes)
elif video_filter == "blur":
	output_path2 = vid.add_blur(video_timeframes)
elif video_filter == "shutter":
	output_path2 = vid.add_shutter(video_timeframes)

#delete the original video
os.remove(output_path)

print("output_path :-= ", output_path2)

