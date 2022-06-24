/*const elementChoicesValue = new Array();
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
var fs = require("fs");

  
  /* MELAKUKAN PERHITUNGAN DENGAN LOOPING */
  /* NILAI PEMBAGI (KUADRAT) */
  var arrayIndicatorJSONData = '{"Matrix":[{"Matrix_":"0","value":"0"}]}';
  const arrayValue = new Array();
  const indicatorNameArrayLength = document.getElementsByClassName("indicator-name").length;
  const choicesArrayLength = document.getElementsByClassName("choices").length;

  for (let iLoopIndicator = 1; iLoopIndicator <= indicatorNameArrayLength; iLoopIndicator++) {
    var matrixName = "Matrix_"+iLoopIndicator;
    for (let iLoopChoices = 1; iLoopChoices <= choicesArrayLength; iLoopChoices++) {
      arrayValue[iLoopIndicator] = document.getElementById("matrix_"+iLoopIndicator+"-"+iLoopChoices).value;
      /*console.log(arrayValue[iLoopIndicator]);*/
      
      
      var obj = JSON.parse(arrayIndicatorJSONData);
      obj['Matrix'].push({"Matrix_":iLoopIndicator,"value":arrayValue[iLoopIndicator]});
      arrayIndicatorJSONData = JSON.stringify(obj);

    };
  };

  console.log(arrayIndicatorJSONData);



  /* DOWNLOAD FILE JSON START
  let dataStr = JSON.stringify(arrayIndicatorJSONData);
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  
  let exportFileDefaultName = 'topsisDB.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  END DOWNLOAD FILE*/

  fs.writeFile ("./calculator/topsisDB.json", JSON.stringify(arrayIndicatorJSONData), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );


  
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
}

function TOPSISMethod() {
    popup_result_TOPSIS()
    document.getElementById("popup_result").style.width = "100%";
}


function closeNav() {
  document.getElementById("popup_result").style.width = "0%";
}