$(document).ready(function(){
	console.log("Jquery notifications requests Loaded");
	var empId = localStorage.empId;
	
	fetchNotifications(empId,'isRead',function(status,data){
		if(status){
			//$("#pedningNoti").html(data.length); 
			console.log("came back");
			for( var i = 0; i < data.length; i++ )
		    {
		    	//console.log("came inside loop");
				var notificationListObject = '<div class="item">'+
				'    <div class="item-head">'+
				'        <div class="item-details">'+
				'            <i class="fa fa-bell-o"></i>'+
				'            <a href="'+data[i].get('link')+'.html" class="item-name primary-link">'+data[i].get('title')+'</a>'+
				'            <span class="item-label">'+data[i].get("type")+'</span>'+
				'        </div>'+
				'        <span class="item-status">'+
				'            <span class="item-label">'+dateTimeString(data[i].get('startDate'))+'</span>'+
				'    </div>'+
				'    <div class="item-body" id="notiBody">'+data[i].get('body')+'</div>'+
				'</div>';

				$("#notificationList").prepend(notificationListObject);
			}
		}
	});
}); 