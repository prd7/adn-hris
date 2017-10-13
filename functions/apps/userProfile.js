$(document).ready(function(){
	console.log("userProfile Jquery Loaded");
	console.log(getUrlVars()["typeId"]);
	if(getUrlVars()["typeId"]){
		var globalTypeId = getUrlVars()["typeId"];

		var empIdArray = globalTypeId.split('_');
	    
	    var globalEmpId= empIdArray[1];
	}else{
		var globalEmpId = localStorage.empId;	
	}
	console.log(globalEmpId);
	
	checkStatus(globalEmpId,"personal",function(result){
		console.log("Back to userProfile.js from module with results in callback");
		var statusArray =result.get("statusPersonal");
		console.log("fetch stuff here");
		console.log(statusArray);
		//console.log(statusArray[0].personalStatus);
		
		if(statusArray[0].personalStatus){
			var personalArray= result.get("personal");
			//console.log("came in values setting");
			//$("#form_sample_1 :input").attr("disabled", true);
			//console.log(personalArray);
			$('#fname').html(result.get("name"));
			$('#fatherName').val(personalArray[0].fatherName);
			$('#motherName').val(personalArray[0].motherName);
			$('#'+personalArray[0].gender).attr('checked', true);
			$('#birthdate').val(personalArray[0].dob);
			$('#mobileNo').val(personalArray[0].personalMobile);
			$('#homePhonNo').val(personalArray[0].homePhone);
			$('#personalEmail').val(personalArray[0].personalEmail);
			$('#officeEmail').val(result.get("officeEmail"));
			$('#bloodGroup').val(personalArray[0].bloodGroup);
			$('#religion ').val(personalArray[0].religion);
			$('#maritalStatus').val(personalArray[0].maritialStatus);
			$('#nationality').val(personalArray[0].nationality);
			$('#emergencyContactName').val(personalArray[0].emergencyContactName);
			$('#emergencyContactNo').val(personalArray[0].emergencyContactNumber);
			/*Address*/
			var curAddArray = personalArray[0].presentAddress;
			curAddArray = curAddArray.split(',');
			$('#curAddLine1').val(curAddArray[0]);
			$('#curAddLine2').val(curAddArray[1]);
			$('#curAddThana').val(curAddArray[2]);
			$('#curAddDistrict').val(curAddArray[3]);
			$('#curAddDivision').val(curAddArray[4]);
			$('#curAddPostCode').val(curAddArray[5]);

			var permAddArray = personalArray[0].permanentAddress;
			permAddArray = permAddArray.split(',');
			$('#permAddLine1').val(permAddArray[0]);
			$('#permAddLine2').val(permAddArray[1]);
			$('#permAddThana').val(permAddArray[2]);
			$('#permAddDistrict').val(permAddArray[3]);
			$('#permAddDivision').val(permAddArray[4]);
			$('#permAddPostCode').val(permAddArray[5]);
		}
		if(statusArray.addressStatus){
			var personalArray =result.get("personal");
			$("#form_sample_2 :input").attr("disabled", true);
		}

		if(statusArray[0].academicStatus){
			var academicDetailsArray = result.get("academicDetails");
			var length = academicDetailsArray.length;			
			for(i=1; i<length; i++){
				$(".dependentDropdownAdd").click()			}
			for(i=0; i<length; i++){
				$('[name="group-a['+i+'][d1]"]').val(academicDetailsArray[i].levelOfEducation);
				$('[name="group-a['+i+'][d2]"]').val(academicDetailsArray[i].examDegreeTitle);
				$('[name="group-a['+i+'][concentrationMajorGroup]"]').val(academicDetailsArray[i].major);
				$('[name="group-a['+i+'][instituteName]"]').val(academicDetailsArray[i].instituteName);
				$('[name="group-a['+i+'][result]"]').val(academicDetailsArray[i].result);
				$('[name="group-a['+i+'][marksPercentage]"]').val(academicDetailsArray[i].marks);
				$('[name="group-a['+i+'][cgpa]"]').val(academicDetailsArray[i].cgpa);
				$('[name="group-a['+i+'][scale]"]').val(academicDetailsArray[i].scale);
				$('[name="group-a['+i+'][yearofPassing]"]').val(academicDetailsArray[i].yearOfPassing);
				$('[name="group-a['+i+'][duration]"]').val(academicDetailsArray[i].duration);
				$('[name="group-a['+i+'][achievements]"]').val(academicDetailsArray[i].achievements);
			}
			//$("#academicDetails :input").attr("disabled", true);
		}
		if(statusArray[0].familyStatus){
			console.log("came in values setting");
			var familyDetailsArray = result.get("familyDetails");
			console.log(familyDetailsArray);
			var length = familyDetailsArray.length;		
			console.log(length);	
			for(i=1; i<length; i++){
				$(".familyDetailsAddnew").click()			}
			for(i=0; i<length; i++){
				$('[name="group-a['+i+'][familyMemberName]"]').val(familyDetailsArray[i].name);
				$('[name="group-a['+i+'][familyMemberRelation]"]').val(familyDetailsArray[i].relation);
				$('[name="group-a['+i+'][familyMember'+familyDetailsArray[i].gender+']"]').attr('checked', true);
				$('[name="group-a['+i+'][familyMembermobileNumber]"]').val(familyDetailsArray[i].contact);
				$('[name="group-a['+i+'][familyMemberBirthdate]"]').val(familyDetailsArray[i].dateOfBirth);
				$('[name="group-a['+i+'][familyMemberAge]"]').val(familyDetailsArray[i].age);
				
			}
		}

		if(result.get("nIdSmartCard")){
			
			var file = result.get("nIdSmartCard");
			$("#txtNationalIdSmartCard").val(file._name);
			$("#downloadNationalIdSmartCard").attr("href", file._url);
		}
		if(result.get("nIdOldFormat")){
			
			var file = result.get("nIdOldFormat");
			$("#txtNationalIDOldFormat").val(file._name);
			$("#downloadNationalIDOldFormat").attr("href", file._url);
		}
		if(result.get("birthRegistration")){
			
			var file = result.get("birthRegistration");
			$("#txtBirthRegistrationNumber").val(file._name);
			$("#downloadBirthRegistrationNumber").attr("href", file._url);
		}
		if(result.get("passport")){
			console.log(result.get("passport"));
			var file = result.get("passport");
			$("#txtPassportNumber").val(file._name);
			$("#downloadPassportNumber").attr("href", file._url);
		}
		if(result.get("profileImage")){
			console.log(result.get("profileImage"));
			var file = result.get("profileImage");
			$("#profilePictureShow").attr("src", file._url);
		}
	});

	//buttn top download
	$("#downloadNationalIdSmartCard").click(function(){
		//download the saved url
	});

	$("#submitPersonal").click(function(){
		var empId=localStorage.empId;
		var personalArray = $("#form_sample_1").serializeArray();
		console.log(personalArray);
		var type= "personal";
		submitPersonal(empId,personalArray,type,function(status){
			swal({
				  title: "Employee Personal updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtoynClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal now updating status flag");
					checkStatus(empId,"personal",function(){}); //used to update input table of HR
			});
		});
		$("#form_sample_1 :input").attr("disabled", true);
	});

	$("#submitAddress").click(function(){
		var empId=localStorage.empId;
		var addressArray = $("#form_sample_2").serializeArray();
		console.log(addressArray);
		var type= "address";
		submitPersonal(empId,addressArray,type,function(status){
			console.log("Updated address valuess");
			swal({
				  title: "Employee Address updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
					checkStatus(empId,"personal",function(){}); //used to update input table of HR //used to update input table of HR
				  	//function to update status flag in the statusPersonal Array
						
			});
		});
		$("#form_sample_2 :input").attr("disabled", true);
	});

	$("#submitAcademic").click(function(){
		console.log('In academic submit');
		var empId=localStorage.empId;
		var academicArray = $("#academicDetails").serializeArray();
		console.log(academicArray);
		var type= "academic";
		submitPersonal(empId,academicArray,type,function(status){
			console.log("Updated address valuess");
			swal({
				  title: "Employee academic details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	//function to update status flag in the statusPersonal Array
					checkStatus(empId,"personal",function(){}); //used to update input table of HR //used to update input table of HR
			});
		});
		$("#academicDetails :input").attr("disabled", true);
	});

	$("#submitFamily").click(function(){
		console.log('In familyDetails submit');
		var empId=localStorage.empId;
		var familyArray = $("#familyDetails").serializeArray();
		console.log(familyArray);
		var type= "family";
		submitPersonal(empId,familyArray,type,function(status){
			console.log("Updated address valuess");
			swal({
				  title: "Employee family details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	//function to update status flag in the statusPersonal Array
					checkStatus(empId,"personal",function(){}); //used to update input table of HR //used to update input table of HR	
			});
		});
		$("#familyDetails :input").attr("disabled", true);
	});
	
	$("#uploadNationalIdSmartCard").click(function(){ //button to upload id
		console.log("Uploading Document"); 
		var id = "fileNationalIdSmartCard"; //file location id type="file"
		uploadDocument(localStorage.empId,id,'smartCard');
	});

	$("#uploadNationalIDOldFormat").click(function(){
		console.log("Uploading Document");
		var id = "fileNationalIDOldFormat";
		uploadDocument(localStorage.empId,id,'oldFormat');
	});

	$("#uploadPassportNumber").click(function(){
		console.log("Uploading Document");
		var id = "filePassportNumber";
		uploadDocument(localStorage.empId,id,'passport');
	});
	$("#uploadBirthRegistrationNumber").click(function(){
		console.log("Uploading Document");
		var id = "fileBirthRegistrationNumber";
		uploadDocument(localStorage.empId,id,'birthRegistration');
	});
	$("#uploadProfilePicture").click(function(){
		console.log("Uploading Profile picture");
		var id = "fileProfilePicture";
		uploadDocument(localStorage.empId,id,'profileImage');
	});


	//End of Jquery
});
