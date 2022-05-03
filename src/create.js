const form = document.querySelector('form');

form.addEventListener('submit', (ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
}));

async function onSubmit(data) {
    const body = JSON.stringify({
        name: data.name,
        img: data.img,
        ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: data.steps.split('\n').map(l => l.trim()).filter(l => l != '')
    });

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return window.location.pathname = 'index.html';
    }

    try {
        const response = await fetch('https://parseapi.back4app.com/classes/Test', {
            method: 'post',
            headers: {
                'X-Parse-Application-Id': 'jVr5N5jV4b9GYIG2RshqKuo1ubSb1x1LSCWriUQu',

'X-Parse-REST-API-Key': 'NzOcqH8CyXim9zx1zGhIiOex6rcFIyd6DeadNQxK',

'Content-Type': 'application/json'
            },
            body
        });
        console.log(response)
        if (response.status == 200) {
            window.location.pathname = 'index.html';
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
  window.location.pathname = 'index.html';
}