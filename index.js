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
      row.innerHTML += displayCards(country);
    });
  } catch (error) {
    console.log(error);
  }
};
const input = document.querySelector(`input`);
input.onchange = () => {
  const query = input.value;
  const countryNameUrl = "https://restcountries.com/v2/name/" + query;
  if (query.length > 2) {
    displayCountries(countryNameUrl);
  } else {
    displayCountries(allCountriesUrl);
  }
};
const africa = document.querySelector(`.africa`);
africa.addEventListener(`click`, () => {
  console.log(africa.textContent);
});
const america = document.querySelector(`.america`);
const asia = document.querySelector(`.asia`);
const oceania = document.querySelector(`.oceania`);
const europe = document.querySelector(`.europe`);
const innerTextName = (region) => {
  region.onclick = (el) => el.innerText;
};
innerTextName(africa);
const displayCards = (country) => {
  return ` <div class="col-12 mb-3 col-sm-6 col-lg-3">
  <div class="card">
    <img
      src="${country.flags.png}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title fw-bold fs-5">${country.name}</h5>
      <p class="card-text mb-1">
        <strong>Population:</strong> ${country.population}
      </p>
      <p class="card-text mb-1"><strong>Region</strong>: ${country.region}</p>
      <p class="card-text"><strong>Capital</strong>: ${country.capital}</p>
    </div>
  </div>`;
};
