async function getPizza() {
    const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza");
    const data = await response.json();
    const recipes = data.data.recipes;
    const output = document.getElementById('output');
    output.innerHTML = "";
    recipes.forEach(function (recipe) {
        output.innerHTML += `
            <div class="col-md-3">
                <div class="card h-100">
                    <img src="${recipe.image_url}" class="card-img-top" alt="${recipe.title}"/>
                    <div class="card-body">
                        <h6 class="card-title">${recipe.title}</h6>
                        <p class="text-muted small">${recipe.publisher}</p>
                    </div>
                </div>
            </div>`;
    });
        console.log("getPizza function  is completed");
}
async function getPasta() {
    const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes?search=pasta");
    const data = await response.json();
    const recipes = data.data.recipes;
    const output = document.getElementById('output');
    recipes.forEach(function (recipe) {
        output.innerHTML += `
            <div class="col-md-3">
                <div class="card h-100">
                    <img src="${recipe.image_url}" class="card-img-top" alt="${recipe.title}"/>
                    <div class="card-body">
                        <h6 class="card-title">${recipe.title}</h6>
                        <p class="text-muted small">${recipe.publisher}</p>
                    </div>
                </div>
            </div>`;
    });
    console.log("getPasta function  is completed");
}
function Test() {
    console.log("Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest function");
}
async function renderRecipes() {
    await getPizza();
    await getPasta();
    Test();
}
renderRecipes();