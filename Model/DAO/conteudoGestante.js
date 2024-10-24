const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllConteudos = async function () {
    try {
        let sql = 'select * from conteudos_gestante order by id_conteudos desc'
        let rsConteudo = await prisma.$queryRawUnsafe(sql)
        return rsConteudo

    } catch (error) {

        return false
    }
}


const inserirConteudo = async function(dadosConteudo) {
    try {
        let sql

        sql = `insert into conteudos_gestante(
        foto_capa,
        titulo_conteudo,
        data_conteudo,
        conteudo       
        ) values (
        '${dadosConteudo.foto_capa}',
        '${dadosConteudo.titulo_conteudo}',
        '${dadosConteudo.data_conteudo}',
        '${dadosConteudo.conteudo}' 
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



const editarConteudo = async function (dadosConteudo, id_conteudos) {
    
    try {

        let sql

        sql = `update conteudos_gestante set 
        foto_capa = '${dadosConteudo.foto_capa}',
        titulo_conteudo = '${dadosConteudo.titulo_conteudo}',
        data_conteudo = '${dadosConteudo.data_conteudo}',
        conteudo = '${dadosConteudo.conteudo}'
        where id_conteudos = ${id_conteudos}`

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

const deletarConteudo = async function (id_conteudos) {
    
    try {
        
        let sql
        sql = `delete from conteudos_gestante where id_conteudos = ${id_conteudos}`

        let rsConteudo = await prisma.$executeRawUnsafe(sql)
        return rsConteudo

    } catch (error) {
        
        return false
    }
}

const returnId = async function () {

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from conteudos_gestante limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {

        return false
    }

}

const selectByIdConteudo= async function (id) {
    try {
        let sql = `select * from conteudos_gestante where id_conteudos = ${id}`

        let rsConteudo = await prisma.$queryRawUnsafe(sql)
        return rsConteudo

    } catch (error) {
        return false
    }


}

module.exports={
    selectAllConteudos,
    inserirConteudo,
    editarConteudo,
    deletarConteudo,
    returnId,
    selectByIdConteudo
}

/*select foto_capa,id_usuario_gestante from conteudos_gestante
 inner join usuario_gestante on conteudos_gestante.id_gestante_conteudo_usuario
  = usuario_gestante.id_usuario_gestante order by id_conteudos desc*/
