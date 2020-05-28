import express from 'express'
import {getRouterUsuarios} from './src/routers/routerUsuarios.js'

function crearApp(){
    const app = express()

    app.use(express.json())
    app.use('/api', getRouterUsuarios())

    return app
}

export {
    crearApp
}