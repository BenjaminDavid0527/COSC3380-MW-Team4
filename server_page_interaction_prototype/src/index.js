const body = document.querySelector('body');

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path =/";
}

async function postLogin(data) {
    const response = await fetch('/posts/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

const handle_login = (event) => {
    const cd = document.cookie;
    const form = new FormData(event.target);
    const username = form.get("uname");
    const password = form.get("psw");
    
    const response = postLogin({Username: username, Password: password});
    response.then(data => {
        // Data will be an object with one or two keys. It has Accepted, a boolean indicating if
        // the login request is accepted. If it is, then the object also has the key UserID, corresponding 
        // to the ID of the user in the database internally. This is insanely insecure but will work for our
        // demo.
        if (data.Accepted) {
            setCookie("UserID", data.UserID, 1);
            // Put logic for loading user profile page here
        }
        else {
            alert("Sorry that username or password was incorrect!")    
        }
    })
    return false;
}
//         var userCounter;
//         const loc = document.cookie.indexOf('User')
//         if (loc  == -1) {
//             userCounter = 1;
//             setCookie('User', userCounter, 1);
//         }
//         else {
//             const restOfString = document.cookie.substring(loc);
//             const endOfCookie = restOfString.indexOf(';');
//             var currentCount;
//             if (endOfCookie == -1) {
//                 currentCount = restOfString.substring(5);
//             }
//             else {
//                 currentCount = restOfString.substring(5, endOfCookie);
//             }
//             userCounter = parseInt(currentCount) + 1;
//             setCookie('User', userCounter, 1);
//         }