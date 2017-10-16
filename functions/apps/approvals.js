$(document).ready(function(){
	console.log("Jquery approval requests Loaded");
	$("#printFunction").click(function(){
    	window.print();
	});
	var empId = localStorage.empId;
	
	checkApprovalTable(empId,function(status,data){
		if(status){
			var awaitingResponses = data.length;
			if(awaitingResponses==0){
				$("#awaitingResponses").html('No Awaiting Responses.');	
			}else if(awaitingResponses==1){
				$("#awaitingResponses").html(awaitingResponses+' Awaiting Response');
			}else{
				$("#awaitingResponses").html(awaitingResponses+' Awaiting Responses');
			}
			var status = data[0].get("status");
			if(status=="live"){
				for( var i = 0; i < data.length; i++ )
		        {
		        	var approvalListObject = '<li class="todo-projects-item">'+
					'    <a href="'+data[i].get('type')+'_approval.html?typeId='+data[i].get('typeId')+'&empId='+data[i].get('cameFromId')+'">'+
					'        <div class="row">'+
					'            <div class="col-sm-6 col-xs-12">'+
					'                <img class="img-circle pull-left" style="margin-top: 5px; margin-right: 10px" src="../assets/pages/media/users/avatar1.jpg" width="54px" height="54px">'+
					'                <h4>'+data[i].get('type')+' Approval</h4>'+
					'                <p>'+
					'                    <strong>'+data[i].get('type')+'</strong> - Submitted by '+data[i].get('cameFromName')+
					'                </p>'+
					'            </div>'+
					''+
					'            <div class="col-sm-3 col-xs-6">'+
					'                <p class="search-counter-label" style="padding-top: 27px">'+data[i].get('cameFromName')+'</p>'+
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
			}
		}else{
			console.log("came with a callback false");
			//swal("Error!", "No Approval requests for you", "warning")
			swal("No Approval requests for you");
		}
	});
}); 