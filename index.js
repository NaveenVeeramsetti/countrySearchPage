let resultCountriesEl = document.getElementById("resultCountries");
let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let countriesList = [];
let searchResults = "";

function createAndAppendCountries(country) {
  let resultCountriesContainer = document.createElement("div");
  resultCountriesContainer.classList.add(
    "country-card",
    "col-11",
    "col-md-5",
    "d-flex",
    "ml-auto",
    "mr-auto"
  );
  resultCountriesEl.appendChild(resultCountriesContainer);

  let flagEl = document.createElement("img");
  flagEl.src = country.flag;
  flagEl.classList.add("country-flag");
  resultCountriesContainer.appendChild(flagEl);

  let nameContainer = document.createElement("div");
  nameContainer.classList.add("d-flex", "flex-column", "ml-4");
  resultCountriesContainer.appendChild(nameContainer);

  let countryName = document.createElement("h1");
  countryName.classList.add("country-name");
  countryName.textContent = country.name;
  nameContainer.appendChild(countryName);

  let population = document.createElement("p");
  population.classList.add("country-population");
  population.textContent = country.population;
  nameContainer.appendChild(population);
}
function displaySearchResults() {
  resultCountriesEl.textContent = "";
  for (let country of countriesList) {
    let countryName = country.name;
    if (countryName.includes(searchResults)) {
      createAndAppendCountries(country);
    }
  }
}

function getCountriesList() {
  let url = "https://apis.ccbp.in/countries-data";
  let options = {
    method: "GET",
  };
  spinnerEl.classList.remove("d-none");
  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      spinnerEl.classList.add("d-none");
      countriesList = jsonData;
      displaySearchResults();
    });
}

function getSearchResults(event) {
  searchResults = event.target.value;
  displaySearchResults();
}
getCountriesList();
searchInputEl.addEventListener("keyup", getSearchResults);
