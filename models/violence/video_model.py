#!/D:/electron app project/models/vmodel/venv/Scripts/python

import cv2
import numpy as np
import tensorflow as tf
keras = tf.keras
models = tf.keras.models
applications = tf.keras.applications


# Load the pretrained ResNet50 model without the top (classification) layer
base_model = applications.ResNet50V2(weights='imagenet', include_top=False)

# Remove the top (classification) layer
x = base_model.output

# Create a new model with modified output
model = models.Model(inputs=base_model.input, outputs=x)

# function to make windows of given video
def split_integer_into_ranges(value, range_size):
    if value < 0 or range_size <= 0:
        return None
    num_ranges = (value + range_size - 1) // range_size
    range_list = []
    for i in range(num_ranges):
        start = i * range_size
        end = min((i + 1) * range_size - 1, value)
        range_list.append((start, end))
    return range_list

# function to count the total frames of video
def count_total_frames_fps(video_path):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    if not cap.isOpened():
        print("Error: Could not open video file.")
        return -1
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    cap.release()
    return total_frames, fps

# function to extract the features from 
def extract_frame_features(video_path, start, end):
    cap = cv2.VideoCapture(video_path) # capturin the video from the path
    frames = [] # array to save frame features
    # extracting the frames of given window
    for frame_index in range(start, end): 
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (224, 224))
        frame = np.expand_dims(frame, axis=0)
        frame = base_model.predict(frame, verbose=0)
        frames.append(frame)

    cap.release()
    print(np.array(frames).shape)
    return np.array(frames)

# function to extract features of a given video
def extract_features_from_video(video_path, result):
  X = []
  y = []
  if result:
    for i, (start, end) in enumerate(result):
        video_features = extract_frame_features(video_path, int(start), int(end))
        X.append(video_features)
    X = np.stack(X, axis = 0)
    X = X.reshape((-1, 100, 7, 7, 2048))
  else:
    print("Invalid input.")
  return X

def merge_adjacent_tuples(tuple_list):
    merged_list = []
    start = None
    end = None
    for tup in tuple_list:
        if start is None:
            start, end = tup
        elif tup[0] == end:
            end = tup[1]
        else:
            merged_list.append((start, end))
            start, end = tup  
    if start is not None and end is not None:
        merged_list.append((start, end))
    return merged_list

def get_time_stamps(predictions, fps):
    violent_windows = []
    time_stamps = []
    for i in range(len(predictions)):
        if predictions[i] > 0.5:
            violent_windows.append(i * 100)
    for start in violent_windows:
        time_stamps.append((int(start/fps), int(((start + 100)/fps))))
    time_stamps = merge_adjacent_tuples(time_stamps)
    return time_stamps


def violence_model(video_path):
    range_size = 101 # window size including the frame of split (window size = 100)
    value, fps = count_total_frames_fps(video_path) # counting total frames of video
    print('total frames = ', value)
    result = split_integer_into_ranges(value, range_size)
    result.pop() # poping last value to avoid under sizing
    X = extract_features_from_video(video_path, result)
    sense = models.load_model('D:\electron app project\models\super100.h5')
    predictions = sense.predict(X)
    time_stamps = get_time_stamps(predictions, fps)
    return time_stamps