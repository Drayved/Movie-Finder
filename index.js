const searchBtn = document.querySelector(".search-btn")

const displayHtml = document.querySelector(".center")
const movieName = document.querySelector(".search-bar")
let userMoviesArr = []
const explore = document.querySelector(".empty")




console.log(localStorage)


movieName.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        searchBtn.click()
    }
})


searchBtn.addEventListener("click", movieSearch)

function movieSearch(){
    fetch(`https://www.omdbapi.com/?apikey=8d4e3180&s=${movieName.value}`)
        .then(res => res.json())
        .then(data => {
            
        if(data.Response){
            for (let movie of data.Search){
                render(movie)
            } 
        }
        else{
            displayHtml.innerHTML = `
            <h4>
                Sorry, there are no movies that match your search.
                Please try again later
                </h4>`
        } 
    })
}

function render(data){
    explore.classList.add("hidden")
    fetch(`https://www.omdbapi.com/?apikey=8d4e3180&i=${data.imdbID}`)
        .then(res => res.json())
        .then(data => {
            setTimeout(() =>{
            displayHtml.innerHTML += 
            `
            <div class="new-movie" data-id="${data.imdbID}">
                <div>
                    <img class="poster" src=${data.Poster}/>
                    <h2 class="movie-title">${data.Title} </h2>
                    <p class="stars"> ⭐${data.imdbRating}</p>
                <div>
                <div class="bottom">
                    <p class="runtime">${data.Runtime}</P>
                    <p class="genre"> ${data.Genre}</p>
                    <button class="add-btn" id="${data.imdbID}">
                        <img class="plus-icon" src="images/plus-icon.png">Watchlist
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
        },1000)
    })
   
    // code not working, was to keep button disabled on refresh, will fix later
    const temp = localStorage.getItem("userMovies")
    if (window.localStorage == temp){
        document.querySelectorAll(".add-btn").forEach(element => element.disabled = true);
    }
    
}




displayHtml.addEventListener("click", function(e){
    const movieEl = e.target.closest(".new-movie")
    const movieObj = {
        Title: movieEl.querySelector('.movie-title').textContent,
        Poster: movieEl.querySelector('.poster').src,
        imdbRating: movieEl.querySelector('.stars').textContent,
        Runtime: movieEl.querySelector('.runtime').textContent,
        Genre: movieEl.querySelector('.genre').textContent,
        Plot: movieEl.querySelector('.plot').textContent,
        imdbID: movieEl.querySelector('.imdbID').textContent
    }
 
    e.target.disabled = true
                      
    if(e.target.classList.contains("add-btn")) {

        if(localStorage.length > 0){
            userMoviesArr =JSON.parse(localStorage.getItem("userMovies"))
        }


        
        userMoviesArr.unshift(movieObj)
        localStorage.setItem("userMovies", JSON.stringify(userMoviesArr))
       


    }
})

// code not needed
// function searchDuplicates(userMoviesArray, movieTitle) {
//     const filteredArr = userMoviesArray.filter( userMovie => userMovie.Title === movieTitle);
//     return filteredArr.length !== 0 ? true : false;
// }
  


