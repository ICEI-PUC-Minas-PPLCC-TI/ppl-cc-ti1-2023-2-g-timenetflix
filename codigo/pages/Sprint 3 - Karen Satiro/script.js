function processarDados(jsonServerData, tmdbData) {
    // Lógica para processar os dados e filtrar os filmes desejados
    const listaDeFilmes = [];

    // Adicione lógica para processar os dados e adicionar filmes a listaDeFilmes
    // Exemplo simples: adiciona os primeiros 5 filmes da resposta do TMDb à listaDeFilmes
    for (let i = 0; i < 5 && i < tmdbData.results.length; i++) {
        listaDeFilmes.push(tmdbData.results[i]);
    }

    // Retorna a lista de filmes após o processamento
    return listaDeFilmes;
}

document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const movieForm = document.getElementById("movie-form");
    const moviesList = document.getElementById("movies-list");

    searchBtn.addEventListener("click", function () {
        const genre = document.getElementById("preferred-genres").value;
        const minReleaseDate = document.getElementById("minimum-release-date").value;
        const maxReleaseDate = document.getElementById("maximum-release-date").value;
  
        // URL para a API do JSON Server
        const jsonServerUrl = "https://jsonserver-genero.karencriscosta.repl.co/genres";
        
        // URLs para as APIs do TMDb
        const tmdbApiKey = "04b9f02b8bef9c95cf006c6f626af56c"; // Substitua com sua chave real
        const tmdbUrl1 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&primary_release_date.gte=${minReleaseDate}&primary_release_date.lte=${maxReleaseDate}&api_key=${tmdbApiKey}`;
        
        const tmdbUrl2 = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${tmdbApiKey}`; // Substitua com o segundo endpoint desejado
        
        // Array para armazenar as Promises de cada requisição
        const promises = [];
  
        // Requisição para o JSON Server
        const jsonServerPromise = fetch(jsonServerUrl)
            .then(response => response.json());
  
        // Requisições para as APIs do TMDb
        const tmdbPromise1 = fetch(tmdbUrl1)
            .then(response => response.json());
  
        const tmdbPromise2 = fetch(tmdbUrl2)
            .then(response => response.json());
  
        // Adiciona as Promises ao array
        promises.push(jsonServerPromise, tmdbPromise1, tmdbPromise2);
        
         // Usa Promise.all para aguardar que todas as requisições sejam concluídas
        Promise.all(promises)
        .then(responses => {
            const jsonServerData = responses[0];
            const tmdbData1 = responses[1];
            const tmdbData2 = responses[2];
        
            // Aqui você pode acessar jsonServerData, tmdbData1 e tmdbData2 para fazer o processamento necessário
            console.log("Dados do JSON Server:", jsonServerData);
            console.log("Dados do TMDb (1):", tmdbData1);
            console.log("Dados do TMDb (2):", tmdbData2);
        
            // Lógica para processar os dados e filtrar os filmes desejados
            const listaDeFilmes = processarDados(jsonServerData, tmdbData1);
        
            // Limpe a lista de filmes antes de adicionar novos
            moviesList.innerHTML = "";
        
            // Adicione cada filme à lista de filmes
            listaDeFilmes.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
        
            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Substitua com a URL real da imagem do filme
            movieCard.appendChild(moviePoster);
        
            const movieTitle = document.createElement('h2');
            movieTitle.textContent = movie.title; // Substitua com a propriedade real do título do filme
            movieCard.appendChild(movieTitle);
        
            moviesList.appendChild(movieCard);
            });
        })
            .catch(errors => {
                console.error("Erro na requisição:", errors);
            });
        });
        
    
});
        
