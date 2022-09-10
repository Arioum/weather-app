const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine','hbs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.render("index")
})

app.post("/", (req, res) => {
    const query = req.body.cityName
    const apiKey = "5f1265bb51468222b9a3cffc07e1d5f9"
    const unit = "metric"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey +"&units=" + unit;
    
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const location = weatherData.name;
            const tempertature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            
            res.render("index", {
                location : location,
                temperature : tempertature + "°C",
                description :description,
                humidity : "Humidity : " + humidity + "%",
                windSpeed : "Winds : " + windSpeed + " km/h",
                icon : iconURL
            })
        })
    })
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});