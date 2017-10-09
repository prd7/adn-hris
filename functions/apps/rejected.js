$(document).ready(function(){
	console.log("Jquery rejected requests Loaded");
	var empId = localStorage.empId;
	
	checkRejected(empId,function(status,data){
		if(status){
			var awaitingResponses = data.length;
			if(awaitingResponses==0){
				$("#awaitingResponses").html('No rejected Responses.');	
			}else if(awaitingResponses==1){
				$("#awaitingResponses").html(awaitingResponses+' rejected Response');
			}else{
				$("#awaitingResponses").html(awaitingResponses+' rejected Responses');
			}
			var status = data[0].get("status");
			if(status=="rejected"){
				for( var i = 0; i < data.length; i++ )
		        {
		        	var rejectedListObject = '<li class="todo-projects-item">'+
					'    <a href="'+data[i].get('type')+'.html?typeId='+data[i].get('typeId')+'">'+
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
					'                <p class="search-counter-label" style="padding-top: 27px">Supervisor Name</p>'+
					'            </div>'+
					'            <div class="col-sm-3 col-xs-6">'+
					'                <p class="search-counter-label" style="padding-top: 27px">'+dateTimeString(data[i].get('startDate'))+'</p>'+
					'            </div>'+
					'        </div>'+
					'    </a>'+
					'</li>';
						
					//the parent div where the div should be appended
					$("#rejected ul").append(rejectedListObject);
				}
			}
		}else{
			$("#awaitingResponses").html('No rejected Responses.');
			console.log("came with a callback false");
			//swal("Error!", "No rejected requests for you", "warning")
			swal("You do not have any rejected entries yet.");
		}
	});
}); 