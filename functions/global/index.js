//var empObject = JSON.parse(localStorage.empObject);
//var name = empObject.name;
var name = "Guru";

//console.log(localStorage.empId);
console.log(name);

if (location.pathname == "/pages/approvals.html") {
    var approvals = 'start active open';   
}
else if (location.pathname == "/pages/inputRequests.html") {
    var inputRequests = 'start active open';

    checkInputTable(empId,function(status,data){
        if(status){
            var awaitingResponses = data.length;            
        }else{
            //swal("Error!", "No input requests for you", "info")
        }
    });
}
else if (location.pathname == "/pages/clarifications.html") {
    var clarifications = 'start active open';
}
else if (location.pathname == "/pages/drafts.html") {
    var drafts = 'start active open';
}
else if (location.pathname == "/pages/inProgress.html") {
    var inProgress = 'start active open';
}
else if (location.pathname == "/pages/participated.html") {
    var participated = 'start active open';
}
else if (location.pathname == "/pages/approved.html") {
    var approved = 'start active open';
}
else if (location.pathname == "/pages/rejected.html") {
    var rejected = 'start active open';
}
else if (location.pathname == "/pages/controlPanel.html") {
    var admin = 'start active open';
}

var awaitingResponses = "";

var sidebar = '<div class="page-sidebar-wrapper">'+
'                <!-- BEGIN SIDEBAR -->'+
'                <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->'+
'                <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->'+
'                <div class="page-sidebar navbar-collapse collapse" >'+
'                    <!-- BEGIN SIDEBAR MENU -->'+
'                    <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->'+
'                    <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->'+
'                    <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->'+
'                    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->'+
'                    <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->'+
'                    <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->'+
'                    <ul class="page-sidebar-menu   " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">'+
'                        <li class="heading">'+
'                            <h3 class="uppercase">My Tasks</h3>'+
'                        </li>'+
'                        <li class="nav-item '+ approvals +' ">'+
'                            <a href="pages/approvals.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-check-square-o"></i>'+
'                                <span class="title">Approvals</span>'+
'                                <span class="selected"></span>'+
'                                <span class="badge badge-danger">5</span>'+
'                            </a>'+
'                        </li>'+
'                        <li class="nav-item '+ inputRequests +' ">'+
'                            <a href="pages/inputRequests.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-sticky-note"></i>'+
'                                <span class="title">Input Requests</span>'+
'                                <span class="badge badge-danger">1</span>'+
'                            </a>'+
'                        </li>'+
'                        <li class="nav-item '+ clarifications +' ">'+
'                            <a href="pages/clarifications.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-comments"></i>'+
'                                <span class="title">Clarifications</span>'+
'                                <span class="badge badge-danger">3</span>'+
'                            </a>'+
'                        </li>'+
'                        <li class="heading">'+
'                            <h3 class="uppercase">My Items</h3>'+
'                        </li>'+
'                        <li class="nav-item '+ drafts +' ">'+
'                            <a href="pages/drafts.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-pencil-square-o"></i>'+
'                                <span class="title">Drafts</span>'+
'                                <span class="badge badge-danger">5</span>'+
'                            </a>'+
'                        </li>'+
'                        <li class="nav-item '+ inProgress +' ">'+
'                            <a href="pages/inProgress.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-hourglass-1"></i>'+
'                                <span class="title">In Progress</span>'+
'                                <span class="badge badge-danger">4</span>'+
'                            </a>'+
'                        </li>'+
'                        <li class="nav-item '+ participated +' ">'+
'                            <a href="pages/participated.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-group"></i>'+
'                                <span class="title">Participated</span>'+
'                                <span class="badge badge-danger">3</span>'+
'                            </a>'+
'                        </li>'+
'                        <li class="nav-item '+ approved +' ">'+
'                            <a href="pages/approved.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-check"></i>'+
'                                <span class="title">Approved</span>'+
'                                <span class="badge badge-danger">3</span>'+
'                            </a>'+
'                        </li>  '+
'                        <li class="nav-item '+ rejected +' ">'+
'                            <a href="pages/rejected.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-remove"></i>'+
'                                <span class="title">Rejected</span>'+
'                                <span class="badge badge-danger">3</span>'+
'                            </a>'+
'                        </li>  '+
'                        <li class="heading">'+
'                            <h3 class="uppercase">Admin</h3>'+
'                        </li>'+
'                        <li class="nav-item '+ admin +' ">'+
'                            <a href="pages/controlPanel.html" class="nav-link nav-toggle">'+
'                                <i class="fa fa-gear"></i>'+
'                                <span class="title">Control Panel</span>'+
'                            </a>'+
'                        </li>                          '+
'                    </ul>'+
'                    <!-- END SIDEBAR MENU -->'+
'                </div>'+
'                <!-- END SIDEBAR -->'+
'            </div>';



var header = '<div class="page-header navbar navbar-fixed-top">'+
'            <!-- BEGIN HEADER INNER -->'+
'            <div class="page-header-inner ">'+
'                <!-- BEGIN LOGO -->'+
'                <div class="page-logo">'+
'                    <a href="index.html">'+
'                        <img src="assets/layouts/layout4/img/logo-light.png" alt="logo" class="logo-default" /> </a>'+
'                    <div class="menu-toggler sidebar-toggler">'+
'                        <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->'+
'                    </div>'+
'                </div>'+
'                <!-- END LOGO -->'+
'                <!-- BEGIN RESPONSIVE MENU TOGGLER -->'+
'                <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>'+
'                <!-- END RESPONSIVE MENU TOGGLER -->'+
'                <!-- BEGIN PAGE ACTIONS -->'+
'                <!-- DOC: Remove "hide" class to enable the page header actions -->'+
'                <div class="page-actions hide">'+
'                    <div class="btn-group">'+
'                        <button type="button" class="btn red-haze btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">'+
'                            <span class="hidden-sm hidden-xs">Actions </span>'+
'                            <i class="fa fa-angle-down"></i>'+
'                        </button>'+
'                        <ul class="dropdown-menu" role="menu">'+
'                            <li>'+
'                                <a href="javascript:;">'+
'                                    <i class="icon-docs"></i> New Post </a>'+
'                            </li>'+
'                            <li>'+
'                                <a href="javascript:;">'+
'                                    <i class="icon-tag"></i> New Comment </a>'+
'                            </li>'+
'                            <li>'+
'                                <a href="javascript:;">'+
'                                    <i class="icon-share"></i> Share </a>'+
'                            </li>'+
'                            <li class="divider"> </li>'+
'                            <li>'+
'                                <a href="javascript:;">'+
'                                    <i class="icon-flag"></i> Comments'+
'                                    <span class="badge badge-success">4</span>'+
'                                </a>'+
'                            </li>'+
'                            <li>'+
'                                <a href="javascript:;">'+
'                                    <i class="icon-users"></i> Feedbacks'+
'                                    <span class="badge badge-danger">2</span>'+
'                                </a>'+
'                            </li>'+
'                        </ul>'+
'                    </div>'+
'                </div>'+
'                <!-- END PAGE ACTIONS -->'+
'                <!-- BEGIN PAGE TOP -->'+
'                <div class="page-top">'+
'                    <!-- BEGIN HEADER SEARCH BOX -->'+
'                    <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->'+
'                    '+
'                    <!-- END HEADER SEARCH BOX -->'+
'                    <!-- BEGIN TOP NAVIGATION MENU -->'+
'                    <div class="top-menu">'+
'                        <ul class="nav navbar-nav pull-right">'+
'                            <li class="separator hide"> </li>'+
'                            <!-- BEGIN NOTIFICATION DROPDOWN -->'+
'                            <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->'+
'                            <!-- DOC: Apply "dropdown-hoverable" class after "dropdown" and remove data-toggle="dropdown" data-hover="dropdown" data-close-others="true" attributes to enable hover dropdown mode -->'+
'                            <!-- DOC: Remove "dropdown-hoverable" and add data-toggle="dropdown" data-hover="dropdown" data-close-others="true" attributes to the below A element with dropdown-toggle class -->'+
'                            <li class="dropdown dropdown-extended dropdown-notification dropdown-dark" id="header_notification_bar">'+
'                                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">'+
'                                    <i class="icon-bell"></i>'+
'                                    <span class="badge badge-success"> 7 </span>'+
'                                </a>'+
'                                <ul class="dropdown-menu">'+
'                                    <li class="external">'+
'                                        <h3>'+
'                                            <span class="bold">12 pending</span> notifications</h3>'+
'                                        <a href="page_user_profile_1.html">view all</a>'+
'                                    </li>'+
'                                    <li>'+
'                                        <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">just now</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-success">'+
'                                                            <i class="fa fa-plus"></i>'+
'                                                        </span> New user registered. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">3 mins</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-danger">'+
'                                                            <i class="fa fa-bolt"></i>'+
'                                                        </span> Server #12 overloaded. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">10 mins</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-warning">'+
'                                                            <i class="fa fa-bell-o"></i>'+
'                                                        </span> Server #2 not responding. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">14 hrs</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-info">'+
'                                                            <i class="fa fa-bullhorn"></i>'+
'                                                        </span> Application error. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">2 days</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-danger">'+
'                                                            <i class="fa fa-bolt"></i>'+
'                                                        </span> Database overloaded 68%. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">3 days</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-danger">'+
'                                                            <i class="fa fa-bolt"></i>'+
'                                                        </span> A user IP blocked. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">4 days</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-warning">'+
'                                                            <i class="fa fa-bell-o"></i>'+
'                                                        </span> Storage Server #4 not responding dfdfdfd. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">5 days</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-info">'+
'                                                            <i class="fa fa-bullhorn"></i>'+
'                                                        </span> System Error. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                            <li>'+
'                                                <a href="javascript:;">'+
'                                                    <span class="time">9 days</span>'+
'                                                    <span class="details">'+
'                                                        <span class="label label-sm label-icon label-danger">'+
'                                                            <i class="fa fa-bolt"></i>'+
'                                                        </span> Storage server failed. </span>'+
'                                                </a>'+
'                                            </li>'+
'                                        </ul>'+
'                                    </li>'+
'                                </ul>'+
'                            </li>'+
'                            <!-- END NOTIFICATION DROPDOWN -->'+
'                            <li class="separator hide"> </li>'+
'                            <!-- BEGIN TODO DROPDOWN -->'+
'                            <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->'+              
'                            <!-- END TODO DROPDOWN -->'+
'                            <!-- BEGIN USER LOGIN DROPDOWN -->'+
'                            <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->'+
'                            <li class="dropdown dropdown-user dropdown-dark">'+
'                                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">'+
'                                    <span class="username username-hide-on-mobile"> '+name+' </span>'+
'                                    <!-- DOC: Do not remove below empty space( ) as its purposely used -->'+
'                                    <img alt="" class="img-circle" src="assets/layouts/layout4/img/avatar9.jpg" /> </a>'+
'                                <ul class="dropdown-menu dropdown-menu-default">'+
'                                    <li>'+
'                                        <a href="myProfile.html">'+
'                                            <i class="icon-user"></i> My Profile </a>'+
'                                    </li>'+
'                                    <li>'+
'                                        <a href="app_todo_2.html">'+
'                                            <i class="icon-rocket"></i> My Tasks'+
'                                            <span class="badge badge-success"> 7 </span>'+
'                                        </a>'+
'                                    </li>'+
'                                    <li class="divider"> </li>'+
'                                    <li>'+
'                                        <a href="page_user_lock_1.html">'+
'                                            <i class="icon-lock"></i> Lock Screen </a>'+
'                                    </li>'+
'                                    <li>'+
'                                        <a href="index.html" onclick="clearLocalStorage()">'+
'                                            <i class="icon-key"></i> Log Out </a>'+
'                                    </li>'+
'                                </ul>'+
'                            </li>'+
'                            <!-- END USER LOGIN DROPDOWN -->'+
'                            <!-- BEGIN QUICK SIDEBAR TOGGLER -->'+
'                           '+
'                            <!-- END QUICK SIDEBAR TOGGLER -->'+
'                        </ul>'+
'                    </div>'+
'                    <!-- END TOP NAVIGATION MENU -->'+
'                </div>'+
'                <!-- END PAGE TOP -->'+
'            </div>'+
'            <!-- END HEADER INNER -->'+
'        </div>';
	



var footer = '<div class="page-footer">'+
'            <div class="page-footer-inner"> 2017 © HRIS '+
'                <a target="_blank" href="">ADN Telecom</a>  | '+
'                <a >Fluidonomics Solutions</a>'+
'            </div>'+
'            <div class="scroll-to-top">'+
'                <i class="icon-arrow-up"></i>'+
'            </div>'+
'        </div>';
	


//this function will clear localStorage on logout
function clearLocalStorage() {
   localStorage.clear();
   console.log("Cleared Local Storage");
};
/*
checkInputTable(empId,function(status,data){
        if(status){
            var awaitingResponses = data.length;            
        }else{
            //swal("Error!", "No input requests for you", "info")
        }
});
*/

