const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllDoulas = async function(){
    try{
        let sql = 'select * from usuario_doula order by id_usuario_doula desc'

        let rsCadastro = await prisma.$queryRawUnsafe(sql)
        return rsCadastro
    }catch (error) {
    
        return false
    }
}

const inserirDoula = async function (cadastro){
    try {
        let sql
        
                sql = `insert into usuario_doula(
                    nome_doula,
                    sobrenome_doula,
                    email_doula,
                    senha_doula,
                    cpf_doula,
                    sobremim_doula,
                    foto_doula,
                    tempo_de_atuacao
                ) values (
                    '${cadastro.nome_doula}',
                    '${cadastro.sobrenome_doula}',
                    '${cadastro.email_doula}',
                    SHA1('${cadastro.senha_doula}'),
                    '${cadastro.cpf_doula}',
                    '${cadastro.sobremim_doula}',
                    '${cadastro.foto_doula}',
                    '${cadastro.tempo_de_atuacao}'
                )`
            
            let result = await prisma.$executeRawUnsafe(sql)

            console.log(result);
            if(result){
                return true
            }else{
                return false
            }
    }catch (error) {
        console.log(error);
        return false
    }
}

const editarDoula = async function (cadastro, id_usuario_doula){
    try{
        let sql

     
                sql = `update usuario_doula set
                nome_doula = '${cadastro.nome_doula}',
                sobrenome_doula = '${cadastro.sobrenome_doula}',
                email_doula = '${cadastro.email_doula}',
                senha_doula = '${cadastro.senha_doula}',
                cpf_doula = '${cadastro.cpf_doula}',
                sobremim_doula = '${cadastro.sobremim_doula}',
                foto_doula = '${cadastro.foto_doula}',
                tempo_de_atuacao = '${cadastro.tempo_de_atuacao}',
                where id_usuario_doula = ${id_usuario_doula}`
            

            let result = await prisma.$executeRawUnsafe(sql)

            if(result) {
                return true
            }else{
                return false
            }
    }catch (error) {
        return false
    }
}

const deletarDoula = async function(id_usuario_doula){

    try {
        let sql = `delete from usuario_doula where id_usuario_doula = ${id_usuario_doula}`


        let rsCadastro = await prisma.$executeRawUnsafe(sql)
        return rsCadastro
    }catch(error) {

        return false
    }
}

const returnId = async function(){
    try {
        let sql = 'select cast(last_insert_id() as DECIMAL) as id from usuario_doula limit 1;'
        let rsId = await prisma.$queryRawUnsafe(sql)

        console.log(`rsId: ${rsId}`);

        return rsId
    }catch(error) {

        console.log(error);
        return false
    }
}

const selectByIdDoula = async function (id) {
    try{
        let sql = `select * from usuario_doula where id_usuario_doula = ${id}`

        let rsCadastro = await prisma.$executeRawUnsafe(sql)
        return rsCadastro
    }catch(error) {
        return false
    }
}

module.exports = {
    selectAllDoulas,
    inserirDoula,
    editarDoula,
    deletarDoula,
    selectByIdDoula,
    returnId
}