`use strict`;
const allCountriesUrl = "https://restcountries.com/v2/all";

window.onload = () => {
  displayCountries(allCountriesUrl);
};

const displayCountries = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw "error";
    }
    const countries = await response.json();
    // console.log(countries);
    const row = document.querySelector(`.row`);
    row.innerHTML = ``;
    countries.forEach((country) => {
      if (country.name.common) {
        row.innerHTML += displayCardsByRegion(country);
      } else {
        row.innerHTML += displayCards(country);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const input = document.querySelector(`input`);
input.onchange = () => {
  const query = input.value;
  const countryNameUrl = "https://restcountries.com/v2/name/" + query;
  if (query.length < 3) {
    displayCountries(allCountriesUrl);
  } else {
    displayCountries(countryNameUrl);
  }
};

document.querySelector(`ul`).addEventListener(`click`, function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains(`dropdown-item`)) {
    const region = e.target.textContent;
    const regionUrl =
      "https://restcountries.com/v3.1/region/" + region.toLowerCase();
    displayCountries(regionUrl);
  }
});

const displayCards = (country) => {
  return ` <div class="col-12 mb-3 col-sm-6 col-lg-3">
  <div class="card">
   <a href="detail.html?name=${country.name}">
    <img
      src="${country.flags.png}"
      class="card-img-top"
      alt="..."
    /></a>
    <div class="card-body">
      <h5 class="card-title fw-bold fs-5"> <a href="detail.html?name=${
        country.name
      }">${country.name}</a></h5>
      <p class="card-text mb-1">
        <strong>Population:</strong> ${country.population.toLocaleString(
          "en-US"
        )}
      </p>
      <p class="card-text mb-1"><strong>Region</strong>: ${country.region}</p>
      <p class="card-text"><strong>Capital</strong>: ${country.capital}</p>
    </div>
  </div>`;
};
const displayCardsByRegion = (country) => {
  return ` <div class="col-12 mb-3 col-sm-6 col-lg-3">
  <div class="card">
  <a href="detail.html?name=${country.name.common}">
    <img
      src="${country.flags.png}"
      class="card-img-top"
      alt="..."
    />
    </a>
    <div class="card-body">
      <h5 class="card-title fw-bold fs-5"> <a href="detail.html?name=${
        country.name.common
      }">${country.name.common}</a></h5>
      <p class="card-text mb-1">
        <strong>Population:</strong> ${country.population.toLocaleString(
          "en-US"
        )}
      </p>
      <p class="card-text mb-1"><strong>Region</strong>: ${country.region}</p>
      <p class="card-text"><strong>Capital</strong>: ${country.capital}</p>
    </div>
  </div>`;
};
//* dark/light mode
const darkmode = document.querySelector(".dark-mode");
const toDarkMode = () => {
  const header = document.querySelector(`header`);
  header.classList.add("text-light", "bg-header");
  const body = document.querySelector("body");
  body.style.backgroundColor = `hsl(207, 26%, 17%)`;

  lightmode.classList.remove("d-none");
  darkmode.classList.add("d-none");
  const input = document.getElementById("search-input");
  input.style.backgroundColor = `hsl(209, 23%, 22%)`;
  input.style.color = "hsl(0, 0%, 98%)";
  const searchBox = document.querySelector(".search-box");
  searchBox.classList.add("place");
  const filter = document.querySelector(".dropdown > button");
  filter.classList.remove("bg-white");
  filter.classList.add("text-light");
  filter.style.backgroundColor = `hsl(209, 23%, 22%)`;
  const filterUl = document.querySelector(".dropdown > ul");
  filterUl.style.backgroundColor = `hsl(209, 23%, 22%)`;
  const liS = document.querySelectorAll("li > a");
  const cards = document.querySelectorAll(".card");
  console.log(cards);
  cards.forEach((card) => {
    card.style.backgroundColor = `hsl(209, 23%, 22%)`;
    card.classList.add("text-light");
  });
  liS.forEach((li) => {
    li.classList.add("text-light");
  });
  const bordersBtn = document.querySelectorAll("li button.rounded");
  bordersBtn.forEach((el) => {
    el.classList.remove("bg-white");
    el.classList.add("text-white");
  });
};
const lightmode = document.querySelector(".light-mode");
const toLightMode = () => {
  const header = document.querySelector(`header`);
  header.classList.remove("text-light", "bg-header");
  const body = document.querySelector("body");
  body.style.backgroundColor = `hsl(0, 0%, 98%)`;

  lightmode.classList.add("d-none");
  darkmode.classList.remove("d-none");
  const input = document.getElementById("search-input");
  input.style.backgroundColor = `hsl(0, 0%, 98%)`;
  input.style.color = "hsl(209, 23%, 22%)";
  const searchBox = document.querySelector(".search-box");
  searchBox.classList.remove("place");
  const filter = document.querySelector(".dropdown > button");
  filter.classList.add("bg-white");
  filter.classList.remove("text-light");
  filter.style.backgroundColor = `hsl(0, 0%, 98%)`;
  const filterUl = document.querySelector(".dropdown > ul");
  filterUl.style.backgroundColor = `hsl(0, 0%, 98%)`;
  const liS = document.querySelectorAll("li > a");
  const cards = document.querySelectorAll(".card");
  console.log(cards);
  cards.forEach((card) => {
    card.style.backgroundColor = `hsl(0, 0%, 98%)`;
    card.classList.remove("text-light");
  });
  liS.forEach((li) => {
    li.classList.remove("text-light");
  });
  const bordersBtn = document.querySelectorAll("li button.rounded");
  bordersBtn.forEach((el) => {
    el.classList.add("bg-white");
    el.classList.remove("text-white");
  });
};
darkmode.addEventListener("click", toDarkMode);
lightmode.addEventListener("click", toLightMode);
