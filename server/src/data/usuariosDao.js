const usuarios = []



function getUsuariosDao() {

    async function getAll() {
        return usuarios
    }

    async function add(estuNuevo) {
        usuarios.push(estuNuevo)
        return estuNuevo
    }

  

    return {
        getAll,
        add
    }

}

export {
    getUsuariosDao
}