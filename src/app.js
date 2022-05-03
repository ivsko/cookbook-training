








async function getRecipes() {
   
      const response =  await fetch('https://parseapi.back4app.com/classes/Test/', {
        method: 'GET',
        headers: {
           'X-Parse-Application-Id': 'jVr5N5jV4b9GYIG2RshqKuo1ubSb1x1LSCWriUQu',

          'X-Parse-REST-API-Key': 'NzOcqH8CyXim9zx1zGhIiOex6rcFIyd6DeadNQxK',
          
        },
    });
  
 const recipes = await response.json();

    return Object.values(recipes)
     
       
  //const Test = Parse.Object.extend('Test');
  //const query = new Parse.Query(Test);
  // You can also query by using a parameter of an object
  // query.equalTo('objectId', 'xKue915KBG');
 

    
    
  
    

    
}

async function getRecipeById(id) {
 
    id= getId();
    const response = await fetch('https://parseapi.back4app.com/classes/Test/' + id, {
        method: 'GET',
        headers: {
           'X-Parse-Application-Id': 'jVr5N5jV4b9GYIG2RshqKuo1ubSb1x1LSCWriUQu',

          'X-Parse-REST-API-Key': 'NzOcqH8CyXim9zx1zGhIiOex6rcFIyd6DeadNQxK',
          
        },
    });
    const recipe = await response.json();

    return (recipe);
}

function createRecipePreview(recipe) {
  
    const result = e('article', { className: 'preview', onClick: toggleCard , id: recipe.objectId},
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;

    async function toggleCard() {
        const fullRecipe = await getRecipeById(recipe._id);

        result.replaceWith(createRecipeCard(fullRecipe));
    }
}

function createRecipeCard(recipe) {
    const result = e('article', {},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
              
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    return result;
}

async function logout() {
    const response = await fetch('https://parseapi.back4app.com/logout', {
        method: 'post',
        headers: {
            'X-Parse-Application-Id': 'jVr5N5jV4b9GYIG2RshqKuo1ubSb1x1LSCWriUQu',

'X-Parse-REST-API-Key': 'NzOcqH8CyXim9zx1zGhIiOex6rcFIyd6DeadNQxK',

'X-Parse-Revocable-Session': '1',

'Content-Type': 'application/json'
        },
    });
    if (response.status == 200) {
        sessionStorage.removeItem('authToken');
        window.location.pathname = 'index.html';
    } else {
        console.error(await response.json());
    }
}



function getId (){
 let idi = event.target
    return idi.id;
    
}

window.addEventListener('load', async () => {
    if (sessionStorage.getItem('authToken') != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('logoutBtn').addEventListener('click', logout);
    } else {
        document.getElementById('guest').style.display = 'inline-block';
    }

   
    const main = document.querySelector('main');

    const recipes =  await getRecipes();
   
  main.innerHTML = '';
    for (let i of recipes){
     const cards = i.map(createRecipePreview);
    cards.forEach(c => main.appendChild(c));}

    
    
});

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}