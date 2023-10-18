const carouselInner = document.querySelector(".carousel-inner");

async function loadSlideImages() {
  const res = await fetch("https://movies--rodrigomsrocha.repl.co/now_playing");
  const data = await res.json();
  const formattedMovies = data.slice(0, 4).map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
    };
  });

  formattedMovies.forEach((movie) => {
    carouselInner.innerHTML += `
      <div class="carousel-item active">
        <img src="${movie.backdrop}" class="d-block w-100" alt="${movie.title}" />
        <div class="carousel-caption d-none d-md-block">
          <h1>${movie.title}</h1>
        </div>
      </div>
    `;
  });
}

window.onload = loadSlideImages;
