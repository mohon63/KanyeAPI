document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText)
    document.getElementById('error-message').style.display = 'none';


    if (searchText == '') {
        document.getElementById('result-found').innerText = `Please write something to display`;
        document.getElementById('search-result').textContent = '';
    } else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error))
    }
};
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    console.log(meals)

    // clear search result
    //1 searchResult.innerHTML = '';
    searchResult.textContent = '';

    // error message
    // if (meals.length === 0) {
    //     document.getElementById('result-found').innerText = `Show no result found.`;

    //     return;
    // } else {
    // };

    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                     <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
};

const loadMealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
};

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div)
}
