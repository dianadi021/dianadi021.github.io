/*const val = document.getElementById("choices-1").value;
alert(val);*/
const elementChoicesValue = [];
const choicesArray = document.getElementsByClassName("choices").length;
const elementIndicatorNameValue = [];
const indicatorNameArray = document.getElementsByClassName("indicator-name").length;

const indicatorNegatifArrayLength = document.getElementsByClassName("indicator-negatif").length;
const indicatorWeightArrayLength = document.getElementsByClassName("indicator-weight").length;
const indicatorQualitativeArrayLength = document.getElementsByClassName("indicator-qualitative").length;

function popup_result_TOPSIS() {
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
            <div role="alert" class="alert alert-warning"><ul class="list-group"></ul></div>
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