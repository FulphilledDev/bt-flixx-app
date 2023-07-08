// This script is located in the head of each page and therefore runs on each page load.

const state = {
  currentPage: window.location.pathname,
};

async function testAPIKey() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjI5MDhhODI2YjE2ZTJjN2RmMWVhMTIyMDljY2M3ZCIsInN1YiI6IjY0YTllYTg3ZDFhODkzMDBlMmY4Y2E5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P4gFsWzc7p4OVc5b5GvXKwWe-wLfYDSfIXEjFrTBKbk',
    },
  };

  fetchAPIData('authentication', options)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

async function displayPopularMovies() {
  // Destructuring results returns the 'results' array from the data object returned
  const { results } = await fetchAPIData('movie/popular');
  //   console.log(results);

  results.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('card');
    movieDiv.innerHTML = `
     
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
            src="https://image/tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
                : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title"${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-movies').appendChild(movieDiv);
  });
}

// Fetch data from TMDB API
// NOTE: FOR PRODUCTION--> create own backend server and make the request to THAT server where API Key is stored, then request from there to TMDB DB
async function fetchAPIData(endpoint) {
  const API_KEY = '9b2908a826b16e2c7df1ea12209ccc7d';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
}

// Highlight Active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === state.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init App
// Custom 'router' for page links
function init() {
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      //   console.log('Home');
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
  //   testAPIKey();
}

document.addEventListener('DOMContentLoaded', init);
