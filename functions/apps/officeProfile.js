$(document).ready(function(){
	console.log("Jquery officeProfile Loaded");
	var globalEmpId = getUrlVars()["empId"];

	$("#submitOfficeInfo").click(function(){
		var officeInfo = $("#officeInfo").serializeArray();
		console.log(officeInfo);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';

		submitOfficeInfo(empId,officeInfo,'basicOffice',function(status){
			swal({
				  title: "Employee Office details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	checkStatus(empId,"office"); //used to update input table of HR	
			});
			$("#officeInfo :input").attr("disabled", true);
		});
	});

	$("#submitJoiningDetails").click(function(){
		var joiningDetails = $("#joiningDetails").serializeArray();
		console.log(joiningDetails);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';

		submitOfficeInfo(empId,joiningDetails,'joiningDetails',function(status){
			swal({
				  title: "Employee Joining details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	checkStatus(empId,"office"); //used to update input table of HR	
			});
			$("#joiningDetails :input").attr("disabled", true);
		});

	});

	$("#submitPositionDetails").click(function(){
		var positionDetails = $("#positionDetails").serializeArray();
		console.log(positionDetails);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';

		submitPositionDetails(empId,positionDetails,function(status){
			swal({
				  title: "Employee Position details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	checkStatus(empId,"office"); //used to update input table of HR	
			});
			$("#positionDetails :input").attr("disabled", true);
		});
	});

	$("#submitPerformanceDetails").click(function(){
		var performanceDetails = $("#performanceDetails").serializeArray();
		console.log(performanceDetails);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
 		var empId= 'E1001';

		submitOfficeInfo(empId,performanceDetails,'performanceRating',function(status){
			swal({
				  title: "Employee Performance details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	checkStatus(empId,"office"); //used to update input table of HR	
			});
			$("#performanceDetails :input").attr("disabled", true);
		});
	});	

	$("#submitpreviousEmployment").click(function(){
		//here we will use the empId for the file
		var empId= 'E1001';
		var companyName = $("#companyName1").val();
		if(companyName=""){
			console.log("Not filled the mandatory  fields");
			swal("Error!", "Please enter the mandatory fields.", "warning");
		}else{
			var previousEmploymentDetail = $("#previousEmploymentDetail").serializeArray();
			console.log(previousEmploymentDetail);
			event.preventDefault(); //to prevent form from auto submitting
			//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
			//var empId = globalEmpId; //this is the empId from URL
			var empId= 'E1001';
			
			submitpreviousEmployment(empId,previousEmploymentDetail,function(status){
				swal({
					  title: "Employee Previous work details updated successfully!",
					  text: " Your Information has been saved.",
					  type: "success",
					  showCancelButton: false,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
						console.log("Came in Swal");
					  	checkStatus(empId,"office"); //used to update input table of HR	
				});
				$("#previousEmploymentDetail :input").attr("disabled", true);
			});
		}
	});


//tab 2
	$("#submitBankDetails").click(function(){		
		var bankDetails = $("#bankDetails").serializeArray();
		console.log(bankDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';
		
		submitPayrollInformation(empId,bankDetails,'bankDetails',function(status){
			swal({
				  title: "Employee Bank details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");	
			});
			$("#bankDetails :input").attr("disabled", true);
			// /$('.btn').hide();

		});
	});

	$("#submitSalaryDetails").click(function(){
		
		var salaryDetails = $("#salaryDetails").serializeArray();
		console.log(salaryDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';
		
		submitPayrollInformation(empId,salaryDetails,'salaryDetails',function(status){
			swal({
				  title: "Employee Salary details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");	
			});
			$("#salaryDetails :input").attr("disabled", true);
		});
	});

	$("#submitOtherBenefitDetails").click(function(){
		
		var otherBenefitDetails = $("#otherBenefitDetails").serializeArray();
		console.log(otherBenefitDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';
		
		submitPayrollInformation(empId,otherBenefitDetails,'otherBenefitDetails',function(status){
			swal({
				  title: "Employee other benefit details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
			});
			$("#otherBenefitDetails :input").attr("disabled", true);
		});
	});

	$("#submitCompanyCarDetails").click(function(){
		
		var companyCarDetails = $("#companyCarDetails").serializeArray();
		console.log(companyCarDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';
				
		submitPayrollInformation(empId,companyCarDetails,'companyCarDetails',function(status){
			swal({
				  title: "Employee Salary details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
			});
			$("#companyCarDetails :input").attr("disabled", true);
		});
	});

	$("#submitPersonalCarDetails").click(function(){		
		var personalCarDetails = $("#personalCarDetails").serializeArray();
		console.log(personalCarDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
		var empId= 'E1001';
				
		submitPayrollInformation(empId,personalCarDetails,'personalCarDetails',function(status){
			swal({
				  title: "Employee Personal car details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
			});
			$("#personalCarDetails :input").attr("disabled", true);
		});
	});

	$("#submitSeparationDetails").click(function(){
		var separationDetails = $("#separationDetails").serializeArray();
		console.log(separationDetails);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId = globalEmpId; //this is the empId from URL
 		var empId= 'E1001';

		submitOfficeInfo(empId,separationDetails,'separationDetails',function(status){
			swal({
				  title: "Employee separation details updated successfully!",
				  text: " Your Information has been saved.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
				  	checkStatus(empId,"office"); //used to update input table of HR	
			});
			$("#separationDetails :input").attr("disabled", true);
		});
	});
});

