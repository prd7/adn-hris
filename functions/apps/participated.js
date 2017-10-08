$(document).ready(function(){
	console.log("Jquery approval requests Loaded");
	var empId = localStorage.empId;
	
	checkParticipated(empId,function(status,data){
		if(status){
			console.log(data);
			var status = data[0].get("status");
			if(status == "rejected" || "accepted"){
				var awaitingResponses = data.length;
				if(awaitingResponses==0){
					$("#awaitingResponses").html('No Awaiting Responses.');	
				}else if(awaitingResponses==1){
					$("#awaitingResponses").html(awaitingResponses+' Awaiting Response');
				}else{
					$("#awaitingResponses").html(awaitingResponses+' Awaiting Responses');
				}
				for( var i = 0; i < data.length; i++ )
		        {
		        	var approvalListObject = '<li class="todo-projects-item">'+
					'    <a href="'+data[i].get('type')+'_approval.html?typeId='+data[i].get('typeId')+'&empId='+data[i].get('cameFrom')+'">'+
					'        <div class="row">'+
					'            <div class="col-sm-6 col-xs-12">'+
					'                <img class="img-circle pull-left" style="margin-top: 5px; margin-right: 10px" src="../assets/pages/media/users/avatar1.jpg" width="54px" height="54px">'+
					'                <h4>'+data[i].get('type')+' '+data[0].get("status")+' by you.</h4>'+
					'                <p>'+
					'                    <strong>'+data[i].get('type')+'</strong> - Submitted by '+data[i].get('cameFrom')+
					'                </p>'+
					'            </div>'+
					''+
					'            <div class="col-sm-3 col-xs-6">'+
					'                <p class="search-counter-label" style="padding-top: 27px">Supervisor Name</p>'+
					'            </div>'+
					'            <div class="col-sm-3 col-xs-6">'+
					'                <p class="search-counter-label" style="padding-top: 27px">'+dateTimeString(data[i].get('startDate'))+'</p>'+
					'            </div>'+
					'        </div>'+
					'    </a>'+
					'</li>';
						
					//the parent div where the div should be appended
					$("#approvalReq ul").append(approvalListObject);
				}
			}else{
				swal("Complete appoval requests for you.");
				console.log("no entry with status accepted/rejected then entry must be live");
			}
		}else{
			console.log("came with a callback false");
			//swal("Error!", "No Approval requests for you", "warning")
			swal("You have not completed participation in any action yet.");
		}
	});
}); 