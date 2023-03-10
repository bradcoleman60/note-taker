//Set dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const unique = require("./public/js/unique-user-number");

//Make all files and folders in public folders available at the base URL
app.use(express.static("public"));
app.use(express.json());

//Sends index.html file when a user requests our ip address
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Send notes.html file when user clicks "get Started" button on index.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//GET request for notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));

  //Log request to terminal
  console.info(`${req.method} request received to get notes`);
});

app.post("/api/notes", (req, res) => {
  //Log that a POST request was received
  console.log(`${req.method} request received to add a note`);
  //Destructure the assignment of the items in the form submission
  const { title, text } = req.body;

  //Check to ensure that all fields are populated
  if (title && text) {
    const newNote = {
      title,
      text,
      id: unique()
    };
    //Retrieve current list of notes
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      console.log(data);
      //Parse the json file
      var notesDbParsed = JSON.parse(data);
      //Push the added note to the array
      notesDbParsed.push(newNote);
      //Stringify the array
      var notesDbStringified = JSON.stringify(notesDbParsed);
      //Write string to a file
      fs.writeFile("./db/db.json", notesDbStringified, (err) =>
        err
          ? console.log(err)
          : console.log(`Note has been written to JSON file`)
      );
    });
  }
});

//Delete command with param of 'id' to accept id from client
app.delete("/api/notes/:id", (req, res) => {
  //Deconstructs req.params to use element of 'id' as a variable
  const { id } = req.params;
  //Console Logs message that a DELETE request has been received.
  console.log(`${req.method} request received to delete a note with id: ${id}`);

  //Retrieve current list of notes from db.json file
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    //Parse the db.json file in order to be able to use array methods
    var notesDbParsed = JSON.parse(data);
    console.log(notesDbParsed);

    //Remove the note using filter method and create new array that excludes the requested note id
    var newNoteArray = notesDbParsed.filter((data) => data.id != id);
    console.log(newNoteArray);

    //Stringify the new array that excludes the requested note id
    var newNotesArrayStringified = JSON.stringify(newNoteArray);

    //Write the stringified new array to the db.json file
    fs.writeFile("./db/db.json", newNotesArrayStringified, (err) =>
      err
        ? console.log(err)
        : console.log(`Note has been removed from JSON file`)
    );
  });
});

/*This allows for the PORT number to be dependent on the processing 
environment. If deployed on a hosted web server the port will 
be dictated by that hosting service.  If a hosting service is 
not detected then a the local port 3009 will used*/
app.listen(process.env.PORT || 3009, () => {
  console.log(`The app is listening`);
});
