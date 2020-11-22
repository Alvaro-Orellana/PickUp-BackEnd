import express from 'express'
import { getUsuariosApi } from '../apis/usuariosAPI.js'

const router = express.Router()


function getRouterUsuarios() {

  const usuariosAPI = getUsuariosApi()

  router.get('/usuarios', async function (req, res) {
    const usuarios = await usuariosAPI.getAll()

    res.send(usuarios)
  })






  router.post('/auth/register', async function (req, res) {
    const aRegistrar = req.body

    
      const registrado = await usuariosAPI.agregar(aRegistrar)

      res.send(registrado)
    } 


  )
 

  return router

}

export { getRouterUsuarios }