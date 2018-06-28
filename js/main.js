let infoBip;
const btnVerSaldo = document.getElementById('btnVerSaldo');
const btnCalcTarifa = document.getElementById('btnCalcTarifa');
const btnPerfil = document.getElementById('btnPerfil');
const btnPregFrecuentes = document.getElementById('btnPregFrecuentes');

window.getBipData(bipNumber) {
    Promise.all([
      fetch(`http://www.psep.cl/api/Bip.php?&numberBip=${bipNumber}`)
    ]).then((responses)=>{
      return Promise.all(responses.map((response => response.json())));
    }).then((responseJsons)=>{ 
      const bipCardData = responseJsons[0]
      console.log(bipCardData);
      infoBip = responseJsons[0];
    });
  };
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

function verSaldo(){
    hideContent();
}
function calcularTarifa(){
    hideContent();
}
function verPerfil(){
    hideContent();
}
function pregFrecuentes(){
    hideContent();
}

function hideContent() {// Oculta contenidos
    const bodyContentChild = document.getElementById('bodyContent').children;
    for (let i = 0;i < bodyContentChild.length;i++) {
      bodyContentChild[i].style.display = 'none';// Los oculta uno a uno.
    }   
  };
