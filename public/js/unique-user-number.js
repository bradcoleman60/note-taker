//Function to generate a unique user and note id

function unqiqueId () {
    var uid = Math.floor(Math.random() * 100000)+100000
    
//   console.log(uid)
  return uid
  }
  
  

  module.exports = unqiqueId