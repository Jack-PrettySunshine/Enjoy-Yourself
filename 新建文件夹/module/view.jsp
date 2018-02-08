<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <title>${pageTitle}</title>
    	<script type="text/javascript" src="${contextPath}/plugins/jquery-1.11.1.min.js"></script>
    </head>
    <body>
    	<input type="hidden" id="is_main_window" value="true"/>
        <script type="text/javascript" src="${contextPath}/plugins/jQueryCookie/jquery.cookie.js"></script>
	    <script type="text/javascript" src="${contextPath}/plugins/base64-quick.js"></script>
	    <script type="text/javascript">
	    	$(document).ready(function(){
	    		var username = '${username}';
	    		var password = '${password}';
	    		var realname = '${realname}';
	    		$.cookie("token", BASE64.encoder(username+":"+password));
				window.token = BASE64.encoder('${username}:${password}');
				window.username = username;
				window.realname = realname;
				window.basePath = '${contextPath}';
				window.appPath  = "${contextPath}/controller/main/Main.js";
	    	});
	    </script>
		<script type="text/javascript" 	
				src="${contextPath}/plugins/require/require.js"
				data-main="${contextPath}/controller/config">
		</script>
    </body>
</html>