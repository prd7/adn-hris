$(document).ready(function(){
	console.log("userProfile Jquery Loaded");
	console.log(localStorage.empId);
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
					checkStatus(empId,"personal"); //used to update input table of HR
					
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
					checkStatus(empId,"personal"); //used to update input table of HR
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
		/submitPersonal(empId,academicArray,type,function(status){
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
					checkStatus(empId,"personal"); //used to update input table of HR
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
					checkStatus(empId,"personal"); //used to update input table of HR	
			});
		});
		$("#familyDetails :input").attr("disabled", true);
	});


	//End of Jquery
});
