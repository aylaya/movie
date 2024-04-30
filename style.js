const apiKey = '7e3d70e2d0fc85df0bfb0113024f1a15';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const moviesContainer = document.getElementById('movies-container');
async function fetchMovies(query) {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const movies = data.results;
    return movies;
  } catch (error) {
    console.error(error);
  }
}
async function displayMovies(query) {
  const movies = await fetchMovies(query);
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard({
      title: movie.title,
      description: movie.overview,
      imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      rating: movie.vote_average
    });
    moviesContainer.appendChild(movieCard);
  });
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-card');
  const image = document.createElement('img');
  image.src = movie.imageUrl;
  card.appendChild(image);
  const title = document.createElement('h2');
  title.textContent = movie.title;
  card.appendChild(title);
  const description = document.createElement('p');
  description.textContent = movie.description;
  card.appendChild(description);
  const rating = document.createElement('p');
  rating.classList.add('rating');
  rating.textContent = `rating: ${movie.rating}`;
  card.appendChild(rating);
  return card;
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query !== '') {
    displayMovies(query);
  }
});

displayMovies(''); // 