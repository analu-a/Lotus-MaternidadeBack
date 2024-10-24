const message = require('../Modulo/config')
const conteudoDAO = require('../Model/DAO/conteudoGestante')

const getListarConteudos = async function(){
let conteudoJSON= {}

let conteudosDados = await conteudoDAO.selectAllConteudos()

if (conteudosDados) {

    if (conteudosDados.length) {
       conteudoJSON.conteudosDados = conteudosDados
        conteudoJSON.quantidade = conteudosDados.length
        conteudoJSON.status_code = 200
        return conteudoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
    
} else {
    return message.ERROR_INTERNAL_SERVER_DB
}
}

const setInserirConteudo = async function(dadosConteudo, contentType){
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultDadosConteudo = {}

            if (dadosConteudo.foto_capa == "" || dadosConteudo.foto_capa == undefined || dadosConteudo.foto_capa.length > 300 ||
                dadosConteudo.titulo_conteudo == "" || dadosConteudo.titulo_conteudo == undefined || dadosConteudo.titulo_conteudo.length > 50 ||
                dadosConteudo.data_conteudo == "" || dadosConteudo.data_conteudo == undefined || dadosConteudo.data_conteudo.length > 10 ||
                dadosConteudo.conteudo == "" || dadosConteudo.conteudo == undefined ) 
                { 
                
                    return message.ERROR_REQUIRED_FIELDS

            } else {
                
                let novoConteudo = await conteudoDAO.inserirConteudo(dadosConteudo)

                if (novoConteudo) {
                    let returnId = await conteudoDAO.returnId()

                    resultDadosConteudo.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosConteudo.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosConteudo.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosConteudo.conteudo = dadosConteudo

                    resultDadosConteudo.conteudo.id = returnId[0].id
                    return resultDadosConteudo

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

const setEditarConteudo = async function (id_conteudos,dadosConteudo,contentType) {
    
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultDadosConteudo = {}
            let id_conteudo = id_conteudos

            if (id_conteudo == '' || id_conteudo == undefined || isNaN(id_conteudo)) {
                return message.ERROR_INVALID_ID
            } else {
                
                let validarId = await conteudoDAO.selectByIdConteudo(id_conteudo)

                if (validarId == false) {
                    
                    return message.ERROR_NOT_FOUND
                } else {
                    
                    if (dadosConteudo.foto_capa == "" || dadosConteudo.foto_capa == undefined || dadosConteudo.foto_capa.length > 300 ||
                        dadosConteudo.titulo_conteudo == "" || dadosConteudo.titulo_conteudo == undefined || dadosConteudo.titulo_conteudo.length > 50 ||
                        dadosConteudo.data_conteudo == "" || dadosConteudo.data_conteudo == undefined || dadosConteudo.data_conteudo.length > 10 ||
                        dadosConteudo.conteudo == "" || dadosConteudo.conteudo == undefined)
                         {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        
                        let novoConteudo = await conteudoDAO.editarConteudo(dadosConteudo,id_conteudo)

                        if (novoConteudo) {
                            resultDadosConteudo.status = message.SUCESS_EDITED_ITEM.status
                            resultDadosConteudo.status_code = message.SUCESS_EDITED_ITEM.status_code
                            resultDadosConteudo.message = message.SUCESS_EDITED_ITEM.message
                            resultDadosConteudo.conteudo = dadosConteudo

                         return resultDadosConteudo
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB
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

const setExcluirConteudo = async function (id_conteudos) {
    
    try {
        let id_conteudo = id_conteudos

        if (id_conteudo == '' || id_conteudo == undefined || isNaN(id_conteudo)) {
            
            return message.ERROR_INVALID_ID
        } else {
            let validarId = await conteudoDAO.selectByIdConteudo(id_conteudo)

            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {
                
                let dadosConteudo = await conteudoDAO.deletarConteudo(id_conteudo)

                if (dadosConteudo) {
                    return message.SUCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
                        }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarConteudoId = async function (id) {
    try{
        let id_conteudo = id
        let conteudoJSON = {}
    
        if (id_conteudo == '' || id_conteudo == undefined || isNaN(id_conteudo)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosConteudo= await conteudoDAO.selectByIdConteudo(id_conteudo)
    
            if (dadosConteudo) {
                if (dadosConteudo.length) {
                   conteudoJSON.conteudo = dadosConteudo
                    conteudoJSON.status_code = 200
    
                    return conteudoJSON 
    
                } else {
                    return message.ERROR_NOT_FOUND 
                }
    
            } else {
                return message.ERROR_INTERNAL_SERVER_DB 
            }
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }


}

module.exports={
    getListarConteudos,
    setInserirConteudo,
    setEditarConteudo,
    setExcluirConteudo,
    getBuscarConteudoId
}
