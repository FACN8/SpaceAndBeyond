function makeRequest(url, callback) {
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    return callback(null, data)
  })
  .catch(function(error) {
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
	}})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    return callback(null, data)
  })
  .catch(function(error) {
    callback(error)
  })
}

var currPicNum = 3;
var lastQuery = "";
var firstDes = document.querySelector(".first_des");
var secondDes = document.querySelector(".second_des");
var thirdDes = document.querySelector(".third_des");

var firstPic = document.querySelector(".first_pic");
var secondPic = document.querySelector(".second_pic");
var thirdPic = document.querySelector(".third_pic");
var firstTitle = document.querySelector(".first_title");
var secondTitle = document.querySelector(".second_title");
var thirdTitle = document.querySelector(".third_title");

function changePic(n) {
    var searchQuery = document.getElementById("search-box").value;
    if(searchQuery !== lastQuery) currPicNum = 0;
    lastQuery = searchQuery;
    if(!searchQuery){
        alert("Enter a search Keyword")
        return false;
    }  
    firstPic.style.animation = " ";
    makeRequest("https://images-api.nasa.gov/search?q=" + searchQuery,
        function(error, data) {


            if (error) {
                console.log(error)
                console.log('an error happened show me the error')
                return false;
            }

            var dataColl = data.collection;
            currPicNum += n;
            console.log(currPicNum)
        

            if(currPicNum <= 0) currPicNum = 3;
            if(currPicNum > dataColl.items.length) {
              alert("Exceeded pictures for this search")
              currPicNum -=n;
              return false;
            }
            if(data.collection.items.length < 3) {
                alert("No results were found, please try another keyword e.g Earth");
                return false;
            }
            firstTitle.textContent = dataColl.items[currPicNum - 3].data[0].title;
            firstPic.src = dataColl.items[currPicNum - 3].links[0].href;

            firstPic.classList.add('anima');
            firstDes.textContent = dataColl.items[currPicNum - 3].data[0].description;

            secondTitle.textContent = dataColl.items[currPicNum - 2].data[0].title;
            secondPic.src = dataColl.items[currPicNum - 2].links[0].href;
            secondPic.classList.add('anima');
            secondDes.textContent = dataColl.items[currPicNum - 2].data[0].description;

            thirdTitle.textContent = dataColl.items[currPicNum - 1].data[0].title;
            thirdPic.src = dataColl.items[currPicNum - 1].links[0].href;
            thirdPic.classList.add('anima');
            thirdDes.textContent = dataColl.items[currPicNum - 1].data[0].description;
        })

    firstPic.classList.remove('anima');
    secondPic.classList.remove('anima');
    thirdPic.classList.remove('anima');
}

document.addEventListener("keydown", toggleSearch);
function toggleSearch() {
  if(event.keyCode == 13) changePic(3);
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



function playSong(){
  var searchQuery = document.getElementById("search-box").value;
  makeRequestV2("https://deezerdevs-deezer.p.rapidapi.com/search?q="+searchQuery, 
        function(error, data){
            if (error) {
                console.log(error)
                console.log('an error happened show me the error')
                return false;
            }   
            window.open(data.data[0].link, '_blank');
    })
}
