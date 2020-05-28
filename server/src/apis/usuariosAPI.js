import { getUsuariosDao } from '../data/usuariosDao.js'
import { validarUsuario } from '../validaciones/usuarios.js'

function getUsuariosApi() {
    const usuariosDao = getUsuariosDao()

    async function agregar(usuParaAgregar) {

        if ( await validarUsuario(usuParaAgregar)) {
            
            const usuAgregado = await usuariosDao.add(usuParaAgregar)
            return usuAgregado
        }else{
            return 'Usuario invalido'
        }

    }

    async function getAll() {
        let result
        result = await usuariosDao.getAll()
        return result
    }



    return {
        agregar,
        getAll
    }
}

export {
    getUsuariosApi
}
