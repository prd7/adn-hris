$(document).ready(function(){
	console.log("Jquery approval requests Loaded");
	
	if(getUrlVars()["typeId"]){
		var globalTypeId = getUrlVars()["typeId"];

		var empIdArray = globalTypeId.split('_');
	    
	    var globalEmpId= empIdArray[1];
	}else{
		var globalEmpId = localStorage.empId;	
	}
		
	checkStatus(globalEmpId,"personal",function(result){
		var statusArray =results[0].get("statusPersonal");
		var academicDetailsArray = results[0].get("academicDetails"); //to fetch existing array
        var familyDetailsArray = results[0].get("familyDetails");
		//document info array here

		if(statusArray.personalStatus){
			var personalArray =results[0].get("personal");
			$('#fatherName').val(personalArray[0].fatherName);
			$('#motherName').val(personalArray[0].motherName);
			$('#gender').rad(personalArray[0].gender);
			$('#birthdate').val(personalArray[0].dob);
			$('#mobile').val(personalArray[0].personalMobile);
			$('#homePhoneNo').val(personalArray[0].homePhone);
			$('#personalEmail').val(personalArray[0].personalEmail);
			$('#officeEmail').val(personalArray[0].officeEmail);
			$('#bloodGroup').val(personalArray[0].bloodGroup);
			$('#religion ').val(personalArray[0].religion);
			$('#maritalStatus').val(personalArray[0].maritialStatus);
			$('#nationality').val(personalArray[0].nationality);
			$('#emergencyContactName').val(personalArray[0].emergencyContactName);
			$('#emergencyContactNo').val(personalArray[0].emergencyContactNumber);

			$("#form_sample_1 :input").attr("disabled", true);
		}
		if(statusArray.addressStatus){
			var personalArray =results[0].get("personal");
			
			$("#form_sample_2 :input").attr("disabled", true);
		}
		if(statusArray.academicStatus){
			var personalArray =results[0].get("academicDetails");
			$("#academicDetails :input").attr("disabled", true);
		}
		if(statusArray.familyStatus){
			var personalArray =results[0].get("familyDetails");
			$("#familyDetails :input").attr("disabled", true);
		}
		
	});

	/*
	//function to check and fetch the data needed to populate in this table
	checkstatusPersonal(empId,function(status,data){
		if(status){

        	var approvalListObject = '<li class="todo-projects-item">'+
			'    <a href="'+data[i].get('type')+'_approval.html?typeId='+data[i].get('typeId')+'">'+
			'        <div class="row">'+
			'            <div class="col-sm-6 col-xs-12">'+
			'                <img class="img-circle pull-left" style="margin-top: 5px; margin-right: 10px" src="../assets/pages/media/users/avatar1.jpg" width="54px" height="54px">'+
			'                <h4>'+data[i].get('type')+' Approval</h4>'+
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
			
		
	});

	*/
}); 