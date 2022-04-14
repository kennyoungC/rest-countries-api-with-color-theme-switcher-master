`use strict`;

window.onload = async () => {
  const countryName = new URLSearchParams(window.location.search).get("name");
  try {
    const response = await fetch(
      "https://restcountries.com/v2/name/" + countryName
    );
    if (!response.ok) {
      throw new Error("incorrect fetch endpoint");
    }
    const countries = await response.json();
    const country = countries[0];
    displayDetails(country);
    displayBorderCountries();
  } catch (error) {
    console.log(error);
  }
};

const displayBorderCountries = () => {
  const borders = document.querySelector("ul.flex-wrap");
  borders.addEventListener("click", async (e) => {
    const query = e.target.innerText;
    const response = await fetch("https://restcountries.com/v2/alpha/" + query);
    if (!response.ok) {
      throw new error("incorrect fetch endpoint");
    }
    const country = await response.json();
    displayDetails(country);
  });
};

//* dark/light mode
const darkmode = document.querySelector(".dark-mode");
const toDarkMode = () => {
  const header = document.querySelector(`header`);
  header.classList.add("text-light", "bg-header");
  const body = document.querySelector("body");
  body.style.backgroundColor = `hsl(207, 26%, 17%)`;
  const main = document.querySelector("main > div > div");
  main.classList.add("text-light");
  lightmode.classList.remove("d-none");
  darkmode.classList.add("d-none");
  const backBtn = document.querySelector("section.container > a");
  backBtn.classList.remove("bg-white");
  backBtn.classList.add("text-white");
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
  const main = document.querySelector("main > div > div");
  main.classList.remove("text-light");
  lightmode.classList.add("d-none");
  darkmode.classList.remove("d-none");
  const backBtn = document.querySelector("section.container > a");
  backBtn.classList.remove("bg-white");
  backBtn.classList.remove("text-white");
  backBtn.classList.add("bg-white");
  backBtn.classList.remove("text-white");
  const bordersBtn = document.querySelectorAll("li button.rounded");
  bordersBtn.forEach((el) => {
    el.classList.add("bg-white");
    el.classList.remove("text-white");
  });
};
darkmode.addEventListener("click", toDarkMode);
lightmode.addEventListener("click", toLightMode);

const displayDetails = (country) => {
  const img = document.querySelector(`.col-12 > img`);
  img.src = country.flags.png;
  const col = document.querySelector(".details");

  col.innerHTML = ``;

  const lang = country.languages.map((el) => el.name);

  col.innerHTML += `<h2 class=" fw-bold">${country.name}</h2>
        <div class="d-flex mb-3 justify content-between">
              <ul class="list-unstyled d-flex flex-column gap-2">
                <li> <strong>Native Name:</strong> ${country.nativeName}</li>
                <li><strong>Population</strong>:${country.population.toLocaleString(
                  "en-US"
                )}</li>
                <li><strong>Region</strong>: ${country.region}</li>
                <li><strong>Sub-Region</strong>: ${country.subregion}</li>
                <li><strong>Capital</strong>: ${country.capital}</li>
              </ul>
              <ul class="list-unstyled">
                <li><strong>Top Level Domain</strong>: ${
                  country.topLevelDomain[0]
                }</li>
                <li><strong>Currencies</strong>: ${
                  country.currencies[0].name
                }</li>

                <li><strong>languages</strong>: ${lang.join(",")}</li>
              </ul>
            </div>
            `;
  const div = document.createElement("div");
  div.classList.add("d-flex", "gap-2", "flex-wrap", "align-items-center");
  const p = document.createElement("p");
  p.innerHTML = `<strong>Border countries:</strong>`;
  div.appendChild(p);
  const ul = document.createElement("ul");
  ul.classList.add("d-flex", "gap-2", "ps-0", "list-unstyled", "flex-wrap");
  country.borders.map((el) => {
    const li = document.createElement("li");
    li.classList.add("borders");
    li.innerHTML = `<button class="btn py-1 px-4 rounded bg-white btn-shadow">
        ${el}
      </button>`;
    ul.appendChild(li);
  });
  div.appendChild(ul);
  col.appendChild(div);
};
