$(document).ready(function(){
	console.log("Jquery approved requests Loaded");
	var empId = localStorage.empId;
	console.log(empId);


	checkApproved(empId,function(status,data){
		if(status){
			console.log("Dcas came back in js");
			var awaitingResponses = data.length;
			if(awaitingResponses==0){
				$("#awaitingResponses").html('No Approved Responses.');	
			}else if(awaitingResponses==1){
				$("#awaitingResponses").html(awaitingResponses+' Approved Response');
			}else{
				$("#awaitingResponses").html(awaitingResponses+' Approved Responses');
			}
			for( var i = 0; i < data.length; i++ )
	        {
	        	var approvedListObject = '<li class="todo-projects-item">'+
				'    <!--a href="'+data[i].get('type')+'.html?typeId='+data[i].get('typeId')+'"-->'+
				'        <div class="row">'+
				'            <div class="col-sm-6 col-xs-12">'+
				'                <img class="img-circle pull-left" style="margin-top: 5px; margin-right: 10px" src="../assets/pages/media/users/avatar1.jpg" width="54px" height="54px">'+
				'                <h4>'+data[i].get('type')+'</h4>'+
				'                <p>'+
				'                    <strong>'+data[i].get('type')+'</strong> - Request form Initiator Name'+
				'                </p>'+
				'            </div>'+
				''+
				'            <div class="col-sm-3 col-xs-6">'+
				'                <p class="search-counter-label" style="padding-top: 27px">'+data[i].get('supervisorName')+'</p>'+
				'            </div>'+
				'            <div class="col-sm-3 col-xs-6">'+
				'                <p class="search-counter-label" style="padding-top: 27px">'+dateTimeString(data[i].get('startDate'))+'</p>'+
				'            </div>'+
				'        </div>'+
				'    </a>'+
				'</li>';
					
				//the parent div where the div should be appended
				$("#approved ul").append(approvedListObject);
			}
		}else{
			$("#awaitingResponses").html('No Approved Responses.');
			console.log("came with a callback false");
			//swal("Error!", "No approved requests for you", "warning")
			swal("You do not have any approved entries yet.");
		}
	});
}); 