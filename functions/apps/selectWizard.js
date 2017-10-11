$(document).ready(function(){
	console.log("Jquery Loaded");
	$("#submitKraSel").click(function(){
		var dept =$("#seldept").find(":selected").text();
		console.log(dept);

		//var grade =$("#selgrade").find(":selected").val();
		var grade =$("#selgrade").val();
		console.log(grade);
		if(dept && grade){
			localStorage.searchDept=dept;
			localStorage.searchGrade=JSON.stringify(grade);
			window.location.href="select_table.html";
		}
		else{
			swal("Empty Values!", "Please mention department and grade!", "warning")
		}
	});
	
	$("#resetKraSel").on("click", function () {
		console.log("First");
		location.reload(true); //reloads the page
	});
});