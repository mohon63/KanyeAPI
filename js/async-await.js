const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText)

    if (searchText == '') {
        document.getElementById('result-found').innerText = `Please write something to display`;
        document.getElementById('search-result').textContent = '';
    } else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // console.log(url)

        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data.meals)
        }
        catch (error) {
            console.log(error)
        }

        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearchResult(data.meals))
    }
};

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    console.log(meals)

    // clear search result
    //1 searchResult.innerHTML = '';
    searchResult.textContent = '';

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

const loadMealDetails = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetails(data.meals[0]))
};

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    mealDetails.textContent = '';
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
