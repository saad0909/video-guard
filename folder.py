import tkinter as tk
from tkinter import filedialog

def select_folder():
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    folder_path = filedialog.askdirectory()
    if folder_path:
        print(folder_path, end="")
    else:
        print("No folder selected.")

if __name__ == "__main__":
    select_folder()
