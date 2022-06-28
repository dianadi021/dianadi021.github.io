/*
const elementChoicesValue = new Array();
const choicesArrayLength = document.getElementsByClassName("choices").length;
const elementIndicatorNameValue = new Array();
const indicatorNameArrayLength = document.getElementsByClassName("indicator-name").length;


const indicatorNegatifValue = new Array();
const indicatorNegatifArrayLength = document.getElementsByClassName("indicator-negatif").length;
const indicatorWeightValue = new Array();
const indicatorWeightArrayLength = document.getElementsByClassName("indicator-weight").length;
const indicatorQualitativeValue = new Array();
const indicatorQualitativeArrayLength = document.getElementsByClassName("indicator-qualitative").length;
*/



















/* MENAMPILKAN HASIL PERHITUNGAN */

function popup_result_TOPSIS() {
  


  var arrayIndicatorJSONData = '{"MatrixAll":[],"nilaiKuadratBasic":[],"nilaiTernormalisasi":[]}';
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









  /* LOOPING UNTUK MENGHITUNG KUADRAT PEMBAGI*/
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = 'Matrix_'+iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
    let tempHitungKuadrat = 0;
    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        let arrayTempValueKuadrat = objIndicator.MatrixAll[iMatrixAll].Value*objIndicator.MatrixAll[iMatrixAll].Value;
        tempHitungKuadrat = tempHitungKuadrat+arrayTempValueKuadrat;
      };
    };
    objIndicator['nilaiKuadratBasic'].push({"Matrix":matrixName,"MatrixOf":tempNameIndicator,"Value":tempHitungKuadrat,"KuadratBasic":Math.sqrt(tempHitungKuadrat)});
    arrayIndicatorJSONData = JSON.stringify(objIndicator);
    /*console.log(Math.sqrt(tempHitungKuadrat));*/
  };
  /* LOOPING UNTUK MENGHITUNG KUADRAT PEMBAGI*/
                  /* END*/
  

  











          
  /* LOOPING UNTUK MENGHITUNG TERNORMALISASI*/                


  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = 'Matrix_'+iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-"+iIndicatorLength).value;
    let tempHitungTernormalisasi = 0;
    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        tempHitungTernormalisasi = objIndicator.MatrixAll[iMatrixAll].Value/objIndicator.nilaiKuadratBasic[iIndicatorLength-1].KuadratBasic;
        objIndicator['nilaiTernormalisasi'].push({"Matrix":matrixName,"MatrixOf":tempNameIndicator,"Value":tempHitungTernormalisasi});
        arrayIndicatorJSONData = JSON.stringify(objIndicator);
        /*console.log(tempHitungTernormalisasi);*/
      };
    };
  };


  /* LOOPING UNTUK MENGHITUNG TERNORMALISASI*/                
                    /* END*/


  
                
                    








  /* LOOPING UNTUK MENGHITUNG TERBOBOT*/                


  



  /* LOOPING UNTUK MENGHITUNG TERBOBOT*/                
                    /* END*/


  /*console.log(objIndicator);*/

 


  




  





  



  /* DOWNLOAD FILE JSON START
  let dataStr = JSON.stringify(arrayIndicatorJSONData);
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  
  let exportFileDefaultName = 'topsisDB.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  END DOWNLOAD FILE*/






  /*var fs = require("fs");*/
  /*fs.writeFile ("./calculator/topsisDB.json", JSON.stringify(arrayIndicatorJSONData), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );*/


  
  document.getElementById("popup_result").innerHTML = `
  <!-- POPUP RESULT -->
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
              Best Choice is <strong></strong>
            </div>
            <div role="alert" class="alert alert-warning">
            <ul class="list-group">
            </ul>
            </div>
            <button type="button" data-toggle="modal" data-target="#topsisFullResult" class="btn btn-info btn-lg btn-block ">Full Calculation Result <span class="oi oi-eye "></span></button>
          </div>
        </div>
      </div>
  `;
};






function TOPSISMethod() {
    popup_result_TOPSIS()
    document.getElementById("popup_result").style.width = "100%";
};


function closeNav() {
  document.getElementById("popup_result").style.width = "0%";
};