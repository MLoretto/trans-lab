let infoBip;
let numTarjeta;
let estContrato;
let saldTarjeta;
let fechaSaldo;

let userEmail;

const btnVerSaldo = document.getElementById('btnVerSaldo');
const btnCalcTarifa = document.getElementById('btnCalcTarifa');
const btnPerfil = document.getElementById('btnPerfil');
const btnPregFrecuentes = document.getElementById('btnPregFrecuentes');
const btnLogin = document.getElementById('btnLogin');

window.getBipData = (bipNumber) => {
    Promise.all([
      fetch(`http://www.psep.cl/api/Bip.php?&numberBip=${bipNumber}`)
    ]).then((responses)=>{
      return Promise.all(responses.map((response => response.json())));
    }).then((responseJsons)=>{ 
      infoBip = responseJsons[0];
      numTarjeta = infoBip['N&ordm; tarjeta bip! '];
      estContrato = infoBip['Estado de contrato'];
      saldTarjeta = infoBip['Saldo  tarjeta'];
      fechaSaldo = infoBip['Fecha saldo'];
      console.log(infoBip);
      console.log(numTarjeta);
      console.log(estContrato);
      console.log(saldTarjeta);
      console.log(fechaSaldo);
      
    });
  }

  
/*
  infoBip["N&ordm; tarjeta bip! "];
  infoBip["Estado de contrato"];
  infoBip["Saldo  tarjeta"];
  infoBip["Fecha saldo"];
*/
btnVerSaldo.addEventListener('click', () => {
    verSaldo();
  });

btnCalcTarifa.addEventListener('click', () => {
    calcularTarifa();
});

btnPerfil.addEventListener('click', () => {
    verPerfil();
});

btnPregFrecuentes.addEventListener('click', () => {
    pregFrecuentes();
});

btnLogin.addEventListener('click', () => {
    iniciarSesion();
});

function verSaldo(){
    hideContent();

console.log(infoBip['Saldo  tarjeta']);

}
function calcularTarifa(){
    hideContent();
}
function verPerfil(){
    hideContent();
    document.getElementById('perfilUsuario').style.display = 'block';
}
function pregFrecuentes(){
    hideContent();
}
function iniciarSesion(){
    userEmail = document.getElementById('userEmail').value;
    let userPass = document.getElementById('userPassword').value;
    if(validarEmail(userEmail)){
        if(validarPassword(userPass)){
            hideContent();
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('bodyContent').style.display = 'block';
            document.getElementById('barMenu').style.display = 'block';
        }else{
            alert('contraseña no cumple las características de seguridad\nnúmerico máximo 8 caracteres.');        
        }
    }else{
        alert('e-mail incorrecto.');        
    }

}

function hideContent() {// Oculta contenidos
    const bodyContentChild = document.getElementById('bodyContent').children;
    for (let i = 0;i < bodyContentChild.length;i++) {
      bodyContentChild[i].style.display = 'none';// Los oculta uno a uno.
    }   
    document.getElementById('headerBar').style.display = 'block'; 
    
  };
  
function validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
        return true;
    } else {
        return false;
    }
}  

function validarPassword(valor){
    return valor.length <= 8 && /^([0-9])*$/.test(valor);
}
 
  document.getElementById('bodyContent').style.display = 'none';
  getBipData('73506052');