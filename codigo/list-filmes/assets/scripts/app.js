const carouselInner = document.querySelector(".carousel-inner");
const gallery = document.querySelector(".gallery");
const arrowBtns = document.querySelectorAll(".wrapper i");

window.onload = () => {
  loadSlideImages();
  loadPopularMovies();
};

const galleryChildrens = [...gallery.children];

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
    gallery.innerHTML += `
      <li class="gallery-item">
        <div class="poster">
          <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <strong>${movie.title}</strong>
      </li>
    `;
  });

  firstGalleryItemWidth = gallery.querySelector(".gallery-item").offsetWidth;
}

let isDragging = false,
  startX,
  startScrollLeft;

function dragStart(e) {
  isDragging = true;
  gallery.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = gallery.scrollLeft;
}

function dragging(e) {
  if (!isDragging) return;
  gallery.scrollLeft = startScrollLeft - (e.pageX - startX);
}

function dragStop() {
  isDragging = false;
  gallery.classList.remove("dragging");
}

let itensPerView = Math.round(gallery.offsetWidth / firstGalleryItemWidth);
galleryChildrens
  .slice(-itensPerView)
  .reverse()
  .forEach((card) => {
    gallery.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

galleryChildrens.slice(0, itensPerView).forEach((card) => {
  gallery.insertAdjacentHTML("beforeend", card.outerHTML);
});

gallery.classList.add("no-transition");
gallery.scrollLeft = gallery.offsetWidth;
gallery.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    gallery.scrollLeft +=
      btn.id === "left" ? -firstGalleryItemWidth : firstGalleryItemWidth;
  });
});

function infiniteScroll() {
  arrowBtns.forEach(btn => {
    btn.classList.remove("disabled");
  })

  if (gallery.scrollLeft === 0) {
    arrowBtns[0].classList.add("disabled");
  }

  if (
    Math.ceil(gallery.scrollLeft) ===
    gallery.scrollWidth - gallery.offsetWidth
  ) {
    arrowBtns[1].classList.add("disabled");
  }
}

gallery.addEventListener("scroll", infiniteScroll);
gallery.addEventListener("mousedown", dragStart);
gallery.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
