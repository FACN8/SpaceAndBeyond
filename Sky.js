
  function makeRequest(url, callback) {
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        console.log(data)
      callback(null, data)
    
    })
    .catch(function(error) {
    
      callback(error)
    
    })
  }
  
  makeRequest('https://api.nasa.gov/planetary/apod?api_key=YAs8ujPwWIaDbz8Y9heWw6yjzZkoCPFWZcQ7YQXw', 
      function(error, data){
    
    if (error) {
        console.log(error)
      console.log('an error happened show me the error')
    }
        
    
  })