import time
import sys
import tensorflow as tf
import cv2
from tensorflow import keras
import tensorflow_hub as hub
import numpy as np
from os.path import exists

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


def load_model(model_path):
	if model_path is None or not exists(model_path):
		raise ValueError("saved_model_path must be the valid directory of a saved model to load.")
	model = tf.keras.models.load_model(model_path, custom_objects={'KerasLayer': hub.KerasLayer},compile=False)
	return model

def merge_consecutive(lst, min_size, max_size):
    merged = []
    start = None
    for i in range(len(lst) - 1):
        # if current time is 1 second less than the next time
        if lst[i] + 1 == lst[i + 1]:
            if start is None:
                start = lst[i]
        else:
            if start is not None:
                end = lst[i]
                # if tupple size is in range of max and min
                if end - start + 1 >= min_size and end - start + 1 <= max_size:
                    merged.append((start, end))
                start = None

    # for last tupple
    if start is not None:
        end = lst[-1]
        if end - start + 1 >= min_size and end - start + 1 <= max_size:
            merged.append((start, end))

    return merged

def check_video(video_path, jump):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    #print('\ntotal frames detected = ', total_frames)
    frames = []
    actual_frames = []
    for frame_index in range(0, total_frames, jump):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (224, 224))
        frame = keras.preprocessing.image.img_to_array(frame)
        frame /= 255        
        frames.append(frame)
        actual_frames.append(frame_index)
    return np.asarray(frames), actual_frames, fps


def program(model, video_path):
    frames, actual_frames, fps = check_video(video_path, 10)
    #print(fps)
    model_preds = model.predict(frames, {})
    labels = []
    for pred in model_preds:
        labels.append(np.argmax(np.array(pred)))

    time = []
    for i in range(len(labels)):
        if labels[i] == 3 or labels[i] == 4:
            time.append(round(actual_frames[i]/fps))
    if len(time) > 0:
        time = list(set(time))
    return time

def nsfw_model(video_path):
    model = load_model('./nsfw_mobilenet2.224x224.h5')
    times = program(model, video_path)
    min_size = 2
    max_size = 5
    result = merge_consecutive(times, min_size, max_size)
    return result

#timeframes = nsfw_model('C:/Users/saada/Downloads/dbz fight.mp4')

timeframes = nsfw_model(filepath)

valuess = processlist(timeframes)

print("cordz",valuess)