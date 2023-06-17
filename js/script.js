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
            
            <img src="${posterPath}" alt="${movie.title} poster" class="poster" />
               `;
        }).join('');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

