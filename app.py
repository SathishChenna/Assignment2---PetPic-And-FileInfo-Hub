from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

def format_file_size(size_in_bytes):
    """Convert size in bytes to human-readable format"""
    if size_in_bytes < 1024:
        return f"{size_in_bytes} bytes"
    elif size_in_bytes < 1024 * 1024:
        return f"{size_in_bytes / 1024:.2f} KB"
    else:
        return f"{size_in_bytes / (1024 * 1024):.2f} MB"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_animal', methods=['POST'])
def get_animal():
    animal = request.form.get('animal')
    return jsonify({'image': f'/static/images/{animal}.jpg'})

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        filename = file.filename
        file_size = len(file.read())
        file.seek(0)  # Reset file pointer
        file_type = file.content_type
        
        return jsonify({
            'name': filename,
            'size': format_file_size(file_size),
            'type': file_type
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
