<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title>模块管理</title>
</head>
<body>
   <script type="text/javascript">
       window.basePath = "<%=request.getContextPath() %>";
       window.appPath = "<%=request.getContextPath() %>/controller/module/App.js";
   </script>
   <script type="text/javascript" src="<%=request.getContextPath()%>/plugins/My97DatePicker/WdatePicker.js"></script>
   <script type="text/javascript"     src="<%=request.getContextPath() %>/plugins/require/require.js"
           data-main="<%=request.getContextPath() %>/controller/config"></script>
</body>
</html>