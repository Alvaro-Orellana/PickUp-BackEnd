

async function validarUsuario(usuario) {

   


    const result = await validarEmail(usuario.email) &&
        (usuario.nombre.length > 0) &&
        (usuario.apellido.length > 0) &&
        (usuario.password.length > 4) &&
        (usuario.password == usuario.confirmpw)

    return result
}


async function validarEmail(valor) {

    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)) {

        return true
    } else {

        return false
    }
}

export {
    validarUsuario
}