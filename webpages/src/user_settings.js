async function postUpdate(data) {
    const response = await fetch('/requests/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

const handle_update = (event) => {
    const form = new FormData(event.target);
    const username = form.get("uname");
    const password = form.get("pwd");

    const response = postUpdate({Username: username, Password: password, Id: user_id});
    response.then(data => {
        if (data.Accepted) {
            window.location.href = "/user";
            alert("User credentials have been updated!");
        }
        else {
            alert("Cannot update credentials!");
        }
    });
    return false;
}
