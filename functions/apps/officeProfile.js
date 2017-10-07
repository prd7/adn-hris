$(document).ready(function(){
	console.log("Jquery officeProfile Loaded");
	var globalTypeId = getUrlVars()["typeId"];
	
	if(getUrlVars()["typeId"]){
		var globalTypeId = getUrlVars()["typeId"];

		var empIdArray = globalTypeId.split('_');
	    
	    var globalEmpId= empIdArray[1];
	}else{
		var globalEmpId = localStorage.empId;	
	}
	console.log(globalEmpId);
	
	checkStatus(globalEmpId,"office",function(result){
		var statusArray =results[0].get("statusOffice");

		var officeArray =results[0].get("officeDetails");
		var officePositionArray =results[0].get("officePositionDetails");
		var previousWorkArray =results[0].get("previousWorkDetails");
		var bankArray =results[0].get("bankDetails");
		var salaryArray =results[0].get("salaryDetails");
		var otherBenefitArray =results[0].get("otherBenefitDetails");
		var companyCarArray =results[0].get("companyCarDetails");
		var personalCarArray =results[0].get("personalCarDetails");
		console.log("fetch stuff here");
		//fetch and populate stuff here

		if(statusArray.officeInfoStatus){
			$("#officeInfo :input").attr("disabled", true);
			//$('#employeeId').text(officeArray.employeeId);
			$('#idcardNo').text(officeArray.idCardNo);
			$('#companyName').val(officeArray.companyName);
			$('#officePhoneNumber').text(officeArray.officePhone);
			$('#officeMobileNumber').text(officeArray.officeMobile);
			$('#officeEmailID ').text(officeArray.officeEmailId);
			$('#facility').text(officeArray.facility);
			$('#city').text(officeArray.city);
			$('#country').val(officeArray.country);
			$('#costCenter ').text(officeArray.costCenter);

		}
		if(statusArray.joiningDetailStatus){
			$('#dateOfJoining').text(officeArray.dateOfJoining);
			$('#dateOfConfirmation ').text(officeArray.dateOfConfirmation);
			$('#confirmationStatus').val(officeArray.stateOfConfirmation);
			$('#workPermitNumber').text(officeArray.workPermitNumber);
			$('#workPermitEffectiveDate ').text(officeArray.effectiveDate);
			$('#workPermitExpiryDate ').text(officeArray.expiryDate);

			$("#joiningDetails :input").attr("disabled", true);
		}
		if(statusArray.positionHistoryStatus){
			$('#jobTitle').text(officeArray.jobTitle);
			$('#employeeCategory').val(officePositionArray.employeeCategory);
			$('#employeeGrade').val(officePositionArray.employeeGrade);
			$('#division').val(officePositionArray.buisnessDivision);
			$('#department').val(officePositionArray.department);
			$('#verticalUnit').val(officePositionArray.vertical);
			$('#subVerticalUnit').val(officePositionArray.subVertical);
			//$('#reportingManagerSupervisor').val(officePositionArray.Group HR Head);
			$('#reviewer').val(officePositionArray.reviewer);
			$('#hrSpoc').val(officePositionArray.buisnessHrSpoc);
			$('#businessHrHead').val(officePositionArray.buisnessHrHead);
			$('#groupHrHead').val(officePositionArray.groupHrHead);

			$("#positionDetails :input").attr("disabled", true);
		}
		if(statusArray.performanceStatus){
			$('#performanceRatingFy1516').text(officeArray.pfRating1516);
			$('#performanceRatingFy1617').text(officeArray.pfRating1617);  

			$("#performanceDetails :input").attr("disabled", true);
		}
		if(statusArray.perviousEmploymentStatus){
			$('#companyName1').text(previousWorkArray.companyName);
			$('#companyBusiness').text(previousWorkArray.companyBuisness);
			$('#designationPrev').text(previousWorkArray.designation);
			$('#departmentPrev').text(previousWorkArray.department);
			$('#responsibility').text(previousWorkArray.responsibility);
			$('#companyLocation').text(previousWorkArray.companyLocation);
			$('#employmentPeriod').text(previousWorkArray.employmentPeriod);
			$('#areaOfExperience').text(previousWorkArray.areaOfExperience);

			$("#previousEmploymentDetail :input").attr("disabled", true);
		}
		if(statusArray.bankStatus){
			$('#bankName').text(bankArray.bankName);
			$('#accountName').text(bankArray.accountName);
			$('#accountNumber').text(bankArray.accountNumber);
			$('#currency').val(bankArray.currency);

			$("#bankDetails :input").attr("disabled", true);
		}
		if(statusArray.salaryStatus){
			$('#basic').text(salaryArray.basic);
			$('#hra').text(salaryArray.hra);
			$('#conveyanceAllowance').text(salaryArray.conveyanceAllowance);
			$('#lfa').text(salaryArray.lfa);
			$('#medicalAllowance').text(salaryArray.medicalAllowance);
			$('#specialAllowance').text(salaryArray.specialAllowance);
			$('#grossSalary ').text(salaryArray.grossSalary);
			$('#lunchAllowance').text(salaryArray.lunchAllowance);
			$('#mobileAllowance').text(salaryArray.mobileAllowance);
			$('#otherAllowance').text(salaryArray.otherAllowance);
			$('#totalEarnings ').text(salaryArray.totalEarnings);

			$("#salaryDetails :input").attr("disabled", true);
		}
		if(statusArray.otherBenefitStatus){
			$('#festivalAllowance').text(otherBenefitArray.festivalAllowance);
			$('#pfMembership').text(otherBenefitArray.providentFundMembership);
			$('#groupLifeInsurance').text(otherBenefitArray.groupLifeInsurance);
			$('#hospitalizationScheme').text(otherBenefitArray.hospitalizationScheme);

			$("#otherBenefitDetails :input").attr("disabled", true);
		}
		if(statusArray.companyCarStatus){
			$('#registrationNumber').text(companyCarArray.registrationNumber);
			$('#effectiveDate1').text(companyCarArray.effectiveDate);
			$('#expiryDate1').text(companyCarArray.expiryDate);
			$('#fuelAllowance').text(companyCarArray.fuelAllowance);
			$('#maintenanceAllowance').text(companyCarArray.maintainanceAllowance);
			$('#driverAllowance').text(companyCarArray.driverAllowance);
			$('#grossPay').text(companyCarArray.grossPay);

			$("#companyCarDetails :input").attr("disabled", true);
		}
		if(statusArray.personalCarStatus){
			$('#registrationNumber').text(personalCarArray.registrationNumber);
			$('#effectiveDate').text(personalCarArray.effectiveDate);
			$('#expiryDate').text(personalCarArray.expiryDate);
			$('#ownCarUsageAllowance').text(personalCarArray.ownCarUsageAllowance);			

			$("#personalCarDetails :input").attr("disabled", true);
		}
		if(statusArray.separationInfoStatus){
			$('#dateOfResignation').text(officeArray.dateOfResignation);
			$('#dateOfSeparation').text(officeArray.dateOfSeparation);
			$('#effectiveDate').text(officeArray.separationEffectiveDate);
			$('#separationType').val(officeArray.separationType);

			$("#separationDetails :input").attr("disabled", true);
		}

	});

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

