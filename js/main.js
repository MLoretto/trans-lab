let infoBip;
let numTarjeta;
let estContrato;
let saldTarjeta;
let fechaSaldo;
let tarjetas = [];

let userEmail;

const btnVerSaldo = document.getElementById('btnVerSaldo');
const btnCalcTarifa = document.getElementById('btnCalcTarifa');
const btnPerfil = document.getElementById('btnPerfil');
const btnPregFrecuentes = document.getElementById('btnPregFrecuentes');
const btnLogin = document.getElementById('btnLogin');
const btnAgregarTarjeta = document.getElementById('btnAgregarTarjeta');



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

      if(tarjetas[bipNumber.toString()] === undefined){
        tarjetas[bipNumber.toString()] = {
            numTarjeta: infoBip['N&ordm; tarjeta bip! '],
            estContrato: infoBip['Estado de contrato'],
            saldTarjeta: infoBip['Saldo  tarjeta'],
            fechaSaldo: infoBip['Fecha saldo']
        }
      }else{
        tarjetas[bipNumber.toString()].numTarjeta = infoBip['N&ordm; tarjeta bip! '];
        tarjetas[bipNumber.toString()].estContrato = infoBip['Estado de contrato'];
        tarjetas[bipNumber.toString()].saldTarjeta = infoBip['Saldo  tarjeta'];
        tarjetas[bipNumber.toString()].fechaSaldo = infoBip['Fecha saldo'];
      }
     document.getElementById('detalleTarjetas').innerHTML = '';
     document.getElementById('cbListTarjeta').innerHTML = '';
      for(let key in tarjetas){
        document.getElementById('detalleTarjetas').innerHTML += `<tr><td>${key}</td></tr>`; 
        document.getElementById('cbListTarjeta').innerHTML += `<option value="${key}">${key}</option>`; 
      }

      
      console.log('Tarjetas disponibles.');
      console.log(tarjetas);

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

btnAgregarTarjeta.addEventListener('click', () => {
   let txtNumTarjeta = document.getElementById('txtNumTarjeta');
   if(txtNumTarjeta.value !== ''){
     agregarTarjeta(txtNumTarjeta.value);
   }
});

function verSaldo(){
    hideContent();
    document.getElementById('verSaldo').style.display = 'block';
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

function obtenerSaldo(){
    const selectedIndex = document.getElementById('cbListTarjeta').selectedIndex;
    const selectedItem = document.getElementById('cbListTarjeta').options[selectedIndex]; 
    
    document.getElementById('saldoTarjeta').innerText = tarjetas[selectedItem.value].saldTarjeta;
    
}

function iniciarSesion(){
    userEmail = document.getElementById('userEmail').value;
    
    
    let userPass = document.getElementById('userPassword').value;
    if(validarEmail(userEmail)){
        if(validarPassword(userPass)){
            document.getElementById('correoUsuario').innerText = userEmail;
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
 
function agregarTarjeta(tarjeta){
  if(tarjetas[tarjeta.toString()] !== undefined){
    numTarjeta = tarjetas[tarjeta.toString()].numTarjeta;
    estContrato = tarjetas[tarjeta.toString()].estContrato;
    saldTarjeta = tarjetas[tarjeta.toString()].saldTarjeta;
    fechaSaldo = tarjetas[tarjeta.toString()].fechaSaldo;
  }else{
    getBipData(tarjeta.toString());
  } 
  console.log(tarjetas);
}

document.getElementById('bodyContent').style.display = 'none';
