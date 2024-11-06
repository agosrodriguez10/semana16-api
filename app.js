document.getElementById('getSong').addEventListener('click', function() {
    const songNumber = document.getElementById('songNumber').value;

    // Verificar si el número está dentro del rango válido
    if (songNumber < 1 || songNumber > 208) {
        alert("Por favor, ingresa un número entre 1 y 208.");
        return;
    }

    // Verificar que songNumber sea un número válido
    const songNumberParsed = parseInt(songNumber, 10);
    if (isNaN(songNumberParsed)) {
        alert("Por favor, ingresa un número válido.");
        return;
    }

    // Llamada a la API
    fetch(`https://taylor-swift-api.sarbo.workers.dev/songs/${songNumberParsed}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Verificar la respuesta de la API
        const songInfoDiv = document.getElementById('songInfo');
        
        // Limpiar el contenido previo
        songInfoDiv.innerHTML = '';

        // Verificar si `data` tiene la información de la canción esperada
        if (data && data.song_title) {
            const songTitle = data.song_title || "Título no disponible";
            
            // Mostrar los detalles de la canción en el `div` HTML
            songInfoDiv.innerHTML = `
                <h2>${songTitle}</h2>
            `;
        } else {
            songInfoDiv.innerHTML = 'No se encontró la canción para este número.';
        }
    })
    .catch(error => {
        console.error('Error al obtener la canción:', error);
        alert("Hubo un error al obtener la canción. Intenta nuevamente.");
    });
});


