$(document).ready(function(){
	/* //function to check wether the user is logged in
	var login = localStorage.loggedIn;
	if(!login){
		window.location.href= "../login.html";
	}*/
	console.log("Jquery Loaded");
	checkInitiate();
	
	$("#submitForm").click(function(){
		validateKra();
	});
	$("#saveDraft").click(function(){
		validateKraDraft();
	});
});

function checkInitiate(){
	console.log("Checking wether KRA was initaite");
	var empId=localStorage.empId;
	checkKra(empId,function(status){
		if(status){
			console.log("valid kra");
		}else{
			swal({
				  title: "No KRA was Initiated for you!",
				  text: "If expected,contact your HR or Supervisor.",
				  type: "warning",
				  showCancelButton: false,
				  confirmButtonClass: "btn-warning",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					//console.log("");
				  	window.location.href= "../index.html";	
			});
		}
	});
}


function validateKraDraft(){
	var empObject = JSON.parse(localStorage.empObject);
	var grade = empObject.employeeGrade;
	console.log("This is for draft Grade of Current employee is= "+grade);
	var rowLength = 7;
	var kraArray = new Array();
	for(i=0;i<rowLength;i++){
		var index = i+1;
		var obj = new Object();
		var kraId = "#txtkra"+index;
		var kraCategory = "#selkracat"+index;
		var kraWeight = "#selkrawght"+index;
		var kraUnitSuccess = "#txtuos"+index;
		var kraMeasureSuccess = "#txtmos"+index;
		obj.kra = $(kraId).val();
		obj.kraCategory =$(kraCategory).find(":selected").val();
		obj.kraWeight =parseInt($(kraWeight).find(":selected").val());
		obj.kraUnitSuccess =$(kraUnitSuccess).val();
		obj.kraMeasureSuccess =$(kraMeasureSuccess).val();
		if(obj.kra && obj.kraCategory && obj.kraUnitSuccess && obj.kraWeight != "0" && obj.kraMeasureSuccess){
			obj.complete = true;	
		}else{
			obj.complete = false;
		}
		kraArray.push(obj);
	}
	console.log(kraArray);
	setKRADraft(kraArray,function(status){
		if(status){
			swal("Success!", "Your KRA was saved as Draft.", "success");//success message after submit
		}else{
			
		}
	});
}

function validateKra(){
	var empObject = JSON.parse(localStorage.empObject);
	var grade = empObject.employeeGrade;
	console.log("Grade of Current employee is="+grade);
	var rowLength = 7;
	var kraArray = new Array();
	for(i=0;i<rowLength;i++){
		var index = i+1;
		var obj = new Object();
		var kraId = "#txtkra"+index;
		var kraCategory = "#selkracat"+index;
		var kraWeight = "#selkrawght"+index;
		var kraUnitSuccess = "#txtuos"+index;
		var kraMeasureSuccess = "#txtmos"+index;
		obj.kra = $(kraId).val();
		obj.kraCategory =$(kraCategory).find(":selected").val();
		obj.kraWeight =parseInt($(kraWeight).find(":selected").val());
		obj.kraUnitSuccess =$(kraUnitSuccess).val();
		obj.kraMeasureSuccess =$(kraMeasureSuccess).val();
		if(obj.kra && obj.kraCategory && obj.kraUnitSuccess && obj.kraWeight != "0" && obj.kraMeasureSuccess){
			obj.complete = true;	
		}else{
			obj.complete = false;
		}
		
		kraArray.push(obj);
	}
	console.log(kraArray);
	console.log("Categories being covered in this submission are: "+ numberOfCategories(kraArray));
	console.log("Weight sum in this submission is: "+ checkWeight(kraArray));
	
	//Condition to check
	if(checkWeight(kraArray) == 100){
		if(grade == 'A' || grade == 'B'){
			if(numberOfCategories(kraArray) <5){
				console.log("Proceed with exception for grade 5");
				proceedWarn(kraArray);
			}else{
				console.log("Proceed with clear 5");
				setKRA(kraArray,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success"); //success alert
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
							$("#submits").hide()//disables the table after submitting KRA
							//$("#status").html('KRAs submitted sucessfully on  Pending for your Supervisor review');
				  		}else{
				  			
				  		}
				  	});
			}
		}else if(grade == 'C' || grade == 'D' || grade == 'E' || grade == 'F' || grade == 'G' ){
			if(numberOfCategories(kraArray) <3){
				console.log("Proceed with exception for grade 3");
				proceedWarn(kraArray);
			}else{
				console.log("Proceed with clear 3");
				setKRA(kraArray,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success");//success alert
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				  		}else{
				  			
				  		}
				  	});
			}
		}else if(grade == 'H' || grade == 'I' || grade == 'J' || grade == 'K' || grade == 'L' ){
			if(numberOfCategories(kraArray) <2){
				console.log("Proceed with exception for grade 2");
				proceedWarn(kraArray);
			}else{
				console.log("Proceed with clear 2");
				setKRA(kraArray,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success");//success alert
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				  		}else{
				  			
				  		}
				  	});
			}
		}
		else{
			console.log("This person does not have KRA or Appraisal Process");
			swal("Error!", "This person does not have Appraisal Process", "danger")
		}
	}else if(checkWeight(kraArray) < 100){
		if(numberOfCategories(kraArray)==0){
			swal("Error!", "Please submit a valid KRA entry!", "warning")
		}else{
			swal("Error!", "Kra weightage is less than 100!", "warning")
		}
		//alert("Less than 100");
	}else{
		swal("Error!", "Kra weightage is more than 100!", "warning")
		//alert("Greater than 100");
	}
}
//function to check number of categories
function numberOfCategories(kraArray){
	var number = 0;
	var kraCat = new Array();
	for(i=0;i<kraArray.length;i++){
		if(kraArray[i].kraCategory){
			if(kraCat.indexOf(kraArray[i].kraCategory) < 0 && kraArray[i].complete){
				kraCat.push(kraArray[i].kraCategory);
			}
		}
	}
	return kraCat.length;
}
//function to check weightage sum
function checkWeight(kraArray){
	var sum_weight = 0;
	for(i=0;i<kraArray.length;i++){
		if(kraArray[i].complete){
			sum_weight = sum_weight + kraArray[i].kraWeight;
		}
	}
	return sum_weight;
}

function proceedWarn(kraArray){
	swal({
				  title: "Do you want to proceed as exception?",
				  text: "Minimum number of KRA categories for your Grade was not covered.",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Ok",
				  closeOnConfirm: false
				},
				function(){
					console.log("Came in Swal of proceedWarn");
				  	//window.location.href= "../pages/kra_wizard.html";	
				  	setKRA(kraArray,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success");//success message after submit
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
							$("#submits").hide();
							//$("#status").html('KRAs submitted sucessfully on  Pending for your Supervisor review');
				  		}else{

				  		}
				  	});
				});
}

