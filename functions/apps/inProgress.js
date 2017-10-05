$(document).ready(function(){
	console.log("Jquery inProgress requests Loaded");
	var empId = localStorage.empId;
	
	checkInProgress(empId,function(status,data){
		if(status){
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
	        	var inProgressListObject = '<li class="todo-projects-item">'+
				'    <!--a href="'+data[i].get('type')+'.html?typeId='+data[i].get('typeId')+'"-->'+
				'        <div class="row">'+
				'            <div class="col-sm-6 col-xs-12">'+
				'                <img class="img-circle pull-left" style="margin-top: 5px; margin-right: 10px" src="../assets/pages/media/users/avatar1.jpg" width="54px" height="54px">'+
				'                <h4>'+data[i].get('type')+'</h4>'+
				'                <p>'+
				'                    <strong>'+data[i].get('type')+'</strong> - Pending for review at Supervisor Name'+
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
				$("#inProgress ul").append(inProgressListObject);
			}
		}else{
			console.log("came with a callback false");
			//swal("Error!", "No inProgress requests for you", "warning")
			swal("No inProgress requests for you");
		}
	});
}); 