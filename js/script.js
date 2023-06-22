"use strict";

$(document).ready(function () {
    // API key for the OMDB API
    const OMDB_API_KEY = OMDB_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3/';
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

    // URL for the server
    const SERVER_URL = "https://coconut-same-chive.glitch.me/movies/";

    // jQuery objects for DOM elements
    const $MOVIES_LIST = $("#movies-list");
    const $SEARCH_RESULTS = $("#search-results");

    // Function to show the loading spinner
    function showLoadingSpinner() {
        $MOVIES_LIST.html(
            `<div class="lds-dual-ring"></div>`
        );
        $MOVIES_LIST.addClass("spinner-container");
    }

    // Function to hide the loading spinner
    function hideLoadingSpinner() {
        $MOVIES_LIST.removeClass("spinner-container");
    }


// Define the fetch and process function.
    async function fetchAndProcess(url, containerId, detailFunction) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const container = document.getElementById(containerId);

            container.innerHTML = data.results.map(item => {
                const posterPath = `${IMAGE_URL}${item.poster_path}`;
                return `
                <img src="${posterPath}" alt="${item.title || item.name} poster" class="top-rated-poster" onclick="${detailFunction}(${item.id})" />
            `;
            }).join('');
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

// Use the function for each specific case.
    fetchAndProcess(`${BASE_URL}tv/top_rated?api_key=${TMDB_API_KEY}`, 'top-rated-tv-series-list', 'displayTVSeriesDetails');
    fetchAndProcess(`${BASE_URL}trending/movie/week?api_key=${TMDB_API_KEY}`, 'trending-movies-list', 'displayMovieDetails');
    fetchAndProcess(`${BASE_URL}movie/top_rated?api_key=${TMDB_API_KEY}`, 'top-rated-movies-list', 'displayMovieDetails');



    // Function to generate star icons based on a rating
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

    // Function to generate HTML for a movie card
    function generateMovieCardHtml(movie, poster) {
        return `
        <div class="movie-details mr-3 mb-2">
        <img src="${poster}" class="card-img-top" alt="${movie.title}">
          <div class="d-flex flex-column card-bottom pt-2">
            <p class="card-title wrap-text d-inline text-center">${movie.title}</p>
            <div class="d-flex justify-content-between px-3">
              <p class="card-text card-rating p-0">${generateStars(movie.rating)}</p>
              <div class="">
                <i class="fa-regular fa-pen-to-square edit-icon fa-lg mr-2" data-movie-id="${movie.id}"></i>
                <i class="fa-solid fa-trash delete-icon fa-lg" data-movie-id="${movie.id}"></i>
              </div>
            </div>
          </div>
        </div>`;
    }

    // Function to fetch movie details from the OMDB API
    function fetchMovieDetails(title) {
        return fetch(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`)
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Function to render the movie list
    function renderMovieList(movies) {
        let movieListHtml = "";
        movies.forEach((movie) => {
            // Fetches movie details from the OMDB API for each movie
            fetchMovieDetails(movie.title).then((omdbData) => {
                const poster = omdbData.Poster;
                // Generates the HTML code for the movie card using the fetched poster
                movieListHtml += generateMovieCardHtml(movie, poster);
                // Updates the movies list element with the updated HTML
                $MOVIES_LIST.html(movieListHtml);
            });
        });
    }

    // Function to load movies from the server based on the given type
    function loadMovies(type) {
        // Constructs the URL for the API call based on the specified type
        const url = `https://coconut-same-chive.glitch.me/movies?type=${type}`;
        // Makes an AJAX request to retrieve the movies data
        $.ajax({
            url: url,
            method: "GET",
        })
            .done(function (data) {
                const movies = data;
                // Renders the movie list using the retrieved movies data
                renderMovieList(movies);
            })
            .fail(function (error) {
                console.log(error);
            });
    }

    // Event handler for the delete icon click
    function handleDeleteIconClick() {
        // Retrieves the movie ID from the clicked delete icon
        const movieId = $(this).data("movie-id");
        // Sets the movie ID as a data attribute on the delete modal and shows the modal
        $("#delete-modal").data("movie-id", movieId).modal("show");
        // Event handler to the confirm delete button
        $("#confirm-delete").on("click", function () {
            // Retrieves the movie ID from the delete modal
            const movieId = $("#delete-modal").data("movie-id");
            // Makes an AJAX request to delete the movie with the specified ID
            $.ajax({
                url: `https://coconut-same-chive.glitch.me/movies/${movieId}`,
                method: "DELETE",
            })
                .then(() => fetch(SERVER_URL))
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    location.reload();
                });
            $("#delete-modal").modal("hide");
        });
    }

    // Event handler for the edit icon click
    function handleEditIconClick() {
        // Retrieves the movie ID from the clicked edit icon
        const movieId = $(this).data("movie-id");
        // Makes an AJAX request to retrieve the movie details for the specified movie ID
        $.ajax({
            url: `https://coconut-same-chive.glitch.me/movies/${movieId}`,
            method: "GET",
        }).done(function (movie) {
            // Once the movie details are retrieved, fetches additional details from OMDB API
            fetchMovieDetails(movie.title).then((omdbData) => {
                const type = omdbData.Type;

                // Populates the edit modal with the movie details
                $("#edit-title-input").val(movie.title);
                $("#edit-rating-input").val(movie.rating);
                $("#edit-type-input").val(type);
                $("#edit-modal").data("movie-id", movieId);

                // Sets the movie ID as a data attribute on the edit modal and shows the modal
                $("#edit-modal").modal("show");
            });
        });
    }

    // Event handler for the save edit button click
    function handleSaveEditButtonClick() {
        // Retrieves the movie ID from the edit modal data attribute
        const movieId = $("#edit-modal").data("movie-id");

        // Retrieves the updated title, rating, and type from the input fields
        const updatedTitle = $("#edit-title-input").val();
        const updatedRating = $("#edit-rating-input").val();
        const updatedType = $("#edit-type-input").val();

        // Makes an AJAX request to update the movie details
        $.ajax({
            url: `https://coconut-same-chive.glitch.me/movies/${movieId}`,
            method: "PUT",
            data: {
                title: updatedTitle,
                rating: updatedRating,
                type: updatedType,
            },
        })
            .then(() => fetch(SERVER_URL))
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                location.reload();
            });

        // Hides the edit modal
        $("#edit-modal").modal("hide");
    }

    // Event handler for the search input keyup
    function handleSearchKeyUp() {
        // Retrieves the search text from the input field
        const searchText = $(this).val();

        // Checks if the search text length is greater than 2
        if (searchText.length > 2) {
            $.ajax({
                url: `https://www.omdbapi.com/?s=${searchText}&apikey=${OMDB_API_KEY}`,
                method: "GET",
            })
                .done(function (response) {
                    // Retrieves the movies from the response
                    const movies = response.Search;
                    let suggestions = "";
                    if (movies) {
                        // Loops through each movie and generate suggestion HTML
                        movies.forEach((movie) => {
                            suggestions += `
                <div class="suggestion d-flex pl-3 mb-2">
                  <img src="${movie.Poster}" alt="${movie.Title}" class="poster mr-2">
                  <p class="title align-self-center">${movie.Title}</p>
                </div>`;
                        });
                    }
                    // Updates the search results container with the generated suggestions
                    $SEARCH_RESULTS.html(suggestions);
                })
                .fail(function (error) {
                    console.log(error);
                });
        }
    }

    // Event handler for the suggestion click
    function handleSuggestionClick() {
        // Gets the selected title from the clicked suggestion
        const selectedTitle = $(this).text();
        // Sets the selected title as the value of the movie title input
        $("#movie-title-modal").val(selectedTitle);
        // Clears the search results container
        $SEARCH_RESULTS.empty();
        // Makes an AJAX request to fetch movie details using the OMDB API
        $.ajax({
            url: `https://www.omdbapi.com/?t=${selectedTitle}&apikey=${OMDB_API_KEY}`,
            method: "GET",
        })
            // Updates the movie details in the modal with the retrieved data
            .done(function (response) {
                $("#movie-title-modal").text(response.Title);
                $("#movie-genre-modal").text(response.Genre);
                $("#movie-year-modal").text(response.Year);
                $("#movie-plot-modal").text(response.Plot);
                $("#movie-type-modal").text(response.Type);
                $("#movie-poster-modal").attr("src", response.Poster);
            })
            .fail(function (error) {
                console.log(error);
            });
        // Shows the add movie modal
        $("#add-movie-modal").modal("show");
    }

    // Event handler for closing search results
    function handleCloseSearchResults(event) {
        // Checks if the clicked element is not a descendant of the title input or search results
        if (!$(event.target).closest("#title-input").length && !$(event.target).closest("#search-results").length) {
            // Clears the search results container
            $SEARCH_RESULTS.empty();
        }
    }

    // Event handler for card click
    function handleCardClick(event) {
        // Checks if the clicked element is the edit icon or delete icon
        if ($(event.target).closest(".edit-icon").length || $(event.target).closest(".delete-icon").length) {
            // Exits the function if the click event occurred on the edit or delete icon
            return;
        }
        // Retrieves the movie title from the clicked movie card
        const movieTitle = $(this).find(".card-title").text();
        // Retrieves additional movie details from the OMDB API
        $.ajax({
            url: `https://www.omdbapi.com/?t=${movieTitle}&apikey=${OMDB_API_KEY}`,
            method: "GET",
        })
            .done(function (response) {
                // Updates the movie details in the view movie modal
                $("#view-movie-title-modal").text(response.Title);
                $("#view-movie-genre-modal").text(response.Genre);
                $("#view-movie-year-modal").text(response.Year);
                $("#view-movie-plot-modal").text(response.Plot);
                $("#view-movie-rating-modal").text(response.imdbRating);
                $("#view-movie-poster-modal").attr("src", response.Poster);
            })
            .fail(function (error) {
                console.log(error);
            });
        // Shows the view movie modal
        $("#view-movie-modal").modal("show");
    }

    // Function to initialize event listeners
    function initializeEventListeners() {
        $("body").on("click", ".delete-icon", handleDeleteIconClick);
        $("body").on("click", ".edit-icon", handleEditIconClick);
        $("body").on("click", ".movie-details", handleCardClick);
        $("#save-edit-button").on("click", handleSaveEditButtonClick);
        $("#save-add-button").on("click", handleSaveAddButtonClick);
        $("#title-input").on("keyup", handleSearchKeyUp);
        $("#search-results").on("click", ".suggestion", handleSuggestionClick);
        $(document).on("click", handleCloseSearchResults);
        $(".genre-filter").on("click", handleGenreFilterClick);
    }

    // Function to handle genre filter click
    function handleGenreFilterClick() {
        // Map of genre filter IDs to corresponding OMDB types
        const typeMap = {
            movies: "movie",
            "tv-shows": "series",
        };
        // Retrieves the clicked filter ID
        const clickedId = $(this).attr("id");
        // Determines the OMDB type based on the clicked filter ID
        const type = typeMap[clickedId];
        // Loads movies of the selected type
        loadMovies(type);
    }

    // Function to handle save add button click
    function handleSaveAddButtonClick() {
        // Retrieves the values of the new movie's title, rating, and type from the input fields
        const newTitle = $("#movie-title-modal").val().trim();
        const newRating = $("#movie-rating-modal").val();
        const newType = $("#movie-type-modal").text();
        // Makes an AJAX request to add the new movie to the server
        $.ajax({
            url: SERVER_URL,
            method: "POST",
            data: {
                title: newTitle,
                rating: newRating,
                type: newType,
            },
        })
            .then(() => fetch(SERVER_URL))
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                location.reload();
            });
        // Hides the add movie modal
        $("#add-movie-modal").modal("hide");
    }

    // Function to initialize the page
    function initializePage() {
        // Displays the loading spinner
        showLoadingSpinner();
        // Makes an AJAX request to retrieve the movie data from the server
        $.ajax({
            url: SERVER_URL,
            method: "GET",
        })
            .done(function (data) {
                const movies = data;
                console.log(data);
                // Renders the movie list on the page
                renderMovieList(movies);
                // Hides the loading spinner
                hideLoadingSpinner();
            })
            .fail(function (error) {
                console.log(error);
            });
        // Initializes event listeners for various interactions on the page
        initializeEventListeners();
    }

    // Calls the initializePage function when the document is ready
    initializePage();
});
