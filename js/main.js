let infoBip;

window.getBipData(bipNumber) {
    Promise.all([
      fetch(`http://www.psep.cl/api/Bip.php?&numberBip=${bipNumber}`)
    ]).then((responses)=>{
      return Promise.all(responses.map((response => response.json())));
    }).then((responseJsons)=>{ 
      const bipCardData = responseJsons[0]
      console.log(bipCardData);
    });
  };
  
  infoBip = responseJsons[0];
