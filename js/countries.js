const loadCountries = () => {
    fetch('https://restcountries.com/v2/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
};
loadCountries();

const displayCountries = counties => {

    const countryDiv = document.getElementById('countries')
    counties.forEach(country => {
        // console.log(country)
        const div = document.createElement('div')
        div.classList.add('country');
        div.innerHTML = `
        <h3>${country.name}</h3>
        <p>${country.capital}</p>
        <button onClick="loadCountryByName('${country.name}')">Details</button>
        `;
        // const h3 = document.createElement('h3')
        // h3.innerText = country.capital;
        // div.appendChild(h3);
        // const p = document.createElement('p');
        // p.innerText = country.continents;
        // div.appendChild(p);
        countryDiv.appendChild(div);
    });
};

const loadCountryByName = name => {
    const url = `https://restcountries.com/v2/name/${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetail(data[0]))
};

const displayCountryDetail = country => {
    // console.log(country)
    const countryDiv = document.getElementById('country-details');
    countryDiv.innerHTML = `
     <h4>${country.name}</h4>
     <img width="200px" src="${country.flag}">
     <p>Country population: ${country.population}</p>
     `
}