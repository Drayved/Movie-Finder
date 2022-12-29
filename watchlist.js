let displayHtml = document.querySelector(".center")
const empty = document.querySelector(".empty-container")
let userMoviesArr = JSON.parse( localStorage.getItem('userMovies') )

if ( localStorage.length != 0 ) {
    userMoviesArr.forEach(movie => renderMovieList(movie) )
}

function renderMovieList(data) {
    
    empty.classList.add("hidden")
    setTimeout(() =>{
    const html = 
    `
    <div class="new-movie" data-id="${data.imdbID}">
        <div>
            <img class="poster" src=${data.Poster}/>
            <h2 class="movie-title">${data.Title} </h2>
            <p class="stars"> ${data.imdbRating}</p>
        <div>
        <div class="bottom">
            <p class="runtime">${data.Runtime}</P>
            <p class="genre"> ${data.Genre}</p>
            <button class="remove-btn" id="${data.imdbID}">
                <img class="minus-icon" src="images/remove.png">Remove
            </button>
            <p class="watchlist-add"></p>
        </div>
        <div class="imdbID hidden">
        <p>${data.imdbID} </p>
        </div>
        <div class="plot">
            <p id="plot">${data.Plot}</p>
        </div>
    </div>
    `
    displayHtml.innerHTML += html
    }, 100)
}

displayHtml.addEventListener("click", removeMovie)

function removeMovie(e) {

    if (e.target.classList.contains("remove-btn")) {
        const indexOfObject = userMoviesArr.findIndex(object => {
            return object.imdbID === e.target.id
        })

        userMoviesArr.splice(indexOfObject, 1)
        localStorage.setItem("userMovies", JSON.stringify(userMoviesArr))    
        window.location.reload()
    }  
}


      
    
