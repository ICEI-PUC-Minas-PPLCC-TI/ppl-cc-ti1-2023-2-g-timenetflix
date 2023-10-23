const preferredLanguages = document.getElementById("preferred-languages");
const preferredGenres = document.getElementById("preferred-genres");
const regions = document.getElementById('region')
const providerSelect = document.getElementById("provider");
const searchbtn = document.getElementById("search-btn");
const form = document.getElementById('form');
const submitButton = document.getElementById('submit-button');

// Fetch the list of available languages from your JSON server
fetch("https://jsonserver.andresalves01.repl.co/languages")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Populate the select element with language options
    data.forEach((language) => {
      const option = document.createElement("option");
      option.value = language.iso_639_1; // Use the ISO 639-1 code as the value
      option.textContent = language.english_name || language.name; // Use English name if available, otherwise use the local name
      preferredLanguages.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching languages:", error);
  });

// Fetch the list of available genres from your JSON server
fetch("https://jsonserver.andresalves01.repl.co/genres")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Populate the select element with genre options
    data.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.id; // Use the genre's unique ID as the value
      option.textContent = genre.name; // Use the genre's name
      preferredGenres.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching genres:", error);
  });

// Fetch the list of available genres from your JSON server
fetch("https://jsonserver.andresalves01.repl.co/regions")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Populate the select element with genre options
    data.forEach((region) => {
      const option = document.createElement("option");
      option.value = region.iso_3166_1; // Use the genre's unique ID as the value
      option.textContent = region.english_name; // Use the genre's name
      regions.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching genres:", error);
  });


// Function to fetch and populate provider options
const fetchProviders = (regionId) => {
  // Create a request object
  const request = new Request(
    `https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=${regionId}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjgyNTk3MjUyZjM0NWJmMDIxMTBkZDc4OTcxMjhjNiIsInN1YiI6IjY1MmQyMjUzZWE4NGM3MDEwYzFjZTFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7OIcZtdJ7QonQOVECjdwELVPDkO11xS-rnVguyxyZ8k'
      }
    }
  );

  // Clear existing provider options
  providerSelect.innerHTML = "";

  // Fetch providers based on the selected region
  fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      providerSelect.removeAttribute("disabled");

      const defaultOption = document.createElement("option");
      defaultOption.selected = true;
      defaultOption.textContent = "Selecione uma opção";
      providerSelect.appendChild(defaultOption);

      data.results.forEach((provider) => {
        const option = document.createElement("option");
        option.value = provider.provider_id;
        option.textContent = provider.provider_name;
        providerSelect.appendChild(option);
      });

      // Enable the "provider" select element
    })
    .catch((error) => {
      console.error("Error fetching providers:", error);
    });
};

// Event listener for the "region" select
regions.addEventListener("change", function () {
  const selectedRegion = regions.value;
  if (selectedRegion !== "Selecione uma opção") {
    // A region has been selected, fetch providers
    fetchProviders(selectedRegion);
  } else {
    // Reset and disable the "provider" select when no region is selected
    providerSelect.innerHTML = "<option selected value=\"\">Selecione uma opção</option>";
    providerSelect.setAttribute("disabled", "disabled");
  }
});

searchbtn.addEventListener("click", function () {
  var preferences = {};
  fetch('https://jsonserver.andresalves01.repl.co/preferences')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Now, you can access the data and store it in variables
      preferences.include_adult = data['include-adult'];
      preferences.language = data['preferred-languages'];
      preferences.with_genres = data['preferred-genres'];
      preferences['primary_release_date.gte'] = data['minimum-release-date'];
      preferences['primary_release_date.lte'] = data['maximum-release-date'];
      preferences.region = data['region'];
      preferences['vote_average.gte'] = data['minimum-rate'];
      preferences['vote_average.lte'] = data['maximum-rate'];
      preferences['with_runtime.gte'] = data['minimum-runtime'];
      preferences['with_runtime.lte'] = data['maximum-runtime'];
      preferences.with_watch_providers = data['provider'];
      preferences.with_keywords = data['keywords'];

      // Now, build the fetchUrl inside this block
      var fetchUrl = 'https://api.themoviedb.org/3/discover/movie?';
      for (const attribute in preferences) {
        if (preferences[attribute] !== undefined && preferences[attribute] !== "") {
          fetchUrl += `${attribute}=${preferences[attribute]}&`;
        }
      }
      fetchUrl = fetchUrl.slice(0, -1);
      console.log(fetchUrl)


      const request = new Request(
        fetchUrl,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjgyNTk3MjUyZjM0NWJmMDIxMTBkZDc4OTcxMjhjNiIsInN1YiI6IjY1MmQyMjUzZWE4NGM3MDEwYzFjZTFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7OIcZtdJ7QonQOVECjdwELVPDkO11xS-rnVguyxyZ8k'
          }
        }
      )

      fetch(request)
        .then(response => response.json())
        .then(data => {
          console.log(data)
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
            moviesList.appendChild(movieCard);
          });
        });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });


});

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Create a FormData object to collect form data
  const formData = new FormData(form);

  // Convert the FormData to a JSON object
  const formDataJSON = {};
  formData.forEach((value, key) => {
    formDataJSON[key] = value;
  });

  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.getAttribute('action'), true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      const response = JSON.parse(xhr.responseText);
      // Handle the response here, e.g., show a success message
      console.log(response);
    } else {
      // Request had an error
      // Handle the error here, e.g., display an error message
      console.error('Request failed:', xhr.status, xhr.statusText);
    }
  };

  xhr.send(JSON.stringify(formDataJSON));
});
