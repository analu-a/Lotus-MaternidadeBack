const message = require('../Modulo/config')
const cadastroDAO = require('../Model/DAO/cadastroDoula')

const getListarDoula = async function () {
    let cadastroDoulaJSON = {}

    let cadastro = await cadastroDAO.selectAllDoulas()

    if (cadastro) {
        if (cadastro.length) {
            cadastroDoulaJSON.cadastro = cadastro
            cadastroDoulaJSON.quantidade = cadastro.length
            cadastroDoulaJSON.status_code = 200
            return cadastroDoulaJSON
        } else {
            
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirNovaDoula = async function (cadastro, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosCadastro = {}

            if (cadastro.nome_doula       == "" || cadastro.nome_doula       == undefined || cadastro.nome_doula.length        > 80 ||
                cadastro.sobrenome_doula  == "" || cadastro.sobrenome_doula  == undefined || cadastro.sobrenome_doula.length   > 80 ||
                cadastro.email_doula      == "" || cadastro.email_doula      == undefined || cadastro.email_doula.length       >254 ||
                cadastro.senha_doula      == "" || cadastro.senha_doula      == undefined || cadastro.senha_doula.length       > 40 ||
                cadastro.cpf_doula        == "" || cadastro.cpf_doula        == undefined || cadastro.cpf_doula.length         > 11 ||
                cadastro.sobremim_doula   == "" || cadastro.sobremim_doula   == undefined || cadastro.sobremim_doula.length    >254 ||
                cadastro.foto_doula       == "" || cadastro.foto_doula       == undefined || cadastro.foto_doula.length        >300 ||
                cadastro.tempo_de_atuacao == "" || cadastro.tempo_de_atuacao == undefined || cadastro.tempo_de_atuacao.length  >10
            ) {

                return message.ERROR_REQUIRED_FIELDS

            } else {

                let novaDoula = await cadastroDAO.inserirDoula(cadastro)

                if (novaDoula) {

                    let returnId = await cadastroDAO.returnId()

                    resultDadosCadastro.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosCadastro.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosCadastro.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosCadastro.cadastro = cadastro

                    console.log(returnId +  "eu");

                    resultDadosCadastro.cadastro.id = returnId
                    return resultDadosCadastro

                } else {

                    return message.ERROR_INTERNAL_SERVER_DB
                    
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

const setEditarDoula = async function (id_usuario_doula, cadastro, contentType) {
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            let resultDadosCadastro = {}
            let id_doula = id_usuario_doula

            if (id_doula == '' || id_doula == undefined || isNaN(id_doula)) {
                return message.ERROR_INVALID_ID
            } else {
                let validarId = await cadastroDAO.selectByIdDoula(id_doula)

                if (validarId == false) {
                    return message.ERROR_NOT_FOUND
                } else {
                    if (cadastro.nome_doula == "" || cadastro.nome_doula == undefined || cadastro.nome_doula.length > 80 ||
                        cadastro.sobrenome_doula == "" || cadastro.sobrenome_doula == undefined || cadastro.sobrenome_doula.length > 80 ||
                        cadastro.email_doula == "" || cadastro.email_doula == undefined || cadastro.email_doula.lengt > 80 ||
                        cadastro.senha_doula == "" || cadastro.senha_doula == undefined || cadastro.senha_doula.lenght > 80 ||
                        cadastro.cpf_doula == "" || cadastro.cpf_doula == undefined || cadastro.cpf_doula.lenght > 11 ||
                        cadastro.sobremim_doula == "" || cadastro.sobremim_doula == undefined || cadastro.sobremim_doula.lenght > 120 ||
                        cadastro.foto_doula == "" || cadastro.foto_doula == undefined || cadastro.foto_doula.lenght > 300 ||
                        cadastro.tempo_de_atuacao == "" || cadastro.tempo_de_atuacao == undefined || cadastro.tempo_de_atuacao > 10
                    ) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                       
                        let novoCadastroDoula = await cadastroDAO.editarDoula(cadastro, id_doula)

                        if (novoCadastroDoula) {

                            resultDadosCadastro.status = message.SUCESS_EDITED_ITEM.status
                            resultDadosCadastro.status_code = message.SUCESS_EDITED_ITEM.status_code
                            resultDadosCadastro.message = message.SUCESS_EDITED_ITEM.message
                            resultDadosCadastro.cadastro = cadastro

                            return resultDadosCadastro
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }
                }
            }

        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirDoula = async function(id){
    try{
        let id_doula = id

        if(id_doula == '' || id_doula == undefined || isNaN(id_doula)) {
            return message.ERROR_INVALID_ID
        }else {
            let validarId = await cadastroDAO.selectByIdDoula(id_doula)

            if(validarId == false) {
                return message.ERROR_NOT_FOUND
            }else{

                let dadosCadastro = await cadastroDAO.deletarDoula(id)

                if (dadosCadastro) {
                    return message.SUCESS_DELETED_ITEM
                }else {

                    return message.ERROR_INTERNAL_SERVER_DB
                }

            }
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports={
    getListarDoula,
    setEditarDoula,
    setExcluirDoula,
    setInserirNovaDoula 
}