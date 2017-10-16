$(document).ready(function(){
	console.log("Jquery officeProfile Loaded");
	$("#printFunction").click(function(){
	    window.print();
	});
	var globalTypeId = getUrlVars()["typeId"];
	
	if(getUrlVars()["typeId"]){
		var globalTypeId = getUrlVars()["typeId"];

		var empIdArray = globalTypeId.split('_');
	    
	    var globalEmpId= empIdArray[1];
	}else{
		var globalEmpId = localStorage.empId;	
	}
	console.log(globalEmpId);
	//fetch default values
    
	//$('#employeeName').val(name);
	//$('#employeeId').val(globalEmpId);


	getEmployeeData(function(data){
		if(data.length){
			for(var i=0;i<data.length;i++){
				//console.log("came inside for loop");
				var reportingManagerObjects = '<option value="'+data[i].get("empId")+'">'+data[i].get("name")+'('+data[i].get("empId")+')</option>';
				$('#reportingManagerIdName').append(reportingManagerObjects);
			}
		}
		$('#reportingManagerIdName').val("1010012");
	});
		
	checkStatus(globalEmpId,"office",function(results){
		console.log("Came back from module to office profile");
		var statusArray = results.get("statusOffice");
		console.log(results.get("supervisorId"));
		var officeArray = results.get("officeDetails");
		var officePositionArray = results.get("officePositionDetails");
		var previousWorkArray = results.get("previousWorkDetails");
		var bankArray = results.get("bankDetails");
		var salaryArray = results.get("salaryDetails");
		var otherBenefitArray = results.get("otherBenefitDetails");
		var companyCarArray = results.get("companyCarDetails");
		var personalCarArray = results.get("personalCarDetails");
		
		//fetch and populate stuff here
		$('#employeeName').val(results.get("name"));
		$('#employeeId').val(results.get("empId"));
		$('#officePhoneNumber').val(results.get("officePhone"));
		$('#officeEmailId ').val(results.get("officeEmail"));

		if(statusArray[0].officeInfoStatus){
			$("#officeInfo :input").attr("disabled", true);
			
			$('#idCardNumber').val(officeArray[0].idCardNumber);
			$('#companyName').val(results.get("companyName"));
			$('#officePhoneNumber').val(results.get("officePhone"));
			$('#officeMobileNumber').val(officeArray[0].officeMobileNumber);
			$('#officeEmailId ').val(results.get("officeEmail"));
			$('#facility').val(officeArray[0].facility);
			$('#city').val(officeArray[0].city);
			$('#country').val(officeArray[0].country);
			$('#costCenter ').val(officeArray[0].costCenter);

		}
		if(statusArray[0].joiningDetailStatus){
			$('#dateOfJoining').val(officeArray[0].dateOfJoining);
			$('#dateOfConfirmation ').val(officeArray[0].dateOfConfirmation);
			$('#confirmationStatus').val(officeArray[0].stateOfConfirmation);
			$('#workPermitNumber').val(officeArray[0].workPermitNumber);
			$('#workPermitEffectiveDate ').val(officeArray[0].effectiveDate);
			$('#workPermitExpiryDate ').val(officeArray[0].expiryDate);

			$("#joiningDetails :input").attr("disabled", true);
		}
		if(statusArray[0].positionHistoryStatus){
			$('#jobTitle').val(officeArray[0].jobTitle);
			$('#employeeCategory').val(officePositionArray[0].employeeCategory);
			$('#employeeGrade').val(officePositionArray[0].employeeGrade);
			$('#division').val(officePositionArray[0].buisnessDivision);
			$('#department').val(officePositionArray[0].department);
			$('#verticalUnit').val(officePositionArray[0].vertical);
			$('#subVerticalUnit').val(officePositionArray[0].subVertical);
			$('#reportingManagerIdName').val(results.get("supervisorId"));
			
			$('#reviewer').val(officePositionArray[0].reviewer);
			$('#hrSpoc').val(officePositionArray[0].buisnessHrSpoc);
			$('#businessHrHead').val(officePositionArray[0].buisnessHrHead);
			$('#groupHrHead').val(officePositionArray[0].groupHrHead);

			//$("#positionDetails :input").attr("disabled", true);
		}
		if(statusArray[0].performanceStatus){
			$('#performanceRatingFy1516').val(officeArray[0].pfRating1516);
			$('#performanceRatingFy1617').val(officeArray[0].pfRating1617);  

			$("#performanceDetails :input").attr("disabled", true);
		}
		if(statusArray[0].perviousEmploymentStatus){
			$('#companyName1').val(previousWorkArray[0].companyName);
			$('#companyBusiness').val(previousWorkArray[0].companyBuisness);
			$('#designationPrev').val(previousWorkArray[0].designation);
			$('#departmentPrev').val(previousWorkArray[0].department);
			$('#responsibility').val(previousWorkArray[0].responsibility);
			$('#companyLocation').val(previousWorkArray[0].companyLocation);
			$('#employmentPeriod').val(previousWorkArray[0].employmentPeriod);
			$('#areaOfExperience').val(previousWorkArray[0].areaOfExperience);

			$("#previousEmploymentDetail :input").attr("disabled", true);
		}
		if(statusArray[0].bankStatus){
			$('#bankName').val(bankArray[0].bankName);
			$('#accountName').val(bankArray[0].accountName);
			$('#accountNumber').val(bankArray[0].accountNumber);
			$('#currency').val(bankArray[0].currency);

			$("#bankDetails :input").attr("disabled", true);
		}
		if(statusArray[0].salaryStatus){
			$('#basic').val(salaryArray[0].basic);
			$('#hra').val(salaryArray[0].hra);
			$('#conveyanceAllowance').val(salaryArray[0].conveyanceAllowance);
			$('#lfa').val(salaryArray[0].lfa);
			$('#medicalAllowance').val(salaryArray[0].medicalAllowance);
			$('#specialAllowance').val(salaryArray[0].specialAllowance);
			$('#grossSalary ').val(salaryArray[0].grossSalary);
			$('#lunchAllowance').val(salaryArray[0].lunchAllowance);
			$('#mobileAllowance').val(salaryArray[0].mobileAllowance);
			$('#otherAllowance').val(salaryArray[0].otherAllowance);
			$('#totalEarnings ').val(salaryArray[0].totalEarnings);

			$("#salaryDetails :input").attr("disabled", true);
		}
		if(statusArray[0].otherBenefitStatus){
			$('#festivalAllowance').val(otherBenefitArray[0].festivalAllowance);
			$('#pfMembership').val(otherBenefitArray[0].providentFundMembership);
			$('#groupLifeInsurance').val(otherBenefitArray[0].groupLifeInsurance);
			$('#hospitalizationScheme').val(otherBenefitArray[0].hospitalizationScheme);

			$("#otherBenefitDetails :input").attr("disabled", true);
		}
		if(statusArray[0].companyCarStatus){
			$('#registrationNumber').val(companyCarArray[0].registrationNumber);
			$('#effectiveDate1').val(companyCarArray[0].effectiveDate);
			$('#expiryDate1').val(companyCarArray[0].expiryDate);
			$('#fuelAllowance').val(companyCarArray[0].fuelAllowance);
			$('#maintenanceAllowance').val(companyCarArray[0].maintainanceAllowance);
			$('#driverAllowance').val(companyCarArray[0].driverAllowance);
			$('#grossPay').val(companyCarArray[0].grossPay);

			$("#companyCarDetails :input").attr("disabled", true);
		}
		if(statusArray[0].personalCarStatus){
			$('#registrationNumberPersonal').val(personalCarArray[0].registrationNumber);
			$('#effectiveDate').val(personalCarArray[0].effectiveDate);
			$('#expiryDate').val(personalCarArray[0].expiryDate);
			$('#ownCarUsageAllowance').val(personalCarArray[0].ownCarUsageAllowance);			

			$("#personalCarDetails :input").attr("disabled", true);
		}
		if(statusArray[0].separationInfoStatus){
			$('#dateOfResignation').val(officeArray[0].dateOfResignation);
			$('#dateOfSeparation').val(officeArray[0].dateOfSeparation);
			$('#effectiveDate').val(officeArray[0].separationEffectiveDate);
			$('#separationType').val(officeArray[0].separationType);

			$("#separationDetails :input").attr("disabled", true);
		}

	});

	$("#submitOfficeInfo").click(function(){
		var officeInfo = $("#officeInfo").serializeArray();
		
		console.log(officeInfo);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId= 'E1001';
		var empId = globalEmpId; //this is the empId from URL
		console.log(globalEmpId);
		if($('#employeeName').val() && $('#employeeId').val() && $('#idCardNumber').val() && $('#companyName').val()){
			swal("submitted");
			/*submitOfficeInfo(empId,officeInfo,'basicOffice',function(status){
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
			});*/
		}else{
			swal("Please fill the compulsory fields..");
		}
	});

	$("#submitJoiningDetails").click(function(){
		var joiningDetails = $("#joiningDetails").serializeArray();
		console.log(joiningDetails);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		var empId = globalEmpId; //this is the empId from URL
		//var empId= 'E1001';
		if($("#dateOfJoining").val()){
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
		}else{
			swal("Please fill the compulsory fields.");
		}

	});

	$("#submitPositionDetails").click(function(){
		var positionDetails = $("#positionDetails").serializeArray();
		console.log(positionDetails);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		var empId = globalEmpId; //this is the empId from URL
		if($('#employeeCategory').val() && $('#employeeGrade').val() && $('#division').val() && $('#department').val() && $('#verticalUnit').val() && $('#subVerticalUnit').val() && $('#reportingManagerIdName').val()){
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
		}else{
			swal("Please fill the compulsory fields.");
		}
	});

	$("#submitPerformanceDetails").click(function(){
		var performanceDetails = $("#performanceDetails").serializeArray();
		console.log(performanceDetails);
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
 		//var empId= 'E1001';
		var empId = globalEmpId; //this is the empId from URL

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
		//var empId= 'E1001';
		var empId = globalEmpId;
		
		if($('#companyName1').val() && $('#designationPrev').val() && $('#departmentPrev').val() && $('#responsibility').val() && $('#companyLocation').val() && $('#employmentPeriod').val() && $('#areaOfExperience').val()){
			var previousEmploymentDetail = $("#previousEmploymentDetail").serializeArray();
			console.log(previousEmploymentDetail);
			event.preventDefault(); //to prevent form from auto submitting
			//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
			var empId = globalEmpId; //this is the empId from URL
			
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
		}else{
			swal("Please fill the compulsory fields.");
		}
	});


//tab 2
	$("#submitBankDetails").click(function(){		
		var bankDetails = $("#bankDetails").serializeArray();
		console.log(bankDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId= 'E1001';
		var empId = globalEmpId; //this is the empId from URL
		if($('#bankName').val() && $('#accountName').val()){
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
		}else{
			swal("Please fill the compulsory fields.");
		}
	});

	$("#submitSalaryDetails").click(function(){
		
		var salaryDetails = $("#salaryDetails").serializeArray();
		console.log(salaryDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId= 'E1001';
		var empId = globalEmpId; //this is the empId from URL
		if($('#basic').val() && $('#hra').val() && $('#specialAllowance').val() && $('#grossSalary').val() && $('#totalEarnings').val()){
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
		}else{
			swal("Please fill the compulsory fields.");
		}
	});

	$("#submitOtherBenefitDetails").click(function(){
		
		var otherBenefitDetails = $("#otherBenefitDetails").serializeArray();
		console.log(otherBenefitDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId= 'E1001';
		var empId = globalEmpId; //this is the empId from URL
		if($('#festivalAllowance').val() && $('#pfMembership').val()){
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
		}else{
			swal("Please fill the compulsory fields.");
		}
	});

	$("#submitCompanyCarDetails").click(function(){
		
		var companyCarDetails = $("#companyCarDetails").serializeArray();
		console.log(companyCarDetails);
		event.preventDefault(); //to prevent form from auto submitting
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		//var empId= 'E1001';
		var empId = globalEmpId; //this is the empId from URL
				
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
		//var globalEmpId = getUrlVars()["empId"]; //gives empid needed to search a perticular employee
		var empId = globalEmpId; //this is the empId from URL
				
		submitPayrollInformation(empId,personalCarDetails,'personalCar',function(status){
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
 		//var empId= 'E1001';
		var empId = globalEmpId; //this is the empId from URL

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

