$(document).ready(function(){

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
			$("#empName").html(data.get("empName"));
			$("#empSubmitTime").html(dateTimeString(data.get('endDate')));
			
			var stage = data.get("stage");
			var learningValue = data.get("learningValue");
			var learningValuelength = (data.get("learningValue")).length;
			console.log("The Learning Is in "+stage+" stage.");

			if(stage=="posted"){
				//$("#status").html('Learning agenda submitted sucessfully for your Supervisor\'s review');
				$("#empSubmitTime").html(dateTimeString(data.get('endDate')));


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
				$("#submitsLearningApproval").hide()
				$("#empSubmitTime").html(dateTimeString(data.get('endDate')));
				$("#smallStatus").html("Learning Agenda Approved");


				var supervisorData = data.get("supervisorData");
				//console.log(supervisorData);
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
					  	//window.location.href= "../approvals.html";	
				});
			}
		}
	});



	$("#approveLearning").click(function(){
		var supervisorInput = $("#managerCommentLearning").val();
		console.log(supervisorInput);
		
		reviewLearning(globalEmpId,localStorage.empId,empObject.name,supervisorInput,globalTypeId,true,function(status){
			
			resetInputTable(globalTypeId, 'accepted', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Inpupts table reset for "+globalEmpId);
			});
			resetApprovalTable(globalTypeId, 'accepted', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Approval table reset for "+globalEmpId);
			});

			//send notification to Supervisor
            var senderId = localStorage.empId;
            var notiType= "Learning";
            var notiTitle= "Learning agenda approved.";
            var notiBody= "Your Learning agenda has been approved by "+empObject.name+".";
            var notiLink= "approved";
            var notiReceipent= globalEmpId;
            sendNoti(senderId,notiType,notiTitle,notiBody,notiLink,notiReceipent);

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

	$("#sendBack").click(function(){
		var supervisorInput = $("#managerCommentLearning").val();
		//console.log(supervisorInput);

		reviewLearning(globalEmpId,localStorage.empId,empObject.name,supervisorInput,globalTypeId,false,function(status){
			resetInputTable(globalTypeId, 'rejected', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Inpupts table reset for "+globalEmpId);
			});
			resetApprovalTable(globalTypeId, 'rejected', function(){
		  		//window.location.href= "controlPanel.html";
		  		console.log("Approval table reset for "+globalEmpId);
			});

			//send notification to Supervisor
            var senderId = localStorage.empId;
            var notiType= "Learning";
            var notiTitle= "Learning agenda sent back.";
            var notiBody= "Learning agenda sent back by "+empObject.name;
            var notiLink= "approved";
            var notiReceipent= globalEmpId;
            sendNoti(senderId,notiType,notiTitle,notiBody,notiLink,notiReceipent);

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