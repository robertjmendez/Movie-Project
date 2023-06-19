# Movie Management Web Application

## Overview
This application is a user-friendly, interactive web application that allows users to view, search, add, edit, and delete movies. It's powered by a local server for movie data and the OMDB API for additional movie details.

![Project screenshot](img/screenshot.png)

## Features
**View Movies:** The application fetches a list of movies from a server and displays each movie with details including title, poster, and a star rating.

**Movie Details:** Clicking on a movie card fetches additional details for that movie from the OMDB API and displays them in a modal.

**Search and Add Movies:** Users can search for movies via an input field that makes a request to the OMDB API and displays matching results. Selecting a movie from the search results adds it to a local list of movies.

**Edit Movies:** Each movie card includes an edit icon that, when clicked, opens a modal pre-filled with the movie's details. Users can edit these details, which are then updated on the server.

**Delete Movies:** Each movie card also includes a delete icon. Clicking this icon opens a modal to confirm the deletion of the movie.

**Filter Movies:** The application supports filtering of movies by type - 'movies' or 'tv-shows'.

**Responsive Design:** The application is fully responsive and can be used across different device sizes.

## Tech Stack
- HTML5
- CSS3
- Bootstrap
- JavaScript (ES6+)
- jQuery
- AJAX
- Local server for movie data
- OMDB API
- TMDB API

## Code Highlights
- Asynchronous JavaScript and XML (AJAX) to retrieve and update movie data in real time.
- Use of jQuery for efficient DOM manipulation and Bootstrap for responsive design.
- An interactive user interface created with HTML5, CSS3, and jQuery.

## Live Demo
Experience the live demo of the application at this link: [Live Demo](https://merry-scone-56e597.netlify.app/index.html)
