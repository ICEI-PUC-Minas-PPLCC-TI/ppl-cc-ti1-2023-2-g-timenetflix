document.addEventListener("DOMContentLoaded", function() {
    fetch('https://jsonserverfilmes--palmerbernardo.repl.co/movies')
        .then(response => response.json())
        .then(data => {
            const moviesList = document.getElementById('movies-list');
            // Ordenar os filmes por data de lançamento e pegar os três mais recentes
            let recentMovies = data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).slice(0, 3);

            recentMovies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';

                const moviePoster = document.createElement('img');
                moviePoster.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                movieCard.appendChild(moviePoster);

                const movieTitle = document.createElement('h2');
                movieTitle.textContent = movie.title;
                movieCard.appendChild(movieTitle);

                const movieReleaseDate = document.createElement('p');
                movieReleaseDate.textContent = 'Data de lançamento: ' + movie.release_date;
                movieCard.appendChild(movieReleaseDate);

                moviesList.appendChild(movieCard);
            });

            // Alerta para o filme mais recente após 5 segundos
            setTimeout(() => {
                alert('Atençào: O filme mais recente é ' + recentMovies[0].title);
            }, 5000);
        });
});


