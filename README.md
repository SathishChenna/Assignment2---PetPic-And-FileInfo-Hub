# PetPic & FileInfo Hub

## Description

PetPic & FileInfo Hub is a web application that combines two fun and useful features: viewing adorable animal pictures and getting quick file information. This application allows users to select and view images of different animals (cat, dog, elephant) and upload files to get instant information about them.

## Features

1. **Animal Picture Viewer**
   - Select from three animals: Cat, Dog, or Elephant
   - View high-quality images of the selected animal

2. **File Information Tool**
   - Upload any file (up to 5MB)
   - Get instant information about the uploaded file:
     - File name
     - File size (in bytes, KB, or MB)
     - File type

## Technologies Used

- Backend: Python with Flask framework
- Frontend: HTML, CSS, JavaScript
- AJAX for asynchronous requests

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/petpic-fileinfo-hub.git
   cd petpic-fileinfo-hub
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install flask
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Open a web browser and go to `http://localhost:5001`

## Usage

1. **Viewing Animal Pictures**
   - In the "Select an Animal" section, click on the radio button next to the animal you want to view.
   - The image of the selected animal will appear below.

2. **Getting File Information**
   - In the "Select a File" section, click on "Choose a file" to select a file from your computer.
   - Once a file is selected, its information will automatically be displayed below.

## File Structure
