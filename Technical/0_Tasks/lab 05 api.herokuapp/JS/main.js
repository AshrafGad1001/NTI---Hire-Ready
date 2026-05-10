function getAllRecipes() {

    let RequestInstance = new XMLHttpRequest();

    RequestInstance.open("GET", "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza");
    RequestInstance.send();
    RequestInstance.responseType = "json";

    RequestInstance.onload = function () {
        let recipes = RequestInstance.response.data.recipes;

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
    };


}

getAllRecipes();