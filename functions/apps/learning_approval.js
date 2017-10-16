$(document).ready(function(){

	var globalTypeId = getUrlVars()["typeId"];
	var globalEmpId = getUrlVars()["empId"];
	if(globalEmpId){
		var empId = globalEmpId;
	}else{
		alert("Please go back to Approvals");
	}
	console.log("Jquery Loaded");
	$("#printFunction").click(function(){
	    window.print();
	});
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
				$("#managerCommentLearning").hide();
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

			}else if(stage=="rejected"){
				$("#sample_3 :input").attr("disabled", true);//disables the table after submitting KRA
				$("#submitsLearningApproval").hide();
				$("#managerCommentLearning").hide();
				$("#empSubmitTime").html(dateTimeString(data.get('endDate')));
				$("#smallStatus").html("Learning Agenda Rejected");

				for(i=0;i<learningValuelength;i++){
					var index = i+1;
					$("#selDevArea"+index).val(learningValue[i].developmentArea);
					$('#txtDevPlan'+index).text(learningValue[i].developmentPlan);
					$('#txtMos'+index).text(learningValue[i].learningMos);
					$('#txtTimeline'+index).text(learningValue[i].supportRequired);
					$('#txtSupportReq'+index).text(learningValue[i].timeline);
				}
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
		if( $("#managerCommentLearning").val()){
			var supervisorInput = $("#managerCommentLearning").val();
			reviewLearning(globalEmpId,localStorage.empId,supervisorInput,empObject.name,globalTypeId,true,function(status){
				
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
		}else{
			swal("You need to enter a remark.");
		}
		
	});

	$("#sendBack").click(function(){
		if( $("#managerCommentLearning").val()){
			var supervisorInput = $("#managerCommentLearning").val();
			reviewLearning(globalEmpId,localStorage.empId,supervisorInput,empObject.name,globalTypeId,false,function(status){
				if(status){
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
		            var notiLink= "rejected";
		            var notiReceipent= globalEmpId;
		            sendNoti(senderId,notiType,notiTitle,notiBody,notiLink,notiReceipent);
		            console.log("came back till her");

					swal({
							  title: "Learning Rejcted!",
							  text: " You successfully rejected the learning agenda.",
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
					
				}
			});
		}else{
			swal("You need to enter a remark.");
		}
		//console.log(supervisorInput);

	});
	
});