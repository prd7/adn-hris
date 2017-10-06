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
		console.log(statusArray[0].personalStatus);
		if(statusArray[0].personalStatus){
			var personalArray= result.get("personal");
			console.log("came in values setting");
			$("#form_sample_1 :input").attr("disabled", true);
			console.log(personalArray);
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

		}
		if(statusArray.addressStatus){
			var personalArray =result.get("personal");
			$("#form_sample_2 :input").attr("disabled", true);
		}
		if(statusArray.academicStatus){
			var personalArray =result.get("academicDetails");
			$("#academicDetails :input").attr("disabled", true);
		}
		if(statusArray.familyStatus){
			var personalArray =result.get("familyDetails");
			$("#familyDetails :input").attr("disabled", true);
		}
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


	//End of Jquery
});
