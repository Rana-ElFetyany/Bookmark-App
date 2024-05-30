var bookName = document.getElementById('bookName');
var websiteURL = document.getElementById('websiteURL');
var submitBtn = document.getElementById('submitBtn');
var websiteRow = document.getElementById('websiteRow');
var website = JSON.parse(localStorage.getItem('website')) || [];
// || [] for checking the length if the storage is empty
display();


submitBtn.onclick = function () {
    if (!isValidURL(websiteURL.value) || !isValidName(bookName.value)) {
        var errorMessage = "";
        if (!isValidURL(websiteURL.value)) {
          errorMessage += "Invalid URL! Please enter a URL containing '.com'.\n";
        }
        if (!isValidName(bookName.value)) {
          errorMessage += "Bookmark name must be at least 3 characters long.\n";
        }
        alert(errorMessage);
        return; 
      }

  addWebsite();
};

function addWebsite() {
  var bookN = bookName.value;
  var websiteU = websiteURL.value;

  var newBookmark = { name: bookN, url: websiteU }; 
  website.push(newBookmark);
  localStorage.setItem('website', JSON.stringify(website)); 
  clear();
  display();
}

function clear() {
  bookName.value = "";
  websiteURL.value = "";
}

function display() {
  websiteRow.innerHTML = ""; 

  for (var i = 0; i < website.length; i++) {
    var bookmark = website[i]; 

    var row = `
      <div class="col-12 d-flex justify-content-around align-items-center mb-3 ">
        <div class="col-3 mt-3">
          <h5 class="text-light">${i + 1}</h5>
        </div>
        <div class="col-3 mt-3">
          <h5 class="text-light">${bookmark.name}</h5>
        </div>
        <div class="col-3 mt-3">
          <button class="btn btn-success" id="visitBtn" type="button"><i class="fa-solid fa-eye text me-3"></i><a class="text-decoration-none text-white"
            href="${bookmark.url}" target="_blank">Visit</a></button>
        </div>
        
        <div class="col-3 mt-3">
          <button class="btn btn-danger" id="deleteBtn" type="button" onclick="deleteFunc(${i})"><i
            class="fa-solid fa-x text-white me-3" ></i>Delete</button>
        </div>
      </div>
    `;

    

    websiteRow.innerHTML += row;
  }
}

function deleteFunc(index)
{
    console.log(index);
    website.splice(index,1);
    localStorage.setItem('website', JSON.stringify(website)); 
    display();
}

function isValidURL(url) {
  // Check for '.com'
  return url.toLowerCase().includes(".com");
}

function isValidName(name) {
   // Check for at least 3 characters after trimming
    return name.trim().length >= 3; 
}