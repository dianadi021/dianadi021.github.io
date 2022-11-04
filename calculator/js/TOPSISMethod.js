var arrayIndicatorJSONData = '{"MatrixAll":[],"nilaiKuadratBasic":[],"nilaiTernormalisasi":[],"nilaiTerbobot":[],"maxMinPlusNegatifA":[],"nilaiPlusNegatifD":[],"nilaiPreferensiAlternatif":[]}';
/* MENAMPILKAN HASIL PERHITUNGAN */
function popup_result_TOPSIS() {
  
  var objIndicator = JSON.parse(arrayIndicatorJSONData);

  
  const matrixArrayLength = document.getElementsByClassName("matrixAll").length;
  const indicatorArrayLength = document.getElementsByClassName("indicator-name").length;
  const choicesArrayLength = document.getElementsByClassName("choices").length;





  /*
  LOOPING TESTING MENGETAHUI ARRAY MATRIX YANG ADA

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
      console.log(iIndicatorLength+" - "+iChoicesLength);
      console.log(document.getElementById("matrix_"+iIndicatorLength+"-"+iChoicesLength).value);
    };
  };


  END
  */


  



  /* LOOPING UNTUK MENYIMPAN DARI FORM KE DALAM ARRAY DALAM BENTUK BASIC KUADRAT*/
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = 'Matrix_'+iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
    for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
      var tempNameChoices = document.getElementById("choices-"+iChoicesLength).value;
      let arrayTempValueKuadrat = document.getElementById("matrix_"+iIndicatorLength+"-"+iChoicesLength).value;

      objIndicator['MatrixAll'].push({"Matrix":matrixName,"MatrixOf":tempNameIndicator,"Value":arrayTempValueKuadrat,"Choice":tempNameChoices});
      arrayIndicatorJSONData = JSON.stringify(objIndicator);
    };
  };
  /* LOOPING UNTUK MENYIMPAN DARI FORM KE DALAM ARRAY DALAM BENTUK BASIC KUADRAT*/
                                  /* END*/









  /* LOOPING UNTUK MENGHITUNG KUADRAT PEMBAGI*/
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = 'Matrix_'+iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
    let tempHitungKuadrat = 0;

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        let arrayTempValueKuadrat = Math.pow(objIndicator.MatrixAll[iMatrixAll].Value,2);
        tempHitungKuadrat = tempHitungKuadrat+arrayTempValueKuadrat;
      };
    };

    /*  PUSH TO NILAI KUADRAT BASIC   */
    objIndicator['nilaiKuadratBasic'].push({"Matrix":matrixName,"MatrixOf":tempNameIndicator,"Value":tempHitungKuadrat,"KuadratBasic":Math.sqrt(tempHitungKuadrat)});
    arrayIndicatorJSONData = JSON.stringify(objIndicator);
    /*console.log(Math.sqrt(tempHitungKuadrat));*/
  };
  /* LOOPING UNTUK MENGHITUNG KUADRAT PEMBAGI*/
                  /* END*/
  

  











          
  /* LOOPING UNTUK MENGHITUNG TERNORMALISASI*/       

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = 'Matrix_'+iIndicatorLength;
    let tempIndexIndicatorArry = iIndicatorLength-1;
    var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
    let tempHitungTernormalisasi = 0;

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        tempHitungTernormalisasi = objIndicator.MatrixAll[iMatrixAll].Value/objIndicator.nilaiKuadratBasic[tempIndexIndicatorArry].KuadratBasic;
        objIndicator['nilaiTernormalisasi'].push({"Matrix":objIndicator.MatrixAll[iMatrixAll].Choice,"MatrixOf":tempNameIndicator,"Value":tempHitungTernormalisasi});
        arrayIndicatorJSONData = JSON.stringify(objIndicator);
        /*console.log(tempHitungTernormalisasi);*/
      };
    };
  };

  /* LOOPING UNTUK MENGHITUNG TERNORMALISASI*/                
                    /* END*/


  
                
                    








  /* LOOPING UNTUK MENGHITUNG TERBOBOT*/         
  /* PADA BAGIAN INI HARUS DI *1 JIKA ITU PROFIT JIKA COST *-1 */


  
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
    var tempWeightIndicator = document.getElementById("indicator-weight-"+iIndicatorLength).value;
    var tempIfIndicator = document.getElementById("indicator-negatif-"+iIndicatorLength).checked;
    let tempHitungTernormalisasi = 0;

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.nilaiTernormalisasi[iMatrixAll].MatrixOf == tempNameIndicator) {
        if (tempIfIndicator == true) {
          tempHitungTernormalisasi = objIndicator.nilaiTernormalisasi[iMatrixAll].Value*tempWeightIndicator*-1;
          objIndicator['nilaiTerbobot'].push({"Choice":objIndicator.MatrixAll[iMatrixAll].Choice,"Indicator":tempNameIndicator,"Value":tempHitungTernormalisasi});
          arrayIndicatorJSONData = JSON.stringify(objIndicator);
          /*console.log(tempHitungTernormalisasi);*/
        } else {
          tempHitungTernormalisasi = objIndicator.nilaiTernormalisasi[iMatrixAll].Value*tempWeightIndicator*1;
          objIndicator['nilaiTerbobot'].push({"Choice":objIndicator.MatrixAll[iMatrixAll].Choice,"Indicator":tempNameIndicator,"Value":tempHitungTernormalisasi});
          arrayIndicatorJSONData = JSON.stringify(objIndicator);
          /*console.log(tempHitungTernormalisasi);*/
        };
      };
    };
  };

  /* LOOPING UNTUK MENGHITUNG TERBOBOT*/                
                    /* END*/









                    







  /* LOOPING UNTUK MENCARI NILAI MIN/MAX APLUS/ANEGATIF*/         

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
    var tempIfIndicator = document.getElementById("indicator-negatif-"+iIndicatorLength).checked;

    let tempPlusA = 0;
    let tempNegatifA = 0;
    var tempNameChoices = "";
    const tempArrayValueToSort = new Array();

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.nilaiTerbobot[iMatrixAll].Indicator == tempNameIndicator) {
        tempArrayValueToSort.push(objIndicator.nilaiTerbobot[iMatrixAll].Value);
        tempNameChoices = objIndicator.nilaiTerbobot[iMatrixAll].Choice;
      };
    };

    /*console.log(tempArrayValueToSort);*/

    if (tempIfIndicator == true) {
      tempPlusA = Math.min.apply(Math, tempArrayValueToSort);
      tempNegatifA = Math.max.apply(Math, tempArrayValueToSort);
    }else{
      tempPlusA = Math.max.apply(Math, tempArrayValueToSort);
      tempNegatifA = Math.min.apply(Math, tempArrayValueToSort);
    }

    objIndicator['maxMinPlusNegatifA'].push({"Choices":tempNameChoices,"MatrixOf":tempNameIndicator,"plusA":tempPlusA,"negatifA":tempNegatifA});
    arrayIndicatorJSONData = JSON.stringify(objIndicator);

  };


    /* LOOPING UNTUK MENCARI NILAI MIN/MAX APLUS/ANEGATIF*/                  
                    /* END*/



















    /* LOOPING UNTUK MENCARI NILAI D+/D-*/       

    for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
      var tempNameChoices = document.getElementById("choices-"+iChoicesLength).value;
      let tempHitungPlusD = 0;
      let tempHitungNegatifD = 0;

      for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
        var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
        
        for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
          if (objIndicator.nilaiTerbobot[iMatrixAll].Choice == tempNameChoices && objIndicator.nilaiTerbobot[iMatrixAll].Indicator == tempNameIndicator) {
            /*     MELAKUKAN PERHITUNGAN PLUSD      */
            let tempPlusD = objIndicator.maxMinPlusNegatifA[iIndicatorLength-1].plusA-objIndicator.nilaiTerbobot[iMatrixAll].Value;
            let tempKuadratplusD = Math.pow(tempPlusD, 2);
            tempHitungPlusD = tempHitungPlusD+tempKuadratplusD;


            /*     MELAKUKAN PERHITUNGAN NEGATIFD      */
            let tempNegatifD = objIndicator.maxMinPlusNegatifA[iIndicatorLength-1].negatifA-objIndicator.nilaiTerbobot[iMatrixAll].Value;
            let tempKuadratnegatifD = Math.pow(tempNegatifD, 2);
            tempHitungNegatifD = tempHitungNegatifD+tempKuadratnegatifD;
            
            /*    MENAMPILKAN HASIL DARI PENGURANGAN DAN NILAI ISI DARI maxMinPlusNegatifA.plusA DAN nilaiTerbobot.Value
            console.log(tempNameChoices+" - "+tempNameIndicator);
            console.log(objIndicator.maxMinPlusNegatifA[iIndicatorLength-1].plusA+" - "+objIndicator.nilaiTerbobot[iMatrixAll].Value);
            console.log(tempKuadratplusD);
            */
          };
        };
      };
      objIndicator['nilaiPlusNegatifD'].push({"Choice":tempNameChoices,"plusD":Math.sqrt(tempHitungPlusD), "negatifD":Math.sqrt(tempHitungNegatifD)});
      arrayIndicatorJSONData = JSON.stringify(objIndicator);
    };

    /* LOOPING UNTUK MENCARI NILAI D+/D-*/   
                /* END*/

















                /* LOOPING UNTUK MENCARI NILAI PREFERENSI UNTUK SETIAP ALTERNATIF*/   


                


                for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
                  let tempNilaiPreferensiAlternatif = objIndicator.nilaiPlusNegatifD[iChoicesLength-1].negatifD+objIndicator.nilaiPlusNegatifD[iChoicesLength-1].plusD;
                  let nilaiPreferensiAlternatif = objIndicator.nilaiPlusNegatifD[iChoicesLength-1].negatifD/tempNilaiPreferensiAlternatif;
                  objIndicator['nilaiPreferensiAlternatif'].push({"Choice":objIndicator.nilaiPlusNegatifD[iChoicesLength-1].Choice,"NilaiPreferensi":nilaiPreferensiAlternatif});
                  arrayIndicatorJSONData = JSON.stringify(objIndicator);
                };





                 /* LOOPING UNTUK MENCARI NILAI PREFERENSI UNTUK SETIAP ALTERNATIF*/   
                /* END*/

  

 


                console.log(objIndicator);









  /*var fs = require("fs");*/
  /*fs.writeFile ("./calculator/topsisDB.json", JSON.stringify(arrayIndicatorJSONData), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );*/


  var innerHTMLSimpleResultFirst = `<!-- POPUP RESULT -->
  <div class="container result_TOPSIS_container">
    <div class="row">
      <div class="col-12 header_result_close">
        <div class="row">
          <div class="col-10">
            <h4>TOPSIS ANALYSIS</h4>
          </div>
          <div class="col closebtn">
            <a href="javascript:void(0)" onclick="closeNav()">&times;</a>
          </div>
        </div>
      </div>
      <div class="col result_TOPSIS">
        <div role="alert" class="alert alert-success">
          Best Choice is <strong>`;
          var innerHTMLSimpleResultMiddle = `
          </div>
          <div role="alert" class="alert alert-warning">
          <ul class="list-group">`;
          var innerHTMLSimpleResultLast = `</ul>
          </div>
          <!--<button type="button" data-toggle="modal" data-target="#topsisFullResult" class="btn btn-info btn-lg btn-block" onclick="openFullResult()">Full Calculation Result <span class="oi oi-eye "></span></button>-->
          <a id="downloadJSON" onclick="exportJson(this);" type="button" data-toggle="modal" data-target="#topsisFullResult" class="btn btn-info btn-lg btn-block">Download File JSON <span class="oi oi-eye "></span></button></a>
        </div>
      </div>
    </div>`;






    var innerHTMLFullResultFirst = `<!-- POPUP RESULT -->
  <div class="container result_TOPSIS_container">
    <div class="row">
      <div class="col-12 header_result_close">
        <div class="row">
          <div class="col-10">
            <h4>TOPSIS FULL ANALYSIS</h4>
          </div>
          <div class="col closebtn">
            <a href="javascript:void(0)" onclick="closeFullResult()">&times;</a>
          </div>
        </div>
      </div>
      <div class="col result_TOPSIS">
        <div role="alert" class="alert alert-success">
          Best Choice is <strong>`;
          var innerHTMLFullResultMiddle = `
          </div>
          </div>
      </div>
    </div>
          `;


    for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
      let allChoicesValue = new Array();
      for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
        allChoicesValue.push(objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].NilaiPreferensi);
      };
      let bestChoiceValue = Math.max.apply(Math, allChoicesValue);

      if (bestChoiceValue == objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].NilaiPreferensi) {
        var bestChoiceName = objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].Choice;
        innerHTMLSimpleResultFirst += bestChoiceName+`</strong> With score <strong>`+bestChoiceValue+`</strong></br>`;
      };

      if (objIndicator.nilaiTernormalisasi[iChoicesLength-1].Value == 0.7071067811865475) {
        innerHTMLSimpleResultMiddle = innerHTMLSimpleResultMiddle;
      }else{
        innerHTMLSimpleResultMiddle += `<li class="list-group-item "><strong>`+objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].Choice+`</strong> With score <strong>`+objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].NilaiPreferensi+`</strong></li>`;
      };
      /*innerHTMLSimpleResultMiddle += `<li class="list-group-item "><strong>`+objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].Choice+`</strong> With score <strong>`+objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].NilaiPreferensi+`</strong></li>`;*/

    };


  document.getElementById("popup_result").innerHTML = innerHTMLSimpleResultFirst+innerHTMLSimpleResultMiddle+innerHTMLSimpleResultLast;
/*  document.getElementById("popup_full_result").innerHTML = ;*/
};













/* DOWNLOAD FILE JSON START*/

function exportJson(el) {
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrayIndicatorJSONData));
  // what to return in order to show download window?

  el.setAttribute("href", "data:"+data);
  el.setAttribute("download", "dataTOPSIS.json");    
}
  
  /*END DOWNLOAD FILE*/




function TOPSISMethod() {
    popup_result_TOPSIS()
    document.getElementById("popup_result").style.width = "100%";
};


function closeNav() {
  document.getElementById("popup_result").style.width = "0%";
  arrayIndicatorJSONData = '{"MatrixAll":[],"nilaiKuadratBasic":[],"nilaiTernormalisasi":[],"nilaiTerbobot":[],"maxMinPlusNegatifA":[],"nilaiPlusNegatifD":[],"nilaiPreferensiAlternatif":[]}';
};

function openFullResult() {
  popup_result_TOPSIS()
  document.getElementById("popup_full_result").style.width = "100%";
};


function closeFullResult() {
document.getElementById("popup_full_result").style.width = "0%";
};