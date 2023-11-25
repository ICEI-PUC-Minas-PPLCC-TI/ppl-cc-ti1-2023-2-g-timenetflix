document.addEventListener("DOMContentLoaded", function() {
    fetch('https://jsonserverfilmes--palmerbernardo.repl.co/movies')
        .then(response => response.json())
        .then(data => {
            const moviesList = document.getElementById('movies-list');
            let selectedMovies = [];

            data.results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';

                const moviePoster = document.createElement('img');
                moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieCard.appendChild(moviePoster);

                const movieTitle = document.createElement('h2');
                movieTitle.textContent = movie.title;
                movieCard.appendChild(movieTitle);

                movieCard.addEventListener('click', function() {
                    if (selectedMovies.includes(movie.id)) {
                        selectedMovies = selectedMovies.filter(m => m !== movie.id);
                        movieCard.style.border = "1px solid #ccc";
                    } else if (selectedMovies.length < 2) {
                        selectedMovies.push(movie.id);
                        movieCard.style.border = "2px solid blue";
                    }
                });

                moviesList.appendChild(movieCard);
            });

            const confirmBtn = document.getElementById('confirm-selection');
            confirmBtn.addEventListener('click', function() {
                if (selectedMovies.length === 2) {
                    alert(`${selectedMovies.length} filmes selecionados  com  IDs: ${selectedMovies.join(', ')}`);
                } else {
                    alert('Por favor selecione exatamente 2 filmes.');
                }
            });

        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
        });
});
