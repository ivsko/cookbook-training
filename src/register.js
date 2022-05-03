const form = document.querySelector('form');

form.addEventListener('submit', (ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
}));

async function onSubmit(data) {
    if (data.password != data.rePass) {
        return console.error('Passwords don\'t match');
    }

    const body = JSON.stringify({
        username: data.username,
        password: data.password
      
    });

    try {
        const response = await fetch('https://parseapi.back4app.com/users', {
            method: 'post',
            headers: {
              'X-Parse-Application-Id': 'jVr5N5jV4b9GYIG2RshqKuo1ubSb1x1LSCWriUQu',

'X-Parse-REST-API-Key': 'NzOcqH8CyXim9zx1zGhIiOex6rcFIyd6DeadNQxK',

'X-Parse-Revocable-Session': '1',


                'Content-Type': 'application/json'
            },
            body
        });

      /*const data = await response.json();
        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            window.location.pathname = 'index.html';
        } else {
            throw new Error(data.message);
        }*/
    

      if (response.status == 200){
      const user = new Parse.User();
  user.set('username', data.username);
 
  user.set('password', data.password);

  try {
    let userResult = await user.signUp();
    console.log('User signed up', userResult);
  } catch (error) {
    console.error('Error while signing up user', error);
  }}}

        /*const data = await response.json();
        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            window.location.pathname = 'index.html';
        } else {
            throw new Error(data.message);
        }*/
    
      catch{
            throw new Error(data.message);
        }
  window.location.pathname = 'login.html';
}