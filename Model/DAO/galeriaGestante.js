const { PrismaClient } = require('@prisma/client')
const { returnId } = require('./cadastroGestante')


const prisma = new PrismaClient()

const selectAllFotos = async function () {
    try {
        let sql = 'select * from '

        let rsCadastroFotos = await prisma.$queryRawUnsafe(sql)
        return rsCadastroFotos
    } catch (error) {
        console.log(error)

        return false
    }
}

const inserirFoto = async function (dadosFoto) {
    try{
        let sql

        sql = `insert into esqueci_nome(
        foto_galeria
        ) values (
         ${dadosFoto.link_foto}
         )`

         let result = await prisma.$queryRawUnsafe(sql)

         if(result) {
            return true
         } else {
            return false
         }
    } catch (error) {
        false
    }
}

const deletarFoto = async function(id_foto){
    try {
        let sql =
        sql = `delete from foto_galeria where id_foto = ${id_foto}`

        let rsFoto = await prisma.$queryRawUnsafe(sql)
        return rsFoto
    } catch (error) {
        return false
    }
}

const returnId = async function(){
    try{
        let sql = 'select CAST(last_insert_id() AS DECIMAL as id from esqueci_nome limit 1)'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId
    }catch(error) {
        return false
    }
}

const selectByIdFoto = async function(id) {
    try {
        let sql = `select * from esqueci_nome_tabela where id_foto = ${id}`

        let rsFoto = await prisma.$queryRawUnsafe(sql)
        return rsFoto
    }catch (error) {
        return false
    }
}

module.exports = {
    selectAllFotos,
    selectByIdFoto,
    returnId,
    deletarFoto,
    inserirFoto
}
