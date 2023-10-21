const carouselInner = document.querySelector(".carousel-inner");
const galleries = document.querySelectorAll(".gallery");
const popularGallery = document.querySelector("#popular .gallery-inner");
const topRatedGallery = document.querySelector("#top-rated .gallery-inner");
const upcomingGallery = document.querySelector("#upcoming .gallery-inner");

window.onload = () => {
  loadSlideImages();
  loadPopularMovies();
  loadTopRatedMovies();
  loadUpcomingMovies();
};

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
      <div class="carousel-item">
        <img src="${movie.backdrop}" class="d-block w-100" alt="${movie.title}" />
        <div class="carousel-caption d-none d-md-block">
          <h1>${movie.title}</h1>
        </div>
      </div>
    `;
  });

  carouselInner.querySelector(".carousel-item").classList.add("active");
}

let firstGalleryItemWidth;

async function loadPopularMovies() {
  const res = await fetch("https://movies--rodrigomsrocha.repl.co/popular");
  const data = await res.json();
  const formattedPopular = data.slice(0, 10).map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    };
  });

  formattedPopular.forEach((movie) => {
    popularGallery.innerHTML += `
      <li class="gallery-item">
        <div class="poster">
          <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <strong>${movie.title}</strong>
      </li>
    `;
  });

  firstGalleryItemWidth = popularGallery.firstElementChild.offsetWidth;
}

async function loadTopRatedMovies() {
  const res = await fetch("https://movies--rodrigomsrocha.repl.co/top_rated");
  const data = await res.json();
  const formattedPopular = data.slice(0, 10).map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    };
  });

  formattedPopular.forEach((movie) => {
    topRatedGallery.innerHTML += `
      <li class="gallery-item">
        <div class="poster">
          <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <strong>${movie.title}</strong>
      </li>
    `;
  });
}

async function loadUpcomingMovies() {
  const res = await fetch("https://movies--rodrigomsrocha.repl.co/upcoming");
  const data = await res.json();
  const formattedPopular = data.slice(0, 10).map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    };
  });

  formattedPopular.forEach((movie) => {
    upcomingGallery.innerHTML += `
      <li class="gallery-item">
        <div class="poster">
          <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <strong>${movie.title}</strong>
      </li>
    `;
  });
}

galleries.forEach((gallery) => {
  const arrowBtns = gallery.querySelectorAll(".wrapper button");
  const galleryInner = gallery.querySelector(".gallery-inner");
  console.log(arrowBtns);

  let isDragging = false,
    startX,
    startScrollLeft;

  function dragStart(e) {
    isDragging = true;
    galleryInner.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = galleryInner.scrollLeft;
  }

  function dragging(e) {
    if (!isDragging) return;
    galleryInner.scrollLeft = startScrollLeft - (e.pageX - startX);
  }

  function dragStop() {
    isDragging = false;
    galleryInner.classList.remove("dragging");
  }

  let itensPerView = Math.round(galleryInner.offsetWidth / firstGalleryItemWidth);
  const galleryChildrens = Array.from(galleryInner.children);

  galleryChildrens
    .slice(-itensPerView)
    .reverse()
    .forEach((card) => {
      galleryInner.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  galleryChildrens.slice(0, itensPerView).forEach((card) => {
    galleryInner.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  galleryInner.classList.add("no-transition");
  galleryInner.scrollLeft = galleryInner.offsetWidth;
  galleryInner.classList.remove("no-transition");

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      galleryInner.scrollLeft +=
        btn.id === "left" ? -firstGalleryItemWidth : firstGalleryItemWidth;
    });
  });

  function coruselEdge() {
    arrowBtns.forEach((btn) => {
      btn.removeAttribute("disabled");
    });

    if (galleryInner.scrollLeft === 0) {
      arrowBtns[0].setAttribute("disabled", true);
    }

    if (
      Math.ceil(galleryInner.scrollLeft) ===
      galleryInner.scrollWidth - galleryInner.offsetWidth
    ) {
      arrowBtns[1].setAttribute("disabled", true);
    }
  }

  galleryInner.addEventListener("scroll", coruselEdge);
  galleryInner.addEventListener("mousedown", dragStart);
  galleryInner.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
});
