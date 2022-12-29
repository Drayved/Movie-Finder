fetch(`http://www.omdbapi.com/?apikey=8d4e3180`)
        .then(res => res.json())
        .then(data => console.log(data))


         // `
            // <div class="new-movie">
            //     <div>
            //         <img class="poster" src=${data.Poster}/>
            //         <h2 class="movie-title">${data.Title}</h2>
            //         <p class="stars"> ${data.imbdRating}</p>
            //     <div>
            //     <div class="bottom">
            //         <p class="runtime">${data.Runtime}</P>
            //         <p class="genre"> ${data.Genre}</p>
            //         <button class="watchlist-btn">
            //             <i class="fa-solid fa-circle-plus" data-add="${data.imbdID}"></i>&nbsp
            //         </button>

            //         <p class="watchlist-add">Watchlist</p>

            //     </div>
            //     <div class="plot">
            //         <p id="plot">${data.Plot}</p>
            //     </div>
            // </div>
            // `