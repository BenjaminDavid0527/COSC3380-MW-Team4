async function postUpdateUser(data) {
    const response = await fetch('/requests/update-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

const handle_update_user = (event) => {
    const form = new FormData(event.target);
    const username = form.get("uname");

    const response = postUpdateUser({Username: username, Id: user_id});
    response.then(data => {
        if (data.Accepted) {
            window.location.href = "/user";
            alert("Your user name has been updated!");
        }
        else {
            alert("Cannot update the user name!");
        }
    });
    return false;
}

async function postUpdatePassword(data) {
    const response = await fetch('/requests/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

const handle_update_password = (event) => {
    const form = new FormData(event.target);
    const password = form.get("pwd");

    const response = postUpdatePassword({Password: password, Id: user_id});
    response.then(data => {
        if (data.Accepted) {
            window.location.href = "/user";
            alert("Your password has been updated!");
        }
        else {
            alert("Cannot update the password!");
        }
    });
    return false;
}
