//Function to generate a unique user and note id

function uId () {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomString  =''
    for (var i=0; i<5; i++){
      randomString += chars.charAt(Math.floor(Math.random() * 26))
    }
    var randomNumber = Math.floor(Math.random() * 100000)+100000

    var uid = randomNumber + "-" + randomString

    return uid
  }
  
  

  module.exports = uId