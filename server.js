const express = require('express')
const path = require('path');
const app = express()
app.use(express.static('public'));
app.use(express.json());
const port = 3009
const unique = require('./public/js/unique-user-number')

//Sends index.html file when a user requests our ip address
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/index.html'))
});

//Send notes.html file when user clicks "get Started" button on index.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//GET request for notes
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
   
    //Log request to terminal
    console.info(`${req.method} request received to get reviews`);
})

app.post('/api/notes', (req, res) => {
    //Log that a POST request was received
    console.log(`${req.method} request received to add a note`);
    //Destructure the assignment of the items in the form submission
    

    
})





//listens for request to port number
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})