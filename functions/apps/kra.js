$(document).ready(function(){
	/* //function to check wether the user is logged in
	var login = localStorage.loggedIn;
	if(!login){
		window.location.href= "../index.html";
	}*/
	var globalTypeId = getUrlVars()["typeId"];
	var empId=localStorage.empId;
	console.log("Jquery Loaded");

	//function to check and fetch values for a KRA
	fetchKra(empId,globalTypeId,function(status,data){
		if(status){
			console.log("Valid entry in kra table");

			//var version = data.get("version");
			var stage = data.get("stage");
			var kraValue = data.get("kraValue");
			var kraValuelength = (data.get("kraValue")).length;
			console.log(stage);
			console.log(kraValue);

			if(stage=="posted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide()
				$("#status").html('Your KRA was submitted for review.');

				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).val(kraValue[i].kraCat);
					$("#selkrawght"+index).val(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}

			}else if(stage=="rejected"){
				//swal('KRA was sent back by your Supervisor.');
				$("#status").html('KRA was sent back by your Supervisor.');
				$("#timeline").attr("hidden",false);

				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).val(kraValue[i].kraCat);
					$("#selkrawght"+index).val(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}
				
				//show the timeline here
				var supervisorData = data.get("supervisorData");
				console.log(supervisorData);
				for( var i = 0; i < supervisorData.length; i++ )
	        	{
					//console.log(supervisorData[i].supervisorInputDate);
					var timelineItem = '<div class="timeline-item">'+
					'	<div class="timeline-badge">'+
					'		<img class="timeline-badge-userpic" src="../assets/pages/media/users/avatar80_2.jpg">'+
					'	</div>'+
					'	<div class="timeline-body">'+
					'		<div class="timeline-body-arrow"></div>'+
					'		<div class="timeline-body-head">'+
					'			<div class="timeline-body-head-caption"> <a href="javascript:;" class="timeline-body-title font-blue-madison">Supervisor Imran '+supervisorData[i].supervisorId+'</a>'+
					'				<span class="timeline-body-time font-grey-cascade">Sent Back KRA at '+supervisorData[i].supervisorInputDate+'</span>'+
					'			</div>'+
					'			<div class="timeline-body-head-actions">'+
					'				<div class="btn-group dropup">'+
					'					<button class="btn red btn-sm" type="button">Sent Back</button>'+
					'				</div>'+
					'			</div>'+
					'		</div>'+
					'		<div class="timeline-body-content"> <span class="font-grey-cascade"> '+supervisorData[i].supervisorInput+' </span>'+
					'		</div>'+
					'	</div>'+
					'</div>';
				
					$("#timeline").append(timelineItem);	
				}

			}else if(stage=="accepted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide()
				$("#status").html('Your KRAs were approved by your Supervisor.');

				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).val(kraValue[i].kraCat);
					$("#selkrawght"+index).val(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}
			}
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
					  	window.location.href= "inputRequests.html";	
				});
			}
	});

	
	$("#submitForm").click(function(){
		validateKra();
	});
	$("#saveDraft").click(function(){
		validateKraDraft();
	});
});

//function to save KRA as a draft
function validateKraDraft(){
	var globalTypeId = getUrlVars()["typeId"];
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
	setKRADraft(kraArray,globalTypeId,function(status){
		if(status){
			swal({
				  title: "Your KRA was saved as Draft.",
				  text: "Please access your drafts from the sidemenu.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: false
				},
				function(){
					console.log("Came in Swal to redirect");
				  	window.location.href= "../pages/drafts.html";	
				  	
				});//success message after submit
		}else{
			
		}
	});
}

//function to save KRA with validation
function validateKra(){
	var globalTypeId = getUrlVars()["typeId"];
	var empObject = JSON.parse(localStorage.empObject);
	var empId = localStorage.empId;
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
	
	//Condition to check
	if(checkWeight(kraArray) == 100){
		if(grade == 'A' || grade == 'B'){
			if(numberOfCategories(kraArray) <5){
				console.log("Proceed with exception for grade 5");
				proceedWarn(kraArray);
			}else{
				console.log("Proceed with clear 5");
				setKRA(kraArray,globalTypeId,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success"); //success alert
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
							$("#submits").hide()//disables the table after submitting KRA
							$("#status").html('Your KRA was submitted for review.');
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
				setKRA(kraArray,globalTypeId,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success");//success alert
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
							$("#status").html('Your KRA was submitted for review.');
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
				setKRA(kraArray,globalTypeId,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success");//success alert
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
							$("#status").html('Your KRA was submitted for review.');
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
				  	setKRA(kraArray,globalTypeId,function(status){
				  		if(status){
				  			console.log("kra submitted success.");
							swal("Success!", "Your KRA was submitted.", "success");//success message after submit
							$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
							$("#submits").hide();
							$("#status").html('Your KRA was submitted for review.');
				  		}else{

				  		}
				  	});
				});
}

