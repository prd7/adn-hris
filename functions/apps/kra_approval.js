$(document).ready(function(){
	
	var globalTypeId = getUrlVars()["typeId"];
	var globalEmpId = getUrlVars()["empId"];
	if(globalEmpId){
		var empId = globalEmpId;
	}else{
		swal("Please go back to Approvals");
	}
	console.log("Jquery Loaded");
	//checkInitiate();

	fetchKra(empId,globalTypeId,function(status,data){
		if(status){
			console.log("Valid entry in kra table");
			$("#empName").html(data.get("empName"));
			$("#empSubmitTime").html(dateTimeString(data.get('endDate')));

			var stage = data.get("stage");
			var kraValue = data.get("kraValue");
			var kraValuelength = (data.get("kraValue")).length;
			//console.log(stage);
			//console.log(kraValue);

				
			if(stage=="posted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				//$("#submits").hide()
				//$("#status").html('Your KRA was submitted for review.');
				$("#empSubmitTime").html(dateTimeString(data.get('endDate')));

				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).val(kraValue[i].kraCat);
					$("#selkrawght"+index).val(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}
			}else if(stage=="accepted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide()
				$("#empSubmitTime").html(dateTimeString(data.get('endDate')));
				$("#smallStatus").html("Learning Agenda Approved");

				var supervisorData = data.get("supervisorData");
				//console.log(supervisorData);
				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).val(kraValue[i].kraCat);
					$("#selkrawght"+index).val(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}
				$("#managerComment").attr("disabled", true);
				$("#managerComment").val(supervisorData[0].supervisorInput);
			}else if(stage=="rejected"){
				console.log(stage);
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide()
				$("#smallStatus").html("Learning Agenda Rejected");

				var supervisorData = data.get("supervisorData");
				//supervisorData[0].supervisorInput;
				console.log(supervisorData);
				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).val(kraValue[i].kraCat);
					$("#selkrawght"+index).val(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}
				$("#managerComment").attr("disabled", true);
				$("#managerComment").val(supervisorData[0].supervisorInput);
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
				  	window.location.href= "approvals.html";	
			});
		}
	});

	$("#approveKra").click(function(){
		var supervisorInput = $("#managerComment").val();

		reviewKRA(globalEmpId,localStorage.empId,empObject.name,supervisorInput,globalTypeId,true,function(status){
			
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
            var notiType= "KRA";
            var notiTitle= "KRA approved.";
            var notiBody= "Your KRA has been approved by "+empObject.name+".";
            var notiLink= "approved";
            var notiReceipent= globalEmpId;
            sendNoti(senderId,notiType,notiTitle,notiBody,notiLink,notiReceipent);

			swal({
					  title: "Kra Approved!",
					  text: " You successfully approved the KRA.",
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
	$("#sendBackKra").click(function(){
		var supervisorInput = $("#managerComment").val();
		reviewKRA(globalEmpId,localStorage.empId,empObject.name,supervisorInput,globalTypeId,false,function(status){
			console.log("sent back");
			
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
            var notiType= "KRA";
            var notiTitle= "KRA Rejected.";
          	var notiBody= "Learning agenda sent back by "+empObject.name;
            var notiLink= "rejected";
            var notiReceipent= globalEmpId;
            sendNoti(senderId,notiType,notiTitle,notiBody,notiLink,notiReceipent);
			
			swal({
					  title: "Kra Rejcted!",
					  text: " You successfully rejected the KRA.",
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
});