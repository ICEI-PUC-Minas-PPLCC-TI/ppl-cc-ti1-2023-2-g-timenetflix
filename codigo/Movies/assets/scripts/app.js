const apiUrl = 'https://jsonserver.adelinocompiani.repl.co/atore';  


let currentActorIndex = 0;

function updateActorInfo() {
    const actorInfo = actors[currentActorIndex];
    $('#actor-info').html(`
        <h3>${actorInfo.name}</h3>
    `);
}

function updateMovieList(actorName) {
    fetch(`${apiUrl}/movies/${actorName}`)
        .then(response => response.json())
        .then(data => {
            const movieList = data.map(movie => `<li>${movie.title}</li>`).join('');
            $('#movie-list').html(`<ul>${movieList}</ul>`);
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
}

$(document).ready(function () {
    // Assuming you've loaded actors from the server or hard-coded them
    const actors = [
        { name: 'Brad Pitt' },
        // Add more actors as needed
    ];

    // Initial page load
    updateActorInfo();
    updateMovieList(actors[currentActorIndex].name);

    // Event listener for Next Actor button
    $('#next-actor').click(function () {
        currentActorIndex = (currentActorIndex + 1) % actors.length;
        updateActorInfo();
        updateMovieList(actors[currentActorIndex].name);
    });
});



