const searchButton =async () => {
    const searchItem = document.getElementById("search-item");
    const searchText = searchItem.value;
    // console.log(searchText);
    searchItem.value = "";

  
    if (searchText.length == "") {
        const err = document.getElementById("search-result");
        err.innerHTML = `
        <div class="card mx-auto bg-danger  " >
        <div class="card-body ">
          <h4 class="card-title text-center text-white">Please enter a meal name...</h4> 
        </div>
      </div>
        `;
    } else {
        document.getElementById("spinner").classList.remove("d-none");
        document.getElementById("heading").classList.remove("d-none");
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals)
        /* fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals)) */
    }
}

const displaySearchResult = meals => {
  
    document.getElementById("spinner").classList.add("d-none");
    
    const searchResult = document.getElementById("search-result")
    searchResult.textContent = '';
    if (meals == null) {
        
        const err = document.getElementById("search-result");
        err.innerHTML = `
        <div class="card mx-auto bg-warning  " >
        <div class="card-body ">
        <h5 class="card-title">Dear Sir/Ma'am,</h5>
          Your search did not match any of our set meal. Please enter a
          correct name.
        </div>
      </div>
        `;
        
    } else {
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
        
        <div onClick="loadMealDetails(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
      </div>
        `;
            searchResult.appendChild(div)
        });
    }
}

const loadMealDetails = async mealId => {
   
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
   /*  fetch(url)
    .then(res => res.json())
    .then(data=>displayMealDetails(data.meals[0])) */
}

const displayMealDetails = meal => {
    window.scrollTo(0,0)
    // console.log(meal);
    const mealDetails = document.getElementById("meal-Details");
    mealDetails.textContent = "";
    
    const div = document.createElement("div");
    
    div.classList.add("card");
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
        ${meal.strInstructions.slice(0,200)}
        </p>
      <a href="${meal.strYoutube}"target="_blank" class="btn btn-primary">Go Youtube</a>
    </div>
    `;
    mealDetails.appendChild(div)
}