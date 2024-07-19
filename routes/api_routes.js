const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    app.get("/notes", function(req, res) {
       
        res.json(data);

    });

    app.get("/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });


    app.post("/notes", function(req, res) {

        const newNote = req.body;
        const uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });

    
    app.delete("/notes/:id", function(req, res) {

        const noteId = req.params.id;
        const newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}