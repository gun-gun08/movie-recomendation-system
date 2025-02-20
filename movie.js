let APIKey = "17f8307a";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (movie) => {
    try {
        let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&t=${movie}`);
        let jsonData = await fetchData.json();

        if (jsonData.Response === "False") {
            document.querySelector(".card").innerHTML = `<h1>Movie not found. Try again.</h1>`;
            return;
        }

        console.log(jsonData);
        let div = document.createElement("div");
        div.classList.add("movieCard");

        div.innerHTML = `
            <img src="${jsonData.Poster !== "N/A" ? jsonData.Poster : 'placeholder.jpg'}" alt="Poster">
            <div class="cardText">
                <h1>${jsonData.Title}</h1>
                <p>Rating: <span>${jsonData.Ratings.length > 0 ? jsonData.Ratings[0].Value : "N/A"}</span></p>
                <a href="#">${jsonData.Genre}</a>
                <p>Released: <span>${jsonData.Released}</span></p>
                <p>Duration: <span>${jsonData.Runtime}</span></p>
                <p>Description: <span>${jsonData.Plot}</span></p>
                <p>Year: <span>${jsonData.Year}</span></p>
            </div>
        `;
        document.querySelector(".card").appendChild(div);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.querySelector(".card").innerHTML = `<h1>Error fetching movie data. Please try again later.</h1>`;
    }
};

searchBtn.addEventListener("click", function () {
    let movieName = searchInput.value.trim(); // Trim to remove extra spaces
    if (movieName !== "") {
        document.querySelector(".card").innerHTML = ""; // Clear previous results
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>Please enter a movie name to search.</h1>";
    }
});


