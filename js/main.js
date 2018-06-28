let infoBip;

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


