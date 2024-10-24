const message = require('../Modulo/config')
const categoriaDAO = require('../Model/DAO/categoria')

const getListarCategoria = async function() {
    let categoriaJSON = {}
    let categoriaDados = await categoriaDAO.selectAllCategorias()

    if (categoriaDados) {
        
        if (categoriaDados.length) {
            categoriaJSON.categoriaDados = categoriaDados
            categoriaJSON.quantidade = categoriaDados.length
            categoriaJSON.status_code = 200
            return categoriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

setInseriCategoria = async function (dadosCategoria, contentType){
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultDadosCategoria = {}

            if (dadosCategoria.titulo_categoria == "" || dadosCategoria.titulo_categoria == undefined || dadosCategoria.titulo_categoria.length > 50) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let novaCategoria = await categoriaDAO.inserirCategoria(dadosCategoria)

                if (novaCategoria) {
                    let returnId = await categoriaDAO.returnId()

                    resultDadosCategoria.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosCategoria.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosCategoria.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosCategoria.categoria = dadosCategoria

                    resultDadosCategoria.categoria.id = returnId[0].id
                    return resultDadosCategoria
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


const setEditarCategoria = async function (id_categoria, dadosCategoria, contentType) {
    
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultDadosCategoria = {}
            let id_categorias = id_categoria

            if (id_categorias == '' || id_categorias == undefined || isNaN(id_categorias)) {
                return message.ERROR_INVALID_ID
            } else {

                
               
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        
    }
}