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
        const moviesList = document.getElementById('movies-list');
        moviesList.innerHTML = data.results.map(movie => {
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



