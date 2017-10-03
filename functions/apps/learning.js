$(document).ready(function(){
	/* //function to check wether the user is logged in
	var login = localStorage.loggedIn;
	if(!login){
		window.location.href= "../login.html";
	}*/
	//thsi will get the typeId from URL
	var globalTypeId = getUrlVars()["typeId"];
	console.log("the type ID is: "+globalTypeId);
	console.log("Jquery Loaded");
	//checkInitiate();

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
		/***********************************************/
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
				  	
				});//success message after submit
		}else{
			
		}
	});
}


//function to save KRA with validation
function validateLearning(){
	var empObject = JSON.parse(localStorage.empObject);
	var empId = localStorage.empId;

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
		/***********************************************/
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

	/*
	setLearning(learningArray,function(status){
  		if(status){
  			console.log("Learning submitted success.");
			swal("Success!", "Your Learning was submitted.", "success");//success message after submit
			$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
			$("#submits").hide();
			//$("#status").html('KRAs submitted sucessfully on  Pending for your Supervisor review');
  		}else{

  		}
  	});
	*/
	
	//Condition to check
	
}