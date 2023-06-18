fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const nowPlaying = document.getElementById('now-playing-movies-list');
        nowPlaying.innerHTML = data.results.map(movie => {
            const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return `
            <img src="${posterPath}" alt="${movie.title} poster" class="poster" onclick="displayMovieDetails(${movie.id})" />
            `;
        }).join('');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const topRatedTVSeries = document.getElementById('top-rated-tv-series-list');
        topRatedTVSeries.innerHTML = data.results.map(tvSeries => {
            const posterPath = `https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`;
            return `
        <img src="${posterPath}" alt="${tvSeries.name} poster" class="poster" onclick="displayTVSeriesDetails(${tvSeries.id})" />
      `;
        }).join('');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const upcomingMovies = document.getElementById('upcoming-movies-list');
        upcomingMovies.innerHTML = data.results.map(movie => {
            const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return `
            <img src="${posterPath}" alt="${movie.title} poster" class="poster" onclick="displayMovieDetails(${movie.id})" />
            `;
        }).join('');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const trendingMoviesList = document.getElementById('trending-movies-list');
        trendingMoviesList.innerHTML = data.results.map(movie => {
            const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return `
            <img src="${posterPath}" alt="${movie.title} poster" class="poster" onclick="displayMovieDetails(${movie.id})" />
            `;
        }).join('');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const popularList = document.getElementById('popular-movies-list');
        popularList.innerHTML = data.results.map(movie => {
            const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return `
            <img src="${posterPath}" alt="${movie.title} poster" class="poster" onclick="displayMovieDetails(${movie.id})" />
            `;
        }).join('');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const topRated = document.getElementById('top-rated-movies-list');
        topRated.innerHTML = data.results.map(movie => {
            const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return `
            <img src="${posterPath}" alt="${movie.title} poster" class="poster" onclick="displayMovieDetails(${movie.id})" />
            `;
        }).join('');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


function displayMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // Populate the modal with the movie data
            document.getElementById('movie-title-modal').textContent = data.title;
            document.getElementById('movie-genre-modal').textContent = data.genres.map(genre => genre.name).join(', ');
            document.getElementById('movie-year-modal').textContent = data.release_date;
            document.getElementById('movie-plot-modal').textContent = data.overview;
            document.getElementById('movie-poster-modal').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

            // Show the modal
            $('#add-movie-modal').modal('show');
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function displayTVSeriesDetails(tvSeriesId) {
    fetch(`https://api.themoviedb.org/3/tv/${tvSeriesId}?api_key=${TMDB_API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Populate the modal with the TV series data
            document.getElementById('tv-series-title-modal').textContent = data.name;
            document.getElementById('tv-series-genre-modal').textContent = data.genres.map(genre => genre.name).join(', ');
            document.getElementById('tv-series-year-modal').textContent = data.first_air_date;
            document.getElementById('tv-series-plot-modal').textContent = data.overview;
            document.getElementById('tv-series-poster-modal').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

            // Show the modal
            $('#add-tv-series-modal').modal('show');
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// function fetchMovieDetails(title) {
//     return fetch(`http://www.omdbapi.com/?t=${title}&apikey=${OMDB_KEY}`)
//         .then((response) => response.json())
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// }
//
// // Function to render the movie list
// function renderMovieList(movies) {
//     let movieListHtml = "";
//     movies.forEach((movie) => {
//         // Fetches movie details from the OMDB API for each movie
//         fetchMovieDetails(movie.title).then((omdbData) => {
//             const poster = omdbData.Poster;
//             // Generates the HTML code for the movie card using the fetched poster
//             movieListHtml += generateMovieCardHtml(movie, poster);
//             // Updates the movies list element with the updated HTML
//             Document.getElementById("movies-list").innerHTML = movieListHtml;
//         });
//     });
// }

function fetchMovieDetails(title) {
    return fetch(`http://www.omdbapi.com/?t=${title}&apikey=${OMDB_KEY}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error:", error);
        });
}

function renderMovieList(movies) {
    let movieListHtml = "";
    movies.forEach((movie) => {
        fetchMovieDetails(movie.title).then((omdbData) => {
            const poster = omdbData.Poster;
            movieListHtml += generateMovieCardHtml(movie, poster);
            document.getElementById("movies-list").innerHTML = movieListHtml;
        });
    });
}

function initializePage() {
    const serverUrl = "https://coconut-same-chive.glitch.me/movies/";
    fetch(serverUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const movies = data;
            console.log(data);
            renderMovieList(movies);
        })
        .catch((error) => {
            console.log(error);
        });
}


function generateMovieCardHtml(movie, poster) {
    return `
      <div class="card mb-4 mx-3">
        <img src="${poster}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-between card-bottom">
              <p class="card-text card-rating p-0">${generateStars(movie.rating)}</p>
              <div>
                <i class="fa-regular fa-pen-to-square edit-icon" data-movie-id="${movie.id}"></i>
                <i class="fa-solid fa-trash delete-icon" data-movie-id="${movie.id}"></i>
              </div>
            </div>
          </div>
        </div>
      </div>`;
}

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            // Appends a filled star icon if the index is less than the rating
            stars += '<i class="fas fa-star fa-lg"></i>';
        } else {
            // Appends an empty star icon if the index is greater than or equal to the rating
            stars += '<i class="far fa-star fa-lg"></i>';
        }
    }
    return stars;
}

document.addEventListener('DOMContentLoaded', initializePage);
