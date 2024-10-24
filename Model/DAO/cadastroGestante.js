const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllCadastrados = async function () {
    try {
        let sql = 'select * from usuario_gestante order by id_usuario_gestante desc'

        let rsCadastro = await prisma.$queryRawUnsafe(sql)
        return rsCadastro

    } catch (error) {

        console.log(error);

        return false
    }
}

const selectValidarLogin = async function(email,senha){

    try {
        let sql

        sql = `select id_usuario_gestante,email_gestante from usuario_gestante where email_gestante = '${email}' and senha_gestante = sha1('${senha}')`

        let rsUsuario = await prisma.$queryRawUnsafe(sql)


        return rsUsuario

    } catch (error) {
        console.log(error);
        return false
    }
}

const inserirCadastro = async function (cadastro) {
    try {
        let sql
        if (cadastro.foto_gestante == null || cadastro.foto_gestante == "" || cadastro.foto_gestante == undefined ||
            cadastro.nome_bebe == null || cadastro.nome_bebe == "" || cadastro.nome_bebe == undefined
        ) {

            sql = `insert into usuario_gestante(
                nome_gestante,
                sobrenome_gestante,
                idade_gestante,
                peso_gestante,
                altura_gestante,
                email_gestante, 
                senha_gestante, 
                foto_gestante,
                cpf_gestante,
                data_nascimento_gestante,
                profissao_gestante,
                nome_bebe,
                semanas_de_gravidez
             ) values(
                 '${cadastro.nome_gestante}',
                 '${cadastro.sobrenome_gestante}',
                 '${cadastro.idade_gestante}',
                 '${cadastro.peso_gestante}',
                 '${cadastro.altura_gestante}',
                 '${cadastro.email_gestante}',
                SHA1('${cadastro.senha_gestante}')
             )`

        } else {
            sql =
                `insert into usuario_gestante(
            nome_gestante,
            sobrenome_gestante,
            idade_gestante,
            peso_gestante,
            altura_gestante,
            email_gestante, 
            senha_gestante, 
            foto_gestante,
            cpf_gestante,
            data_nascimento_gestante,
            profissao_gestante,
            nome_bebe,
            semanas_de_gravidez
         ) values(
             '${cadastro.nome_gestante}',
             '${cadastro.sobrenome_gestante}',
             '${cadastro.idade_gestante}',
             '${cadastro.peso_gestante}',
             '${cadastro.altura_gestante}',
             '${cadastro.email_gestante}',
             SHA1('${cadastro.senha_gestante}'),
             '${cadastro.foto_gestante}',
             '${cadastro.cpf_gestante}',
             '${cadastro.data_nascimento_gestante}',
             '${cadastro.profissao_gestante}',
             '${cadastro.nome_bebe}',
             '${cadastro.semanas_de_gravidez}'
         )`

            
        }


       
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {

            return true
        } else {

            return false
        }

    } catch (error) {

        console.log(error);

        return false
    }
} 
const editarCadastro = async function (cadastro, id_usuario_gestante) {
    try {

        let sql

        if (cadastro.foto_gestante == null || cadastro.foto_gestante == "" || cadastro.foto_gestante == undefined ||
            cadastro.nome_bebe == null || cadastro.nome_bebe == "" || cadastro.nome_bebe == undefined
        ) {

            sql = `update usuario_gestante set
                nome_gestante = '${cadastro.nome_gestante}',
                sobrenome_gestante = '${cadastro.sobrenome_gestante}',
                idade_gestante = '${cadastro.idade_gestante}',
                peso_gestante = '${cadastro.peso_gestante}',
                altura_gestante = '${cadastro.altura_gestante}',
                email_gestante = '${cadastro.email_gestante}',
                senha_gestante = '${cadastro.senha_gestante}',
                foto_gestante = null,
                cpf_gestante = '${cadastro.cpf_gestante}',
                data_nascimento_gestante = '${cadastro.data_nascimento_gestante}',
                profissao_gestante = '${cadastro.profissao_gestante}',
                nome_bebe = null,
                semanas_de_gravidez = '${cadastro.semanas_de_gravidez}'
                where id_usuario_gestante = ${id_usuario_gestante}`

        } else {

            sql = `update usuario_gestante set
                nome_gestante = '${cadastro.nome_gestante}',
                sobrenome_gestante = '${cadastro.sobrenome_gestante}',
                idade_gestante = '${cadastro.idade_gestante}',
                peso_gestante = '${cadastro.peso_gestante}',
                altura_gestante = '${cadastro.altura_gestante}',
                email_gestante = '${cadastro.email_gestante}',
                senha_gestante = '${cadastro.senha_gestante}',
                foto_gestante = '${cadastro.foto_gestante}',
                cpf_gestante = '${cadastro.cpf_gestante}',
                data_nascimento_gestante = '${cadastro.data_nascimento_gestante}',
                profissao_gestante = '${cadastro.profissao_gestante}',
                nome_bebe = '${cadastro.nome_bebe}',
                semanas_de_gravidez = '${cadastro.semanas_de_gravidez}'
                where id_usuario_gestante = ${id_usuario_gestante}`
        }

       
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

const deletarCadastro = async function (id_gestante){

    try {

        let sql = `delete from usuario_gestante where id_usuario_gestante = ${id_gestante}`

        console.log(sql);

        let rsCadastro = await prisma.$executeRawUnsafe(sql)
        return rsCadastro

    } catch (error) {

        console.log(error);
        return false
    }
}



const returnId = async function () {

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from usuario_gestante limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {

        return false
    }

}

const selectByIdCadastro = async function (id) {
    try {
        let sql = `select * from usuario_gestante where id_usuario_gestante = ${id}`

        let rsCadastro = await prisma.$queryRawUnsafe(sql)
        return rsCadastro

    } catch (error) {
        return false
    }


}

module.exports = {
    selectAllCadastrados,
    inserirCadastro,
    editarCadastro,
    deletarCadastro,
    returnId,
    selectByIdCadastro,
    selectValidarLogin
}

//console.log(ola)