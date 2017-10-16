$(document).ready(function(){
	console.log("Jquery Loaded");
/*
    if(localStorage.empId){
		console.log(localStorage.empId);
		console.log(localStorage.empObject);
		var empObject = JSON.parse(localStorage.empObject);
	} 
*/

$("#printFunction").click(function(){
    window.print();
});

	$("#submitForm").click(function(){
		var name = $("#name").val();
		var empId = $("#empId").val();
		console.log(name);
		console.log(empId);
		if(name && empId){
			validateEmpId(empId,function(status){
				if(status)
				{
					console.log("Its validated and clicked");
					var emp = $("#form_sample_3").serializeArray();
					console.log(emp);
					event.preventDefault();

					console.log("Form Submitted successfully!");
					addEmployee(emp,function(status){
					console.log("Array employee added");
					swal("Success!", "New Employee Created!", "success")
					$("#form_sample_3").trigger('reset');
					});	
				}
				else{
					swal("Error!", "Employee ID already exists!", "warning")
				}
			});
		}
		else{
			swal("Error!", "Please enter Name and Employee Id", "warning")
		}
	});
	
	
});
