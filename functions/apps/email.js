$(document).ready(function(){
	console.log("Jquery Loaded");
	$("#printFunction").click(function(){
	    window.print();
	});

	if(localStorage.sendBulkMail){
		console.log("Email ids present in localStorage");
		var emailArray = JSON.parse(localStorage.sendBulkMail);
	}else{
		swal({
				  title: "No Email Selected!",
				  text: "Please select employees.",
				  type: "error",
				  showCancelButton: false,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Ok",
				  closeOnConfirm: false
				},
				function(){
				  	window.location.href= "selectWizard.html";	
			});
	}
	var emailArrayString = '';
	for(i=0;i<emailArray.length;i++){
		if(i==0){
			emailArrayString = emailArray[i];	
		}else{
			emailArrayString = emailArrayString +', '+emailArray[i];
		}
	}
	$("#emailTo").val(emailArrayString);


	$("#emailSend").click(function(){
		event.preventDefault();
		
		var emailArrayString = $("#emailTo").val();
		
		console.log(emailArray);
		var emailSubject = $("#emailSubject").val();
		var emailBody = $("#emailBody").val();
		
		//pass values to sendMail function to send mails
		sendEmail(emailArrayString,'',emailSubject,emailBody,function(status){
			console.log("Sent Email Status "+status);
			swal("Email sent to test ids");
		});
	});
});

//function to calidate list of emails
function validategroupemail(emailArray) {  
  var emailList= emailArray.split(',');
  //directly taking the email ids from the tag
  //var emailList= $("#emailTo").val().split(',');
    for (i=0;i<emailList.length;i++)
    {
       var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       return regex.test(emailList[i]);
    }
}

//function to validate a single email
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}