//check if the cookie is existed
if ( document.cookie.indexOf('UserID') == -1){
  window.location.href = "/";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const handle_logout = (event) => {
  deleteCookie("UserID");
  window.location.href = "/";
}

//navigate between tabs
const tabLinks = document.querySelectorAll(".tabs a");
const tabPanels = document.querySelectorAll(".tabs-panel");

for (let el of tabLinks) {
  el.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".tabs li.active").classList.remove("active");
    document.querySelector(".tabs-panel.active").classList.remove("active");

    const parentListItem = el.parentElement;
    parentListItem.classList.add("active");
    const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

    const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
    panel[0].classList.add("active");
    });
}

  //send to edit profile/settings tab
const editProfile = document.querySelector(".chatbtn");
const settings = document.querySelector("#settings-tab")
const tabInfo = document.querySelectorAll(".tabs-panel");

editProfile.addEventListener("click", e => {
      let tab = tabLinks[2]
      let info = tabInfo

      e.preventDefault();
  
      document.querySelector(".tabs li.active").classList.remove("active");
      document.querySelector(".tabs-panel.active").classList.remove("active");
  
      const parentListItem = tab.parentElement;
      parentListItem.classList.add("active");
      const index = [...parentListItem.parentElement.children].indexOf(parentListItem);
  
      const panel = [...info].filter(tab => tab.getAttribute("data-index") == index);
      panel[0].classList.add("active");
  });

const settingsTab = document.querySelector("#idtopbar");
settingsTab.addEventListener("click", e => {
  let tab = tabLinks[2]
  let info = tabInfo

  e.preventDefault();

  document.querySelector(".tabs li.active").classList.remove("active");
  document.querySelector(".tabs-panel.active").classList.remove("active");

  const parentListItem = tab.parentElement;
  parentListItem.classList.add("active");
  const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

  const panel = [...info].filter(tab => tab.getAttribute("data-index") == index);
  panel[0].classList.add("active");
});

//send to upload page
const uploadButton = document.querySelector("button.createbtn");
const uploadTab = document.querySelector("#uploadtopbar");

uploadTab.addEventListener("click", e => {
  let tab = tabLinks[0]
  let info = tabInfo

  e.preventDefault();

  document.querySelector(".tabs li.active").classList.remove("active");
  document.querySelector(".tabs-panel.active").classList.remove("active");

  const parentListItem = tab.parentElement;
  parentListItem.classList.add("active");
  const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

  const panel = [...info].filter(tab => tab.getAttribute("data-index") == index);
  panel[0].classList.add("active");
});

uploadButton.onclick = (()=>{
  uploadTab.click();
  return false;
});


//code to upload a song: when uncommented, tabs do not refresh how they're supposed to

/*
function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

function getFilePath() {
  //var path = (window.URL || window.webkitURL).createObjectURL(songFile);
  return " ";
}

function getFileLength() {
  var f_duration = 0;
  f_duration = Math.round(songFile.duration);
  return f_duration;
}

  dc = document.cookie;
  const start_idx = dc.indexOf('UserID')
  const end_idx = dc.substr(start_idx).indexOf(";");
  let user_id;

  if (end_idx === -1) {
      user_id = parseInt(dc.substr(start_idx+7));
  }

  else {
      user_id = parseInt(dc.substr(start_idx+7, end_idx));
  }

const uploadButton = document.querySelector("#uploadbtn");

uploadButton.addEventListener("click", e => {
  var songTitle = document.getElementById('songTitle');
  var songFile = document.getElementById('songUpload');

  var userID = user_id;
  var fileSize = returnFileSize(songFile.size);
  var fileLength = getFileLength();
  var filePath = getFilePath();

  var sql = 'INSERT INTO SONG (title, user_id, album_id, file_path, length_seconds, size) VALUES ("${title}", "${userID}", NULL, "${filePath}", "${fileLength}", "${fileSize}", NOW())';
  db.query(sql, function(err, result) {
      if(err)
        throw err
      console.log('song inserted');
      result.redirect('/');
  });

  uploadTab.click();
  return false;

});

*/

//grab information to display name & username & email


//logout information 


const updateButton = document.getElementById("update-btn");

updateButton.addEventListener("click", e => {
  var nameInput = document.getElementById("inputName");
  var usernameInput = document.getElementById("usern");
  var emailInput = document.getElementById("emailIn");

  document.getElementById("user-name").value = nameInput;
  document.getElementById("un").value = usernameInput;
  document.getElementById("").value = emailInput;

  window.location.reload(true);
});

//Getting User Name to be displayed

async function get_user_name(data) {
  const response = await fetch('/requests/get_user_name', {
      method: 'POST',
      headers: {
          'Content-Type': 'application.json'
      },
      body: JSON.stringify(data)
  })
  return response.json();
}

const user_namess = document.getElementById('user-name');

get_user_name({UserID: user_id})
.then( (get_user_name_results) => {  
  for(const results_info of get_user_name_results.Un) { 
      const h3 = document.createElement("h3")
      const body = `${results_info.Un}`
      h3.innerHTML = body;
      user_namess.appendChild(h3);
  }    
});

// if ( document.cookie.indexOf('UserID') == -1){
//   alert("Please sigin to see the user page");   
//   window.location.href = "/";
//   }