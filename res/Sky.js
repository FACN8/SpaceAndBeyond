function makeRequest(url, callback) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return callback(null, data)
    })
    .catch(function (error) {
      callback(error)
    })
}

//make one makerequest function
function makeRequestV2(url, callback) {
  fetch(url, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "03eca7d594msh34ef155af2e0855p1c1bc1jsnc83e871ff4b9"
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return callback(null, data)
    })
    .catch(function (error) {
      callback(error)
    })
}

document.addEventListener("keydown", toggleSearch);
function toggleSearch() {
  if (event.keyCode == 13) changePic(3);
}

//variable declaration
var currPicNum = 0;
const nasaURL = "https://images-api.nasa.gov/search?q=";
const deezerURL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
var lastQuery = "";
var searchQuery;

var firstTitle = document.querySelector(".first_title");
var secondTitle = document.querySelector(".second_title");
var thirdTitle = document.querySelector(".third_title");

var firstDes = document.querySelector(".first_des");
var secondDes = document.querySelector(".second_des");
var thirdDes = document.querySelector(".third_des");

var firstPic = document.querySelector(".first_pic");
var secondPic = document.querySelector(".second_pic");
var thirdPic = document.querySelector(".third_pic");

var dataArray = [firstTitle, firstPic, firstDes, secondTitle, secondPic, secondDes,
  thirdTitle, thirdPic, thirdDes];

function changePic(n) {
  getSearchQuery();
  makeRequest(nasaURL + searchQuery, function (error, data) {
    if (error) {
      console.log(error)
      console.log('an error happened show me the error')
      return false;
    }
    currPicNum += n;
    var errorFlag = handleDataErrors(data);
    if (errorFlag) {
      return false;
    }
    displayData(data);
  })
  firstPic.classList.remove('anima');
  secondPic.classList.remove('anima');
  thirdPic.classList.remove('anima');
}

function handleDataErrors(data) {
  if (data.collection.items.length < 1) {
    alert("No results were found, please try another keyword e.g Earth");
    return false;
  }
  if (currPicNum <= 0) {
    currPicNum = 3;
  }
  if (currPicNum > data.collection.items.length) {
    alert("Exceeded pictures for this search")
    currPicNum -= n;
    document.querySelector(".nextButton").style.display = "none";
    errorFlag = true;
  }
}

function displayData(data) {
  var dataCollection = data.collection;
  for (var i = 0; i < dataArray.length; i += 3) {
    dataArray[i].textContent = dataCollection.items[currPicNum - (3 - (i / 3))].data[0].title;
    dataArray[i + 1].src = dataCollection.items[currPicNum - (3 - (i / 3))].links[0].href;
    dataArray[i + 1].classList.add('anima');
    dataArray[i + 2].textContent = dataCollection.items[currPicNum - (3 - (i / 3))].data[0].description;
  }
}

function getSearchQuery() {
  searchQuery = document.getElementById("search-box").value;
  if (!searchQuery) {
    alert("Enter a search Keyword")
    return false;
  }
  if (searchQuery !== lastQuery) {
    currPicNum = 0;
  }
  lastQuery = searchQuery;
}

function toggleText(desNum) {
  var str
  if (desNum == 1) str = ".first_des"
  else if (desNum == 2) str = ".second_des"
  else str = ".third_des"
  var text = document.querySelector(str);
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function playSong() {
  var searchQuery = document.getElementById("search-box").value;
  makeRequestV2(deezerURL + searchQuery,
    function (error, data) {
      if (error) {
        console.log(error)
        console.log('an error happened show me the error')
        return false;
      }
      window.open(data.data[0].link, '_blank');
    })
}
