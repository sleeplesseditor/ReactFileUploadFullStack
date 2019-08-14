const express = require('express');
const multiparty = require('multiparty');
const app = express();
const port = 5000;
const cors = require('cors');
const fs = require('fs');
const folder = 'files/';

app.use(cors());

app.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    
    return form.parse(req, (err, fields, files) => {
        if (err) {
             return res.status(400).send({error: err });
        }
  
        const { path } = files.file[0];
   
        let filename = path.split('/');
        filename = filename[filename.length - 1];
        
        return fs.rename(path, `${folder}${filename}`, error => {
             if (error) {
                  return res.status(400).send({ error });
             }
             return res.status(200).send({ file: filename });
        });
    });
});

app.listen(port, () => console.log(`Listening on Port ${port}`));