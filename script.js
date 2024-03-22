const searchForm = document.getElementById('searchForm');
const searchField = document.getElementById('searchField');
const resultsContainer = document.getElementById('resultsContainer');

let apiUrl = '';
let resultsHTML = '';
let movies = [];
let detailedMovies = [];
let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchField.value.trim();

    if (query.length === 0) {
        renderMessage("Please enter a search query.");
        return;
    }

    apiUrl = `https://www.omdbapi.com/?s=${query}&type=movie&apikey=b35db64b`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'False') {
                renderMessage("No results found. Please try again.");
            } else {
                movies = data.Search;
                for (let movie of movies) {
                    getMovieDetails(movie.imdbID);
                }
            }
        })
        .catch(error => {
            renderMessage("An error occurred. Please try again later.");
        });

    resultsContainer.innerHTML = ``;
});

document.addEventListener('click', (event) => {
    if (event.target.dataset.id) {
        const selectedMovie = detailedMovies.find(movie => movie.imdbID === event.target.dataset.id);
        if (selectedMovie && !watchlist.includes(selectedMovie)) {
            watchlist.push(selectedMovie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
    }
});

function getMovieDetails(movieId) {
    apiUrl = `https://www.omdbapi.com/?i=${movieId}&?type=movie&apikey=b35db64b`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            detailedMovies.push(data);
            renderMovie(data);
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
}

function renderMovie(movie) {
    resultsContainer.innerHTML += `
        <div class="movie">
        <div class="movie-poster">
                <img src=${movie.Poster}  alt="movie-poster"> 
            </div>
            <h2>${movie.Title}</h2>
            <p>${movie.Plot}</p>

            <div class="movie-details">
                             <h2 class="movie-title">${movie.Title}</h2>
                           <p class="movie-rating">Rating: ${movie.imdbRating}</p>
                         <p class="movie-runtime">Runtime: ${movie.Runtime}</p>
                           <button class="add-to-watchlist" data-id="${movie.imdbID}">Add to Watchlist</button>
                       </div>

            
        </div>`;

        const addToWatchlistBtn = movieElement.querySelector('.add-to-watchlist');
                addToWatchlistBtn.addEventListener('click', () => addToWatchlist(movie));
        
                resultsContainer.appendChild(movieElement);
            };
        
        
        function addToWatchlist(movie) {
            if (!watchlist.some(item => item.imdbID === movie.imdbID)) {
                watchlist.push(movie);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                displayMessage("Added to watchlist successfully.");
            } else {
                displayMessage("This movie is already in your watchlist.");
            }
        }
        document.getElementById('watchlist').addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-from-watchlist')) {
                const movieId = event.target.getAttribute('data-id');
                watchlist = watchlist.filter(item => item.imdbID !== movieId);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                renderWatchlist();
            }
        });
        


function renderMessage(message) {
    resultsContainer.innerHTML = `<p>${message}</p>`;
}

