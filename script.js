/*Código Modal*/
const abrirModalBotao = document.querySelector('#abrir-modal');
const FecharModalBotao =  document.querySelector('#fecha-modal');
const modal = document.querySelector('#modal');
const esconder = document.querySelector('#fade');

const toggleModal = () => {
    modal.classList.toggle("esconder");
    esconder.classList.toggle("esconder");
}
[abrirModalBotao,FecharModalBotao,esconder].forEach((el) =>{
    el.addEventListener("click", () =>toggleModal());
});

/*Código Inicial*/
tabela = document.querySelector('.nav-item a.active').id

let Table;

/*Ensalamento*/
if(tabela == 'Ensalamento'){
SQL = `
select idEnsalamento auto_increment,
       nomeCurso,
       NomeProfessor,
       numeroSala,
       nomeDesafio,
       dataCadastro,
       dataEnsalamento,
       horainicio,
       horafim 
from Ensalamento
 join Curso on Curso.idCurso = Ensalamento.idCurso
 join Professor on Professor.idProfessor = Ensalamento.idProfessor
 join Desafio on Desafio.idDesafio = Ensalamento.idDesafio
 join Sala on Sala.idSala = Ensalamento.idSala on table html
    `
Sql.execute(SQL);  

/*Curso para select*/
Curso = document.getElementById('Curso')
Table = Sql.execute('select idCurso auto_increment,nomeCurso from Curso on table json');
for(const item of Table){
    option = document.createElement('option')
    option.id = item['idCurso auto_increment']
    option.textContent = item['nomeCurso'];
    Curso.appendChild(option)
}
/*Professor*/
Professor = document.getElementById('Professor')
Table = Sql.execute('select idProfessor auto_increment,NomeProfessor from Professor on table json');
for(const item of Table){
    option = document.createElement('option')
    option.id = item['idProfessor auto_increment']
    option.textContent = item['NomeProfessor'];
    Professor.appendChild(option)
}
/*Sala*/
Sala = document.getElementById('Sala')
Table = Sql.execute('select idSala auto_increment,numeroSala from Sala on table json');
for(const item of Table){
    option = document.createElement('option')
    option.id = item['idSala auto_increment']
    option.textContent = item['numeroSala'];
    Sala.appendChild(option)
}
/*Desafio*/
Desafio = document.getElementById('Desafio')
Table = Sql.execute('select idDesafio auto_increment,nomeDesafio from Desafio on table json');
for(const item of Table){
    option = document.createElement('option')
    option.id = item['idDesafio auto_increment']
    option.textContent = item['nomeDesafio'];
    Desafio.appendChild(option)
}

/*Periodo*/
Periodo = document.getElementById('Periodo')
Table = Sql.execute('select idPeriodo auto_increment,nomePeriodo from Periodo on table json');
for(const item of Table){
    option = document.createElement('option')
    option.id = item['idPeriodo auto_increment']
    option.textContent = item['nomePeriodo'];
    Periodo.appendChild(option)
}


}else{
    SQL = `select * from ${tabela} on table html`
    Table = Sql.execute(SQL);
    console.log(Table)
}

// console.log("Table Len: "+Table[0]);

const UpdateTable = () =>{
    location.reload();
}


/*Salvar Alterações*/
const sends = document.querySelectorAll('#enviar');

for (const send of sends) {
    send.addEventListener('click', () => {

        if(tabela == 'Professor'){
            NomeProfessor = send.parentNode.parentNode.querySelector('[data-coluna="NomeProfessor"]').textContent
            formacaoProfessor = send.parentNode.parentNode.querySelector('[data-coluna="formacaoProfessor"]').textContent
            emailProfessor = send.parentNode.parentNode.querySelector('[data-coluna="emailProfessor"]').textContent
            
            SQL = `update ${tabela} set NomeProfessor = ${NomeProfessor} where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);
            
            SQL = `update ${tabela} set formacaoProfessor = ${formacaoProfessor} where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);

            SQL = `update ${tabela} set emailProfessor = ${emailProfessor} where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);
             UpdateTable();
        }
        
        if(tabela == 'Sala'){
            NumeroSala = send.parentNode.parentNode.querySelector('[data-coluna="numeroSala"]').textContent
            SQL = `update ${tabela} set numeroSala = ${NumeroSala} where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);
            UpdateTable();
        }
        if(tabela == 'Periodo'){
            nomePeriodo = send.parentNode.parentNode.querySelector('[data-coluna="nomePeriodo"]').textContent
            SQL = `update ${tabela} set nomePeriodo = ${nomePeriodo} where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);
            UpdateTable();
        }
        if(tabela == 'Curso'){
            nomeCurso = send.parentNode.parentNode.querySelector('[data-coluna="nomeCurso"]').textContent
            SQL = `update ${tabela} set nomeCurso = ${nomeCurso} where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);
           
            UpdateTable();
        }
        if(tabela == 'Desafio'){
            nomeDesafio = send.parentNode.parentNode.querySelector('[data-coluna="nomeDesafio"]').textContent
            areaDesafio = send.parentNode.parentNode.querySelector('[data-coluna="areaDesafio"]').textContent

            SQL = `update ${tabela} set nomeDesafio = '${nomeDesafio.replaceAll('\'','')}' where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);

            SQL = `update ${tabela} set areaDesafio = '${areaDesafio.replaceAll('\'','')}' where id${tabela} = ${send.getAttribute('data-id')}`;
            Sql.execute(SQL);

            UpdateTable();
        }
  });
}


/*EDITAR ALL*/
const edits = document.querySelectorAll('#editar');

for (const edit of edits) {
  edit.addEventListener('click', () => {
    const row = edit.parentNode.parentNode;
    const cells = row.querySelectorAll('td');
    for (const cell of cells) {
      cell.setAttribute('contenteditable', true);
    }
  });
}

/*DELETAR ALL*/
const deletes = document.querySelectorAll('#delete');

for (const del of deletes) {
    del.addEventListener('click', () => {
        SQL = `delete from ${tabela} where id${tabela} = ${del.getAttribute('data-id')}`;
        Sql.execute(SQL);
        UpdateTable();
      });
    }


/*CADASTRAR*/
if(tabela=='Sala'){
    document.getElementById('SalvarSala').addEventListener('click', ()=>{

    const NomeSala = document.getElementById('inputEmail4')
    console.log(NomeSala.value)
            
    SQL = `insert into ${tabela} values(${NomeSala.value});`
    Sql.execute(SQL);
        
    UpdateTable();
        
})    
}

if(tabela=='Professor'){
    document.getElementById('submit').addEventListener('click', ()=>{

    // create table if not exists Professor(
    //     idProfessor auto_increment,
    //     NomeProfessor,
    //     formacaoProfessor,
    //     emailProfessor
    // );

    const NomeProfessor = document.getElementById('NomeProfessor')
    const FormacaoProfessor = document.getElementById('FormacaoProfessor')
    const EmailProfessor = document.getElementById('EmailProfessor')
            
    SQL = `insert into ${tabela} values(${NomeProfessor.value},${FormacaoProfessor.value},${EmailProfessor.value});`
    Sql.execute(SQL);
        
    UpdateTable();
    })    
}
if(tabela=='Periodo'){
    document.getElementById('submit').addEventListener('click', ()=>{

    const nomePeriodo = document.getElementById('nomePeriodo')
    console.log(nomePeriodo.value)
            
    SQL = `insert into ${tabela} values(${nomePeriodo.value});`
    Sql.execute(SQL);
        
    UpdateTable();
        
})    
}
if(tabela=='Curso'){
    document.getElementById('submit').addEventListener('click', ()=>{

    const nomeCurso = document.getElementById('nomeCurso')
    console.log(nomeCurso.value)
            
    SQL = `insert into ${tabela} values(${nomeCurso.value});`
    Sql.execute(SQL);
        
    UpdateTable();
        
})    
}
if(tabela=='Desafio'){
    document.getElementById('submit').addEventListener('click', ()=>{

    const nomeDesafio = document.getElementById('nomeDesafio')
    const areaDesafio = document.getElementById('areaDesafio') 
    console.log(nomeDesafio.value)
            
    SQL = `insert into ${tabela} values('${nomeDesafio.value}', '${areaDesafio.value}');`
    Sql.execute(SQL);
        
    UpdateTable();
        
})    
}
/*Cadastro*/
if(tabela=='Ensalamento'){
    document.getElementById('submit').addEventListener('click', ()=>{

        const CursoId = document.getElementById('Curso').options[document.getElementById('Curso').selectedIndex].id;
        const ProfessorId = document.getElementById('Professor').options[document.getElementById('Professor').selectedIndex].id;
        const SalaId = document.getElementById('Sala').options[document.getElementById('Sala').selectedIndex].id;
        const DesafioId = document.getElementById('Desafio').options[document.getElementById('Desafio').selectedIndex].id;
        const PeriodoId = document.getElementById('Periodo').options[document.getElementById('Periodo').selectedIndex].id;
        let Data = document.getElementById('Data').value
        let HoraInicio = document.getElementById('HoraInicio').value
        let HoraFim = document.getElementById('HoraFim').value

        if(Data == ''){
            Data = '0000-00-00'
        }

        if(HoraInicio == ''){
            HoraInicio = '00:00'
        }

        if(HoraFim == ''){
            HoraFim = '00:00'
        }


        // create table if not exists Ensalamento(
        //     idEnsalamento auto_increment,
        //     dataCadastro,
        //     dataEnsalamento,
        //     horainicio,
        //     horafim,
        //     idProfessor,
        //     idSala,
        //     idDesafio,
        //     idPeriodo,
        //     idCurso
        // );

        SQL = `
        insert into Ensalamento values(
            getdate(),${Data},${HoraInicio},${HoraFim},${ProfessorId},${SalaId},${DesafioId},${PeriodoId},${CursoId}
        );
        `;
        Sql.execute(SQL);

    UpdateTable();
        
    })    
}


/*SCRIPT DE PADRONIZAÇÃO LSSQL*/
SQL = `
#deletar a tabela antes de criar;
#drop table Professor;
#drop table Sala;
#drop table Desafio;
#drop table Periodo;
#drop table Curso;
#drop table Ensalamento;


create table if not exists Professor(
    idProfessor auto_increment,
    NomeProfessor,
    formacaoProfessor,
    emailProfessor
);
create table if not exists Sala(
    idSala auto_increment,
    numeroSala
);
create table if not exists Desafio(
    idDesafio auto_increment,
    nomeDesafio,
    areaDesafio
);
create table if not exists Periodo(
    idPeriodo auto_increment,
    nomePeriodo
);
create table if not exists Curso(
    idCurso auto_increment,
    nomeCurso,
    idProfessor
);
create table if not exists Ensalamento(
    idEnsalamento auto_increment,
    dataCadastro,
    dataEnsalamento,
    horainicio,
    horafim,
    idProfessor,
    idSala,
    idDesafio,
    idPeriodo,
    idCurso
);

#insert into Periodo values(3periodo);
#insert into Curso values(TI);
#insert into Curso values(ENG);
#insert into Curso values(ADM);
#insert into Professor values(James, Sistema de Informação, james@unisales.br);
#insert into Professor values(Renan, Ciências da Computação, Renan@unisales.br);
#insert into Professor values(Romulo, Ciências da Computação, Romulo@unisales.br);

#insert into Sala values(354);

#insert into Desafio values(FrontEnd, Sistema de Informação);
#insert into Desafio values(BackEnd, Sistema de Informação);
#insert into Desafio values(Banco de Dados, Sistema de Informação);
#select * from Desafio;
#select * from Professor;

#insert into Ensalamento values(
    getdate(),getdate(),05:50,6:40,1,1,1,1,2
);

#insert into Ensalamento values(
  getdate(),getdate(),06:40,7:20,3,1,2,1,1
);

#insert into Ensalamento values(
  getdate(),getdate(),03:50,4:20,3,1,3,1,1
);

#select * from Ensalamento;
`



Sql.execute(SQL);

