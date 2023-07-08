// This script is located in the head of each page and therefore runs on each page load.

const state = {
  currentPage: window.location.pathname,
};

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
      console.log('Home');
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
}

document.addEventListener('DOMContentLoaded', init);
