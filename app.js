const express = require("express");
const https = require("https");

const app = express();
const PORT = 3000;
const url = "https://api.openweathermap.org/data/2.5/weather?q=Cordoba&appid=50f19f75d0a009a027c1e7ddbe0f0978&units=metric"

app.get("/", (request, response) => {
  //console.log(request );
  https.get(url, (res) => {
    //console.log(res);

    res.on("data", (data) => {
      const datosClima = JSON.parse(data)
      console.log(datosClima);
    })

  } );

  response.send("<h1>Hola Mundo!</> ")
})


app.listen(PORT, () => {
  console.log("Escuchando en el puerto " + PORT);
})
