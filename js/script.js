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

const searchInput = document.getElementById('title-input');
const searchResultsContainer = document.getElementById('search-results');

searchInput.addEventListener('input', handleInput);

function handleInput() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        clearSearchResults();
        return;
    }

    searchMedia(searchTerm)
        .then(results => {
            const suggestions = results.map(media => ({
                title: media.title || media.name, // Use "title" if available, otherwise use "name"
                poster_path: media.poster_path
            }));
            displaySearchResults(suggestions);
        })
        .catch(error => {
            console.error('Failed to fetch media suggestions:', error);
        });
}

function searchMedia(query) {
    const encodedQuery = encodeURIComponent(query);

    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodedQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.results;
        })
        .catch(error => {
            console.error('Failed to search media:', error);
            return [];
        });
}


function displaySearchResults(suggestions) {
    searchResultsContainer.innerHTML = '';

    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');

        if (suggestion.poster_path) {
            const posterPath = `https://image.tmdb.org/t/p/w200${suggestion.poster_path}`;
            const posterImage = document.createElement('img');
            posterImage.src = posterPath;
            posterImage.alt = `${suggestion.title} Poster`;
            posterImage.classList.add('poster-image');
            suggestionItem.appendChild(posterImage);
        }

        const titleElement = document.createElement('span');
        titleElement.textContent = suggestion.title;
        suggestionItem.appendChild(titleElement);

        searchResultsContainer.appendChild(suggestionItem);
    });
}

function clearSearchResults() {
    searchResultsContainer.innerHTML = '';
}






