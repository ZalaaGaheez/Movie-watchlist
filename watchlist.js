let watchlistHtml = ''
let watchlistArr = JSON.parse(localStorage.getItem('watchlist') || '[]')

render()

document.addEventListener('click', (e) => {
    if(e.target.dataset.id){
        removeMovie(e.target.dataset.id)
        render()
    }
})

function removeMovie(movieId){
    
    const indexToRemove = watchlistArr.findIndex(movie => movie.imdbID === movieId)
    watchlistArr.splice(indexToRemove, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlistArr))
    
}

function updateWatchlistHtml(movie){
    watchlistHtml += `
        <div class="movie">
            <div class="movie-poster">
                <img src=${movie.Poster}  alt="movie-poster"> 
            </div>
            <div class="movie-body">
                <div class="movie-data">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <p class="movie-rating">⭐${movie.imdbRating}</p>
                </div>
                <div class="movie-details">
                    <p class="movie-runtime">${movie.Runtime}</p>
                    <p class="movie-genre">${movie.Genre}</p>
                    <button class="add-remove-btn" data-id=${movie.imdbID}>
                        
                        Remove
                    </button>
                </div>
                <p class="movie-description">
                    ${movie.Plot}
                </p>
            </div>
        </div>
        <hr>
    
     `
}

function render() {
    watchlistHtml = ''
    if(watchlistArr.length){
        watchlistArr.forEach(movie => {
            updateWatchlistHtml(movie)
            renderWatchlist()
        })
    }else {
        renderWatchlistApology()
    }
}

function renderWatchlist(){
    document.getElementById("resultsContainer").innerHTML=watchlistHtml
}

function renderWatchlistApology(){
    document.getElementById("resultsContainer").innerHTML = `
        <div class='empty__watchlist'>
            <h2 >Your watchlist is looking little empty..</h2>
            <a href='./index.html'>Add your favourite movies</a>
        </div>
    `
}