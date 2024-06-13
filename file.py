import tkinter as tk
from tkinter import filedialog

def select_file():
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    file_path = filedialog.askopenfilename()

    if file_path:
        print(file_path, end="")
    else:
        print("No folder selected.")

if __name__ == "__main__":
    select_file()
