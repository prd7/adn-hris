$(document).ready(function(){
	$("#printFunction").click(function(){
	    window.print();
	});
	var dept=localStorage.searchDept;
	var grade=JSON.parse(localStorage.searchGrade);
	console.log("The searched dept is: "+dept);
	console.log("The searched grade array is: "+grade);

	selectWizard(dept,grade,function(status,results){
			console.log("Came inside selectWizard from Module.js");
		if(status){
			//console.log(JSON.stringify(results));
			populateList(results);
		}else{
			console.log("No employees found in selected qurey");
			swal({
				  title: "No employees found in selected qurey!",
				  text: " Please search again.",
				  type: "error",
				  showCancelButton: false,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Ok",
				  closeOnConfirm: false
				},
				function(){
					console.log("Came in Swal");
				  	window.location.href= "../pages/selectWizard.html";	
				});
		}
	});
	//goback button wokring
	$("#goBack").click(function(){
		clearLocalStorageSearch();
		window.location.href= "selectWizard.html";
		//this function will clear localStorage on logout
	});

	$("#sendBulkMail").click(function(){
		var tbl = $('#sample_2').DataTable();
		var counter = 0;
		var initiatorId = localStorage.empId;
		swal({
				  title: "Initiate Bulk Mail?",
				  text: "You will be redirected to send Bulk Email to selected employees!",
				  type: "info",
				  showCancelButton: true,
				  confirmButtonClass: "btn-error",
				  confirmButtonText: "Yes,Initiate!",
				  closeOnConfirm: false
				},
				function(){
					//fill the selected values in array
					var emailArray = [];
					$.each($("input[type='checkbox']:checked"), function(){            
			            var data = $(this).val();
			            console.log(data);
						var dataArray = data.split('+');           
		                emailArray.push(dataArray[1]);
			        });
					console.log(emailArray);
					
					localStorage.sendBulkMail = JSON.stringify(emailArray);
					/*for(var i=0;i<empArray.length;i++){
						localStorage.searchEmpArray[i]= empArray[i];
					}*/
					console.log(localStorage.sendBulkMail);
					window.location.href= "email.html";	
					
			});

	});

	$(".initKra").click(function(){
		var tbl = $('#sample_2').DataTable();
		var counter = 0;
		
		//takes in initiator id as the person starting this
		var initiatorId = localStorage.empId;
		swal({
				  title: "Initiate KRA?",
				  text: "KRA will be initated for selected employees!",
				  type: "info",
				  showCancelButton: true,
				  confirmButtonClass: "btn-error",
				  confirmButtonText: "Yes,Initiate!",
				  closeOnConfirm: false
				},
				function(){
					//fill the selected values in array
					var empArray = [];
					$.each($("input[name='tableSelect']:checked"), function(){            
			                var data = $(this).val();
							var dataArray = data.split('+');           
			                empArray.push(dataArray[0]);
			        });
					//if loop checks for the empArray to not be empty
					if(empArray && empArray.length>0){
						//initiate for selected array
						batchInitialize(empArray, initiatorId, "KRA", function(){
							swal({
								  title: "Action initiated!",
								  text: "Action initiated for selected employees.",
								  type: "success",
								  showCancelButton: false,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Ok",
								  closeOnConfirm: false
								},
								function(){
								  	window.location.href= "controlPanel.html";	
							});
						});
					}else{
						swal("Please select at least one entry.");
					}
			});
	});

	 //learning initiate button from the drop down
	$(".initLearning").click(function(){
		var tbl = $('#sample_2').DataTable();
		var counter = 0;
		var initiatorId = localStorage.empId;
		swal({
				  title: "Initiate Learning?",
				  text: "Learning will be initated for selected employees!",
				  type: "info",
				  showCancelButton: true,
				  confirmButtonClass: "btn-error",
				  confirmButtonText: "Yes,Initiate!",
				  closeOnConfirm: false
				},
				function(){
					//fill the selected values in array
					var empArray = [];
					$.each($("input[name='tableSelect']:checked"), function(){ 
							var data = $(this).val();
							var dataArray = data.split('+');           
			                empArray.push(dataArray[0]);
			        });
			        console.log(empArray);
					//if loop checks for the empArray to not be empty
					if(empArray && empArray.length>0){
						//batch initiate for selected entries
						batchInitialize(empArray, initiatorId, "Learning", function(){
							swal({
								  title: "Action initiated!",
								  text: "Action initiated for selected employees.",
								  type: "success",
								  showCancelButton: false,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Ok",
								  closeOnConfirm: false
								},
								function(){
								  	window.location.href= "controlPanel.html";	
							});
						});
					}else{
						swal("Please select at least one entry.");
					}
			});	
	});

});

//function to populate bootstrap datatable
function populateList(data){

	var t = $('#sample_2').DataTable();

	for(i=0;i<data.length;i++){
		var empId = data[i].get('empId');
		var name = data[i].get('name');
		var dept = data[i].get('department');
		var grade = data[i].get('employeeGrade');
		var checkboxClass = 'checkboxSel'+i;
		var checkbox = '<input id="btSelectItem'+i+'" type="checkbox" value="'+data[i].get('empId')+'+'+data[i].get('officeEmail')+'" name="tableSelect">';
		//var checkbox = '<input id="btSelectItem'+i+'" type="checkbox" value="'+data[i].get('empId')+'"_"'+data[i].get('employeeGrade')+'" name="tableSelect">';
		t.row.add([checkbox,empId,name,dept,grade]).draw(false);
	}	
}

//clearLocalStorageSearch
function clearLocalStorageSearch() {
			//localStorage.removeItem(localStorage.searchGrade);
			//localStorage.removeItem(localStorage.searchDept);
			//window.localStorage.removeItem(localStorage.searchDept);
			console.log(localStorage.searchDept);
	        //alert("Cleared Local Storage");
	        //alert(localStorage.searchDept);
};	