$(document).ready(function(){
	/* //function to check wether the user is logged in
	var login = localStorage.loggedIn;
	if(!login){
		window.location.href= "../login.html";
	}*/
	var globalTypeId = getUrlVars()["typeId"];
	console.log(globalTypeId);
	console.log("Jquery Loaded");
	//checkInitiate();
	$("#approveKra").click(function(){
		swal({
				  title: "Kra Approved!",
				  text: " You successfully approved the KRA.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
					clearLocalStorage();
				  	window.location.href= "controlPanel.html";	
		});
	});
	$("sendBackKra").click(function(){
		swal({
				  title: "Kra Rejected!",
				  text: " You successfully rejected the KRA.",
				  type: "danger",
				  showCancelButton: false,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
					clearLocalStorage();
				  	//window.location.href= "controlPanel.html";	
		});
	});
	
});