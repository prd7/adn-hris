$(document).ready(function(){
	
	var globalTypeId = getUrlVars()["typeId"];
	var globalEmpId = getUrlVars()["empId"];
	if(globalEmpId){
		var empId = globalEmpId;
	}else{
		swal("Please go back to Approvals");
	}
	console.log("Jquery Loaded");
	$("#printFunction").click(function(){
	    window.print();
	});
	//checkInitiate();

	fetchKra(empId,globalTypeId,function(status,data){
		if(status){
			console.log("Valid entry in kra table");
			$("#empName").html(data.get("empName"));
			$("#empSubmitTime").html(dateTimeString(data.get('endDate')));

			var stage = data.get("stage");
			var kraValue = data.get("kraValue");
			var kraValuelength = (data.get("kraValue")).length;
			//console.log("KRA is in the "+stage+" stage");

			//show the timeline here
			var supervisorData = data.get("supervisorData");
			if(supervisorData.length){
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
					'			<div class="timeline-body-head-caption"> <a href="javascript:;" class="timeline-body-title font-blue-madison">'+supervisorData[i].supervisorName+'</a>'+
					'				<span class="timeline-body-time font-grey-cascade">Sent Back KRA at '+dateTimeString(new Date(supervisorData[i].supervisorInputDate))+'</span>'+
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
				
					$("#timeline").prepend(timelineItem);	
				}
			}

				
			if(stage=="posted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				//$("#submits").hide()
				//$("#status").html('Your KRA was submitted for review.');
				$("#empSubmitTime").html(dateTimeString(data.get('endDate')));

				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).text(kraValue[i].kraCat);
					$("#selkrawght"+index).text(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}
			}else if(stage=="accepted"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide();
				$("#managerCommentKra").hide();
				$("#empSubmitTime").html(dateTimeString(data.get('endDate')));
				$("#smallStatus").html("Learning Agenda Approved");

				var supervisorData = data.get("supervisorData");
				//console.log(supervisorData);
				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).text(kraValue[i].kraCat);
					$("#selkrawght"+index).text(kraValue[i].kraWeight);
					$('#txtuos'+index).text(kraValue[i].kraUos);
					$('#txtmos'+index).text(kraValue[i].kraMos);
				}
			}else if(stage=="rejected"){
				console.log(stage);
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submits").hide();
				$("#managerCommentKra").hide();
				$("#smallStatus").html("Learning Agenda Rejected");

				var supervisorData = data.get("supervisorData");
				//supervisorData[0].supervisorInput;
				console.log(supervisorData);
				for(i=0;i<kraValuelength;i++){
					var index = i+1;
					$('#txtkra'+index).text(kraValue[i].kra);
					$("#selkracat"+index).text(kraValue[i].kraCat);
					$("#selkrawght"+index).text(kraValue[i].kraWeight);
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
				  	window.location.href= "approvals.html";	
			});
		}
	});

	$("#approveKra").click(function(){
		if( $("#managerCommentKra").val()){
			var supervisorInput = $("#managerCommentKra").val();
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
		}else{
			swal("You need to enter a remark.");
		}
	});
	$("#sendBackKra").click(function(){
		if( $("#managerCommentKra").val()){
			var supervisorInput = $("#managerCommentKra").val();
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
		}else{
			swal("You need to enter a remark.");
		}
	});
});