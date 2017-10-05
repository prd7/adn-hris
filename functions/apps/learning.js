$(document).ready(function(){
	/* //function to check wether the user is logged in
	var login = localStorage.loggedIn;
	if(!login){
		window.location.href= "../login.html";
	}*/
	var globalTypeId = getUrlVars()["typeId"];
	var empId=localStorage.empId;
	console.log("Jquery Loaded");

	fetchLearning(empId,globalTypeId,function(status,data){
		if(status){
			console.log("Valid Learning");
			//var version = data.get("version");
			//this part will consist of if condition to check what stage and status the learning is in
			var stage = data.get("stage");
			var learningValue = data.get("learningValue");
			var learningValuelength = (data.get("learningValue")).length;
			console.log(stage);

			if(stage=="posted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide()

				for(i=0;i<learningValuelength;i++){
					var index = i+1;
					$("#selDevArea"+index).val(learningValue[i].developmentArea);
					$('#txtDevPlan'+index).text(learningValue[i].developmentPlan);
					$('#txtMos'+index).text(learningValue[i].learningMos);
					$('#txtTimeline'+index).text(learningValue[i].supportRequired);
					$('#txtSupportReq'+index).text(learningValue[i].timeline);
				}
				//populate the table from here

			console.log(data.get("learningValue"));
			}else{
				swal({
					  title: "No Learning Agenda was Initiated for you!",
					  text: "If expected,contact your HR or Supervisor.",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonClass: "btn-warning",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
					  	//window.location.href= "../index.html";	
				});
			}
		}
	});

	$("#submitFormLearning").click(function(){
		validateLearning();
	});
	$("#saveDraftLearning").click(function(){
		validateLearningDraft();
	});
});

//function to save Learning as a draft
function validateLearningDraft(){
	var empObject = JSON.parse(localStorage.empObject);
	var empId = localStorage.empId;
	var globalTypeId = getUrlVars()["typeId"];

	console.log("This is for draft Learning of "+empId);
	var rowLength = 7;
	var learningArray = new Array();
	for(i=0;i<rowLength;i++){
		var index = i+1;
		var obj = new Object();
		var learningDevArea = "#selDevArea"+index;
		var learningDevPlan = "#txtDevPlan"+index;
		var learningMeasureofSuccess = "#txtMos"+index;
		var learningTimeline = "#txtTimeline"+index;
		var learningSupportRequired = "#txtSupportReq"+index;
		obj.learningDevArea = $(learningDevArea).find(":selected").val();
		obj.learningDevPlan =$(learningDevPlan).val();
		obj.learningMeasureofSuccess =$(learningMeasureofSuccess).val();
		obj.learningTimeline =$(learningTimeline).val();
		obj.learningSupportRequired =$(learningSupportRequired).val();
		if(obj.learningDevArea && obj.learningDevPlan && obj.learningMeasureofSuccess && obj.learningTimeline && obj.learningSupportRequired){
			obj.complete = true;	
		}else{
			obj.complete = false;
		}
		learningArray.push(obj);
	}
	console.log(learningArray);
	setLearningDraft(learningArray,globalTypeId,function(status){
		if(status){
			swal({
				  title: "Your Learning Agenda was saved as Draft.",
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
				});
		}else{
			
		}
	});
}


//function to save Learning with validation
function validateLearning(){
	var globalTypeId = getUrlVars()["typeId"];
	var empObject = JSON.parse(localStorage.empObject);
	var empId = localStorage.empId;

	console.log("This is for Learning of "+empId);
	var rowLength = 7;
	var learningArray = new Array();
	for(i=0;i<rowLength;i++){
		var index = i+1;
		var obj = new Object();
		var learningDevArea = "#selDevArea"+index;
		var learningDevPlan = "#txtDevPlan"+index;
		var learningMeasureofSuccess = "#txtMos"+index;
		var learningTimeline = "#txtTimeline"+index;
		var learningSupportRequired = "#txtSupportReq"+index;
		obj.learningDevArea = $(learningDevArea).find(":selected").val();
		obj.learningDevPlan =$(learningDevPlan).val();
		obj.learningMeasureofSuccess =$(learningMeasureofSuccess).val();
		obj.learningTimeline =$(learningTimeline).val();
		obj.learningSupportRequired =$(learningSupportRequired).val();
		if(obj.learningDevArea && obj.learningDevPlan && obj.learningMeasureofSuccess && obj.learningTimeline && obj.learningSupportRequired){
			obj.complete = true;	
		}else{
			obj.complete = false;
		}
		learningArray.push(obj);
	}
	console.log(learningArray);

	setLearning(learningArray,globalTypeId,function(status){
  		if(status){
  			console.log("Learning submitted successfull.");
			$("#sample_3 :input").attr("disabled", true);//disables the table after submitting LEarning
			$("#submits").hide();
			//$("#status").html('Learning submitted sucessfully on  Pending for your Supervisor review');
  		}else{
  			swal("Error!", "Your Learning was not submitted.", "wawrning");
  		}
  	});
	//Condition to check
}