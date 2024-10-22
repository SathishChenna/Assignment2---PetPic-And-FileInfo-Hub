document.addEventListener('DOMContentLoaded', () => {
    const animalRadios = document.querySelectorAll('input[name="animal"]');
    const animalImage = document.getElementById('animalImage');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const selectedFileName = document.getElementById('selectedFileName');

    // Check if there's a selected animal from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedAnimal = urlParams.get('animal');
    if (selectedAnimal) {
        const radio = document.querySelector(`input[value="${selectedAnimal}"]`);
        if (radio) {
            radio.checked = true;
            showAnimal(selectedAnimal);
        }
    }

    animalRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const animal = radio.value;
            history.pushState(null, '', `/animal/${animal}`);
            showAnimal(animal);
        });
    });

    function showAnimal(animal) {
        fetch(`/get_animal/${animal}`)
        .then(response => response.json())
        .then(data => {
            animalImage.innerHTML = `<img src="${data.image}" alt="${animal}">`;
        })
        .catch(error => {
            console.error('Error:', error);
            animalImage.innerHTML = '<p class="error">Failed to load image. Please try again.</p>';
        });
    }

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            selectedFileName.value = file.name;
            
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                fileInfo.innerHTML = '<p class="error">File size exceeds 5MB limit.</p>';
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            fileInfo.innerHTML = '<p>Uploading...</p>';

            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    fileInfo.innerHTML = `<p class="error">${data.error}</p>`;
                } else {
                    history.pushState(null, '', `/file/${encodeURIComponent(data.name)}`);
                    fileInfo.innerHTML = `
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Size:</strong> ${data.size}</p>
                        <p><strong>Type:</strong> ${data.type}</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                fileInfo.innerHTML = '<p class="error">Failed to upload file. Please try again.</p>';
            });
        } else {
            selectedFileName.value = 'No file selected';
            fileInfo.innerHTML = '';
        }
    });
});
