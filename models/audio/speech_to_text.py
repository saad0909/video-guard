import whisper

def transcribe_audio(audio_file):
    model = whisper.load_model('small')
    result = model.transcribe(audio_file, fp16=False)
    text =  result['text']
    return text


def estimate_timestamps(transcribed_text, audio_duration):
    # Split the transcribed text into segments (e.g., sentences) based on punctuation
    words = transcribed_text.split()

    segments = []
    for i in range(0, len(words), 3):
        segments.append(' '.join(words[i:i+3]))




    # Estimate the duration of each segment (assuming uniform reading speed)
    # You may need to adjust this heuristic based on your specific use case
    print ( "count is ", len(transcribed_text))
    print( "word len is  ",  len  (words))
    average_reading_speed = len(words) /  (audio_duration/60)  # Words per minute
    print(" avg speed "  , average_reading_speed)
    timestamps = []
    current_timestamp = 0
    for segment in segments:
        words = segment.split()
        segment_duration = len(words) / (average_reading_speed / 60)  # Duration in seconds
        timestamps.append({
            'segment': segment, 
            'start_time': current_timestamp-1,  
            'end_time': min(current_timestamp + segment_duration, audio_duration)
        })
        current_timestamp += segment_duration

    print(timestamps)
    return timestamps
"""
if __name__ == "__main__":
    audio_file = 'D:\open_ai_whisper\extracted_audio.wav'
    text = transcribe_audio(audio_file)
    print(text)
"""