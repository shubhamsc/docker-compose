const express = require("express");
const app = express();
const path = require("path");
const pg = require("pg");
const bodyParser = require('body-parser');
let connectionString = "postgresql://postgres:mypassword@postgres:5432/postgres";
const client = new pg.Client(connectionString);
const PORT = process.env.PORT || 3000;

client.connect()
    .then(() => app.listen(PORT, () => console.log(`Listening on ${PORT}`)))
    .catch(err => console.log("kal tak to chal rha tha! \n", err));

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    client.query(`CREATE TABLE IF NOT EXISTS numbers(number VARCHAR);`);
    res.sendFile(path.join(__dirname + '/public/app.html'));
})

app.get('/number', (req, res) => {
    console.log(req.url);
    client.query(`SELECT * FROM numbers;`)
        .then(resp => res.send(resp.rows))
        .catch(err => res.send("kal tak to chal rha tha!", err));
});

app.post('/number', (req, res) => {
    let number = req.body.number;
    client.query(`INSERT INTO numbers VALUES (${number});`)
        .then(() => res.redirect('/'))
        .catch(err => res.send("kal tak to chal rha tha! \n", err));
});