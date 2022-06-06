var choice=3;
var indicator=3;

$(document).ready(function(){  
    $('#add-choice').click(function(){
       if (choice>7) {
         alert("Mohon maaf, maksimal input hanya 7")
       } else {
        $('#choice_field').append(`<tr id='choice-`+choice+`'><th scope='row'>`+choice+`</th><td>
        <input type='text' class='form-control'  id='choices-`+choice+`'>
      </td></tr>`);
      choice++;
        if (choice>2) {
          document.getElementById("remove-choice").removeAttribute("disabled");
          if (choice==8) {
            document.getElementById("add-choice").setAttribute("disabled", "disabled");
          }
        }
       }
  });  

  $('#remove-choice').click(function(){
    if (choice!=1) {
      choice--;
      document.getElementById("choice_field").deleteRow(choice);
    }
    if (choice==3) {
      document.getElementById("remove-choice").setAttribute("disabled", "disabled"); 
      document.getElementById("add-choice").removeAttribute("disabled");
    }
  });

  $('#add-indicator').click(function(){
    if (indicator>7) {
      alert("Mohon maaf, maksimal input hanya 7")
    } else {
     $('#indicator_field').append(`<tr id='indicator-`+indicator+`'><th scope='row'>`+indicator+`</th><td>
     <input type="text" class="form-control" id="indicator-name-`+indicator+`"></td><td>
     <input type="checkbox" id="indicator-negatif-`+indicator+`"></td> <td>
     <input type="number" class="form-control" id="indicator-weight-`+indicator+`"></td> <td>
      <input type="checkbox" id="indicator-qualitative-`+indicator+`"></td></tr>`);
   indicator++;
     if (indicator>2) {
       document.getElementById("remove-indicator").removeAttribute("disabled");
       if (indicator==8) {
         document.getElementById("add-indicator").setAttribute("disabled", "disabled");
       }
     }
    }
});  

$('#remove-indicator').click(function(){
 if (indicator!=1) {
  indicator--;
   document.getElementById("indicator_field").deleteRow(indicator);
 }
 if (indicator==3) {
   document.getElementById("remove-indicator").setAttribute("disabled", "disabled"); 
   document.getElementById("add-indicator").removeAttribute("disabled");
 }
});

  $('#topsisResultModal').click(function(){            
       $.ajax({  
            url:"name.php",  
            method:"POST",  
            data:$('#add_name').serialize(),  
            success:function(data)  
            {  
                 alert(data);  
                 $('#add_name')[0].reset();  
            }  
       });  
  });  
});