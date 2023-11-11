const inputFieldOne = document.getElementById("first-movie")
const inputFieldTwo = document.getElementById("second-movie")

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

async function fetchData(inputField) {
  // Get the value from the input field
  const inputValue = inputField.value.trim();

  if (!inputValue) {
    // If input is empty, remove the results div (if it exists)
    const resultsDiv = document.querySelector(".results");
    if (resultsDiv) {
      resultsDiv.remove();
    }
    return; // Exit the function early if input is empty
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjA1ZjdlOWUzNDk2N2MxYThmYzM4MTk4ODJhMjU4YiIsInN1YiI6IjYwM2IyMWMyMTc2YTk0MDA0ZjU1YjQzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TfBidjP9aLgFQPowvIE1Kpa9GMdwe-8Pv922G6Em1SY",
        },
      }
    );
    const data = await response.json();
    const formattedData = data.results.slice(0, 5);

    const existingResultsDiv = document.querySelector(".results");
    if (existingResultsDiv) {
      // If exists, update its content with HTML
      existingResultsDiv.innerHTML = generateHTMLContent(formattedData);
    } else {
      // If not, create and insert the results div with HTML content
      const resultsDiv = document.createElement("div");
      resultsDiv.innerHTML = generateHTMLContent(formattedData);
      resultsDiv.classList.add("results");
      inputField.insertAdjacentHTML("afterend", resultsDiv.outerHTML);
    }
  } catch(error) {
    console.error("Error fetching data:", error);
  }
}

function generateHTMLContent(data) {
  // Customize this function to generate the desired HTML content based on your data
  return data
    .map(
      (item) => `
    <div id=${item.id} class="results-item">
      <img src="https://image.tmdb.org/t/p/original${item.poster_path}" />
      <div>
        <strong>${item.title}</strong>
        <time>${item.release_date}</time>
      </div>
    </div>`
    )
    .join("");
}

const debouncedFetchData1 = debounce(() => fetchData(inputFieldOne), 500);
const debouncedFetchData2 = debounce(() => fetchData(inputFieldTwo), 500);

inputFieldOne.addEventListener("input", debouncedFetchData1);
inputFieldTwo.addEventListener("input", debouncedFetchData2);

document.addEventListener('mousedown', (event) => {
  const clickedElement = event.target;

  const isResultsItem = clickedElement.closest('.results-item');

  if (isResultsItem) {
    // Extract information from the clicked item
    const posterPath = isResultsItem.querySelector('img').src;
    const movieId = isResultsItem.id;
    
    const parentContainer = isResultsItem.parentNode.parentNode;
    const siblingLabel = parentContainer.querySelector('.option-poster');

    if (siblingLabel && siblingLabel.tagName === 'LABEL') {
      siblingLabel.innerHTML = ''; // Clear existing content
      const posterImage = document.createElement('img');
      posterImage.src = posterPath;
      posterImage.classList.add("poster")
      siblingLabel.appendChild(posterImage);

      // Store the movie ID for later use
      siblingLabel.dataset.movieId = movieId;
    }
  }
});

inputFieldOne.addEventListener('blur', () => {
  const resultsDiv = document.querySelector('.results');
  if (resultsDiv) {
    resultsDiv.remove();
  }
});

inputFieldTwo.addEventListener('blur', () => {
  const resultsDiv = document.querySelector('.results');
  if (resultsDiv) {
    resultsDiv.remove();
  }
});
