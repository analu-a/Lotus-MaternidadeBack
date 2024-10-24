const message = require('../Modulo/config')
const cadastroDAO = require('../Model/DAO/cadastroGestante')

const getListarCadastro = async function(){
let cadastroJSON= {}

let cadastro = await cadastroDAO.selectAllCadastrados()

if (cadastro) {

    if (cadastro.length) {
        cadastroJSON.cadastro = cadastro
        cadastroJSON.quantidade = cadastro.length
        cadastroJSON.status_code = 200
        return cadastroJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
    
} else {
    return message.ERROR_INTERNAL_SERVER_DB
}
}

const getValidarLogin = async function (email_gestante,senha_gestante,contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let email = email_gestante
            let senha = senha_gestante
            let usuarioJSON = {}


            if (email == '' || email == undefined || senha == '' || senha == undefined) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let dadosUsuario = await cadastroDAO.selectValidarLogin(email,senha)

                if (dadosUsuario) {
                                console.log(dadosUsuario);

                    if (dadosUsuario.length > 0) {

                        usuarioJSON.status = message.SUCESS_VALIDATED_ITEM.status
                        usuarioJSON.status_code = message.SUCESS_VALIDATED_ITEM.status_code
                        usuarioJSON.message = message.SUCESS_VALIDATED_ITEM.message
                        usuarioJSON.usuario = dadosUsuario

                        return usuarioJSON
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }

        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirNovoCadastro = async function(cadastro, contentType){
try {
 
    if (String(contentType).toLowerCase() == 'application/json') {

        let resultDadosCadastro = {}


        if (cadastro.nome_gestante== "" || cadastro.nome_gestante == undefined || cadastro.nome_gestante.length > 80 ||
            cadastro.sobrenome_gestante == "" || cadastro.sobrenome_gestante == undefined || cadastro.sobrenome_gestante.length > 80||
            cadastro.idade_gestante == "" || cadastro.idade_gestante == undefined  ||
            cadastro.peso_gestante == "" || cadastro.peso_gestante == undefined || cadastro.peso_gestante.length > 10 ||
            cadastro.altura_gestante == "" || cadastro.altura_gestante == undefined || cadastro.altura_gestante.length > 10 ||
            cadastro.email_gestante == "" || cadastro.email_gestante == undefined || cadastro.email_gestante.length > 254 ||
            cadastro.senha_gestante == "" || cadastro.senha_gestante == undefined || cadastro.senha_gestante.length > 40 ||
            cadastro.cpf_gestante == "" || cadastro.cpf_gestante == undefined || cadastro.cpf_gestante.length > 14 ||
            cadastro.data_nascimento_gestante == "" || cadastro.data_nascimento_gestante == undefined || cadastro.data_nascimento_gestante.length > 10 ||
            cadastro.profissao_gestante == "" || cadastro.profissao_gestante == undefined || cadastro.profissao_gestante.length > 50 ||
            cadastro.semanas_de_gravidez == "" || cadastro.semanas_de_gravidez == undefined || cadastro.semanas_de_gravidez.length > 10 
        ) {
console.log(cadastro);

            console.log('sou eu');
            
            return message.ERROR_REQUIRED_FIELDS 

        } else {

            let validarDados = false

            if (cadastro.foto_gestante != null && cadastro.foto_gestante != undefined && cadastro.foto_gestante != "" ||
                cadastro.nome_bebe != null && cadastro.nome_bebe != undefined && cadastro.nome_bebe != ""
            ) {
                if (cadastro.foto_gestante.length > 300  && cadastro.nome_bebe > 80) {

                    
                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    validarDados = true 
                }
            } else {
                validarDados = true 
            }

            if (validarDados) {


                let novoCadastro = await cadastroDAO.inserirCadastro(cadastro)

                if (novoCadastro) {
                    let returnId = await cadastroDAO.returnId()

                    resultDadosCadastro.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosCadastro.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosCadastro.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosCadastro.cadastro = cadastro                  

                    resultDadosCadastro.cadastro.id = returnId[0].id
                    return resultDadosCadastro 

                } else {

                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } else {
        return message.ERROR_CONTENT_TYPE 
    }
        
    } catch (error) {
        console.log(error);
        

        return message.ERROR_INTERNAL_SERVER
    }
}

const setEditarCadastro = async function(id_usuario_gestante,cadastro,contentType) {
    
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {
            
            let resultDadosCadastro = {}
            let id_gestante = id_usuario_gestante

            if (id_gestante == '' || id_gestante == undefined || isNaN(id_gestante)) {
                return message.ERROR_INVALID_ID
            } else {
                let validarId = await cadastroDAO.selectByIdCadastro(id_gestante)

                if (validarId == false) {
                    
                    return message.ERROR_NOT_FOUND
                } else {
                    if (cadastro.nome_gestante == "" || cadastro.nome_gestante == undefined || cadastro.nome_gestante.length > 80 ||
                        cadastro.sobrenome_gestante == "" || cadastro.sobrenome_gestante == undefined || cadastro.sobrenome_gestante.length > 80 ||
                        cadastro.idade_gestante == "" || cadastro.idade_gestante == undefined || cadastro.idade_gestante.length > 3 ||
                        cadastro.peso_gestante == "" || cadastro.peso_gestante == undefined || cadastro.peso_gestante.length > 10 ||
                        cadastro.altura_gestante == "" || cadastro.altura_gestante == undefined || cadastro.altura_gestante.length > 10 ||
                        cadastro.email_gestante == "" || cadastro.email_gestante == undefined || cadastro.email_gestante.length > 254 ||
                        cadastro.senha_gestante == "" || cadastro.senha_gestante == undefined || cadastro.senha_gestante.length > 40 ||
                        cadastro.cpf_gestante == "" || cadastro.cpf_gestante == undefined || cadastro.cpf_gestante.length > 14 ||
                        cadastro.data_nascimento_gestante == "" || cadastro.data_nascimento_gestante == undefined || cadastro.data_nascimento_gestante.length > 10 ||
                        cadastro.profissao_gestante == "" || cadastro.profissao_gestante == undefined || cadastro.profissao_gestante.length > 50 ||
                        cadastro.semanas_de_gravidez == "" || cadastro.semanas_de_gravidez == undefined || cadastro.semanas_de_gravidez.length > 10 
                    ) {

                       return message.ERROR_REQUIRED_FIELDS

                    } else {
                        
                        let validarDados = false

                        if (cadastro.foto_gestante != undefined && cadastro.foto_gestante != "" && cadastro.foto_gestante != null ||
                            cadastro.nome_bebe != null && cadastro.nome_bebe != undefined && cadastro.nome_bebe != "") {

                                if (cadastro.foto_gestante.length > 300 || cadastro.nome_bebe.length > 80) {
                                    return message.ERROR_REQUIRED_FIELDS
                                } else {
                                    validarDados = true
                                }
                        } else {
                            validarDados = true
                        }

                        if (validarDados) {
                            
                            let novoCadastro = await cadastroDAO.editarCadastro(cadastro, id_gestante)

                            if (novoCadastro) {
                                
                                resultDadosCadastro.status = message.SUCESS_EDITED_ITEM.status
                                resultDadosCadastro.status_code = message.SUCESS_EDITED_ITEM.status_code
                                resultDadosCadastro.message = message.SUCESS_EDITED_ITEM.message
                                resultDadosCadastro.cadastro = cadastro
                                return resultDadosCadastro
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }

                        } else {
                            return message.ERROR_CONTENT_TYPE
                        }
                    }
                }
            }
        } else {
           return message.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirCadastro = async function(id){
    try {
        let id_gestante = id

        if (id_gestante == '' || id_gestante == undefined || isNaN(id_gestante)) {
            return message.ERROR_INVALID_ID
        } else {
            let validarId = await cadastroDAO.selectByIdCadastro(id_gestante)
            
            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {
                
                let dadosCadastro = await cadastroDAO.deletarCadastro(id)

                if (dadosCadastro) {
                    return message.SUCESS_DELETED_ITEM
                } else {

                    console.log(dadosCadastro);
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } catch (error) {

        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports={
    getListarCadastro,
    setInserirNovoCadastro,
    setEditarCadastro,
    setExcluirCadastro,
    getValidarLogin
}

