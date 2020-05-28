import {crearApp} from './server/app.js'


const app = crearApp()


app.listen(8080, () => {
    console.log("El servidor está inicializado en el puerto 8080");
});