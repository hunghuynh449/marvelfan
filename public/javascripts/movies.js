const API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=marvel";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const boxContainer = document.querySelector(".box-container");

async function getAPI(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}
getAPI(API);

function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average, release_date } = movie;
    const div = document.createElement("div");
    div.classList.add("box");
    div.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="">
            <div class="info">
                <h3>${title}</h3>
                <span>${release_date}</span>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>${vote_average}</span>
                </div>
                <p>${overview}</p>
                <a href="#" class="btn">Xem phim</a>
            </div>
        `;
    boxContainer.appendChild(div);
  });
}

let page = 1;
const more = document.querySelector("#more");
more.addEventListener("click", () => {
  console.log("click");
  page += page;
  getAPI(API + "&page=" + page);
});
