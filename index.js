const apiKey = '8fc2f3eb7694bc7c79cb877a7e4e79f1';
const apiEndpoint = 'https://api.themoviedb.org/3/search/movie';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmMyZjNlYjc2OTRiYzdjNzljYjg3N2E3ZTRlNzlmMSIsInN1YiI6IjY1MmY5MGRlYTgwMjM2MDEzNzY4ZDM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dDGo7-1RtO-vBd97qa-2rhOt4dkmtfgifT9OZY8CEco'
  }
};

document.addEventListener('DOMContentLoaded', function () {
  loadInitialData();

  const searchButton = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  });

  function loadInitialData() {
    const $movieList = document.querySelector('#cardList');
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KO&page=1', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.results.forEach((a) => {
          const $moviecard = createMovieCard(a);
          $movieList.appendChild($moviecard);
        });
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:', error);
      });
  }

  function createMovieCard(movieData) {
    const $moviecard = document.createElement('div');
    $moviecard.className = "movieCard";
    $moviecard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${movieData.title}">
      <h3>${movieData.title}</h3>
      <p>${movieData.overview}</p>
      <p>rating: ${movieData.vote_average}</p>`;

    $moviecard.querySelector('img').addEventListener('click', function () {
      const movieId = movieData.id;
      alert(`영화 ID: ${movieId}`);
    });

    return $moviecard;
  }

  function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    console.log(searchTerm);

    if (searchTerm.trim() !== "") {
      const $movieList = document.querySelector('#cardList');
      $movieList.innerHTML = "";

      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KO&page=1`;
      console.log(searchTerm);
      console.log(apiUrl);
      fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
          console.log(searchTerm);
          const searched = data.results.filter((movie) => {
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
            searched.forEach((a) => {
            const $moviecard = createMovieCard(a);
            $movieList.appendChild($moviecard);
          });
        })
        .catch(error => {
          console.error('API 요청 중 오류 발생:', error);
        });
    }
  }
});