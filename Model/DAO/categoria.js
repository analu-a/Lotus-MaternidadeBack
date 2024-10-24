const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllCategorias = async function(){
    try {
        let sql = 'select * from categoria_conteudo order by id_categoria desc'
        let rsCategoria = await prisma.$queryRawUnsafe(sql)

        return rsCategoria
    } catch (error) {
        
        return false
    }
}

const inserirCategoria = async function(dadosCategoria){
    try {
        let sql 

        sql = `insert into categoria_conteudo(
        titulo_categoria
        ) values (
        ${dadosCategoria.titulo_categoria} 
        )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const editarCategoria = async function (dadosCategoria, id_categoria) {
    
    try {
        let sql

        sql = `update categoria_conteudo set
        titulo_categoria - '${dadosCategoria.titulo_categoria}'
        where id_categoria = ${id_categoria}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deletarCategoria = async function (id_categoria){
    try {
        let sql = 
        sql = `delete from categoria_conteudo where id_categoria = ${id_categoria}`

        let rsCategoria = await prisma.$executeRawUnsafe(sql)
        return rsCategoria

    } catch (error) {
        return false
    }
}

const returnId = async function (){
    try {
        let sql = 'select CAST(last_insert_id() AS DECIMAL as id from categoria_conteudo limit 1)'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {
        return false
    }
}

const selectByIdCategoria = async function (id){
    try {
        let sql = `select * from categoria_conteudo where id_categoria = ${id}`

        let rsCategoria = await prisma.$queryRawUnsafe(sql)
        return rsCategoria

    } catch (error) {
        return false        
    }
}

module.exports = {
    selectAllCategorias,
    inserirCategoria,
    editarCategoria,
    deletarCategoria,
    returnId,
    selectByIdCategoria
}