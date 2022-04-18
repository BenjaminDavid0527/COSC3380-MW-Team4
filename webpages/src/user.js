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

uploadTab.onclick = (()=>{
  uploadButton.click();
  return false;
});

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const handle_logout = (event) => {
    deleteCookie("UserID");
    window.location.href = "/";
}