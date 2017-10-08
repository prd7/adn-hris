$(document).ready(function(){
	/* //function to check wether the user is logged in
	var login = localStorage.loggedIn;
	if(!login){
		window.location.href= "../index.html";
	}*/
	var globalTypeId = getUrlVars()["typeId"];
	var globalEmpId = getUrlVars()["empId"];
	if(globalEmpId){
		var empId = globalEmpId;
	}else{
		alert("Please go back to Approvals");
	}
	console.log("Jquery Loaded");
	//checkInitiate();

	fetchLearning(empId,globalTypeId,function(status,data){
		if(status){
			console.log("Valid entry in Learning Table for "+empId+" and typeId is "+globalTypeId);
			//var version = data.get("version");
			//this part will consist of if condition to check what stage and status the learning is in
			var stage = data.get("stage");
			var learningValue = data.get("learningValue");
			var learningValuelength = (data.get("learningValue")).length;
			console.log("The Learning Is in "+stage+" stage.");

			if(stage=="posted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				//$("#submits").hide()
				//$("#status").html('Learning agenda submitted sucessfully for your Supervisor\'s review');

				for(i=0;i<learningValuelength;i++){
					var index = i+1;
					$("#selDevArea"+index).val(learningValue[i].developmentArea);
					$('#txtDevPlan'+index).text(learningValue[i].developmentPlan);
					$('#txtMos'+index).text(learningValue[i].learningMos);
					$('#txtTimeline'+index).text(learningValue[i].supportRequired);
					$('#txtSupportReq'+index).text(learningValue[i].timeline);
				}
				console.log(data.get("learningValue"));
			}else if(stage=="accepted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide()
				var supervisorData = data.get("supervisorData");
				//supervisorData[0].supervisorInput;
				console.log(supervisorData);
				for(i=0;i<learningValuelength;i++){
					var index = i+1;
					$("#selDevArea"+index).val(learningValue[i].developmentArea);
					$('#txtDevPlan'+index).text(learningValue[i].developmentPlan);
					$('#txtMos'+index).text(learningValue[i].learningMos);
					$('#txtTimeline'+index).text(learningValue[i].supportRequired);
					$('#txtSupportReq'+index).text(learningValue[i].timeline);
				}
				$("#managerCommentLearning").attr("disabled", true);
				$("#managerCommentLearning").val(supervisorData[0].supervisorInput);
			}else{
				swal({
					  title: "No record of Learning for this employee.",
					  text: "If expected,contact HR or Supervisor.",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonClass: "btn-warning",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
					  	window.location.href= "../home.html";	
				});
			}
		}
	});



	$("#approveLearning").click(function(){
		var supervisorInput = $("#managerCommentLearning").val();
		console.log(supervisorInput);

		reviewLearning(globalEmpId,localStorage.empId,supervisorInput,globalTypeId,true,function(status){
			
			resetInputTable(globalTypeId, 'accepted', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Inpupts table reset for "+globalEmpId);
			});
			resetApprovalTable(globalTypeId, 'accepted', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Approval table reset for "+globalEmpId);
			});
/*
			var notiType= "Learning";
			var notiTitle= "Learning agenda approved.";
			var notiBody= "Learning agenda approved by "+empObject.name;
			var notiReceipent= globalEmpId;
			sendNoti(localStorage.empId,notiType,notiTitle,notiBody,notiReceipent);
*/
			swal({
					  title: "Learning Approved!",
					  text: " You successfully approved the Learning.",
					  type: "success",
					  showCancelButton: false,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
						console.log("Came in Swal");
						window.location = window.location;
			});
		});
	});
	$("sendBackLearning").click(function(){
		var supervisorInput = $("#managerCommentLearning").val();
		console.log(supervisorInput);

		reviewLearning(globalEmpId,localStorage.empId,supervisorInput,globalTypeId,false,function(status){
			resetInputTable(globalTypeId, 'rejected', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Inpupts table reset for "+globalEmpId);
			});
			resetApprovalTable(globalTypeId, 'rejected', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Approval table reset for "+globalEmpId);
			});
/*
			var notiType= "Learning";
			var notiTitle= "Learning agenda sent back.";
			var notiBody= "Learning agenda sent back by "+empObject.name;
			var notiReceipent= globalEmpId;
			sendNoti(localStorage.empId,notiType,notiTitle,notiBody,notiReceipent);
*/
			swal({
					  title: "Learning Rejected!",
					  text: "You successfully rejected the Learning Agenda.",
					  type: "danger",
					  showCancelButton: false,
					  confirmButtonClass: "btn-danger",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
						console.log("Came in Swal");
						window.location = window.location;
			});
		});
	});
	
});