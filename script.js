const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".searchButton");
const recipeContainer = document.querySelector(".recipe-container");
const recipeContent = document.querySelector(".recipe-content");
const closeButton = document.querySelector(".close-btn");


const fetchrecipes = async (query) =>{
    recipeContainer.innerHTML = "<h2>Fetching Recipe...<h2/>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // console.log(response);
   
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} </p>
        <p>${meal.strCategory}</p>

        `

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click', () =>{
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
    // console.log(response.meals[0]);
}


const fetchIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;

}
const openRecipePopup = (meal) =>{
    recipeContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients: </h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        <p class="instructions">${meal.strInstructions}</p>
    </div>
    `

   

    recipeContent.parentElement.style.display = "block";

}

closeButton.addEventListener('click',() =>{
    recipeContent.parentElement.style.display = "none";
})

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchrecipes(searchInput);
})