


const form = document.querySelector('form');

form.addEventListener('submit', (ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
}));

async function onSubmit(data) {
    const body = JSON.stringify({
        username: data.username,
        password: data.password,
    });

    try {
      
        const response = await fetch('https://parseapi.back4app.com/login', {
            method: 'post',
            headers: {
                'X-Parse-Application-Id': 'jVr5N5jV4b9GYIG2RshqKuo1ubSb1x1LSCWriUQu',

'X-Parse-REST-API-Key': 'NzOcqH8CyXim9zx1zGhIiOex6rcFIyd6DeadNQxK',

'X-Parse-Revocable-Session': '1',
              


            },
            body
        });
        const data = await response.json();
        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            window.location.pathname = 'index.html';
        } else {
            throw new Error(data.message);
        }
    

    
        
   /* (async () => {
  try {
    
    
   
    // Pass the username and password to logIn function
    let user = Parse.User.logIn(data.username,data.password);
    // Do stuff after successful login
    console.log('Logged in user', user);
  } catch (error) {
    console.error('Error while logging in user', error);
  }
})();*/
  
   
    } catch (err) {
        console.error(err.message);
    }
}