const express = require("express")
  
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const fs = require('fs');

app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.sendFile('/public/index.html')
  })

app.get("/weather", (req, res) => {
    const options = JSON.parse(fs.readFileSync('data/options.json'));
    res.render('index', { options: options })
})
app.post("/weather", (req, res) => {
    const options = JSON.parse(fs.readFileSync('data/options.json'));
    const forecast = JSON.parse(fs.readFileSync('data/forecast.json'));
    const selected_option = req.body.selected_option;

    result = forecast[selected_option];

    res.render('index', { options: options, weather:  result});
})
  
// Server Setup
app.listen(port, () => {
   console.log(`server is running at ${port}`);
});