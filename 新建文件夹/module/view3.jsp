<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" ng-app="app">
<head>
  <meta charset="utf-8">
  <title>My AngularJS App</title>
  <link rel="stylesheet" href="${contextPath}/css/app.css"/>
  <link rel="stylesheet" href="${contextPath}/css/table3.css"/>
  <link rel="stylesheet" href="${contextPath}/css/main3.css"/>
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body ng-controller="mainCtrl">
  <div class="main">
        <div class="head">
          <div class="logo">
            <img src="${contextPath}/img/logo.png">
          
          </div>
          <div class="nav clearfix">
              <ul ng-cloak class="ng-cloak">
                <li id="name"  ng-repeat="item in menuData" ng-click="toggleMenu(item, $event)"  
                   ng-class="{true: 'active', false: 'inactive'}[item.$$isExpend]"  >
                  <img ng-src="${contextPath}/img/ico[[item.id]].png" alt="">
                  <a href="#/">[[item.name]]</a>
                  
                </li>
         
              </ul>
          </div>
          <div class="right-head">
               <div><img src="${contextPath}/img/user.png"><span>超级管理员</span> <img src="${contextPath}/img/quit.png"> <span>退出</span></div>
               <div><span>错误</span><img src="${contextPath}/img/ico10.png"><span>1</span> <span>警告</span> <img src="${contextPath}/img/ico8.png"><span>2</span><span>提示</span><img src="${contextPath}/img/ico9.png"><span>3</span></div>  
             <!--   <div><img src="./img/time.png">2017-11-17</div> -->
              
          </div>
           
        </div>
  
        <div class="content">
         
          <div class="left-menu">
                     <!-- <div class="first-menu active clearfix" >
                      <div  style="height:40px;line-height:40px" > <img src="${contextPath}/img/user.png"> </div>
                      <div  style="width: 100px; text-align: left;  margin-left: 20px; line-height: 40px;" ng-hide="leftItem">
                         超级管理员
                      </div>  
                   </div>  -->            
                   <div id="home" class="first-menu active clearfix" >
                      <div  style="height:40px;line-height:40px" > <img src="${contextPath}/img/ico_home.png"> </div>
                      <div  style="width: 100px; text-align: left;  margin-left: 20px; line-height: 40px;" ng-hide="leftItem">
                       <a href="#/">首页</a>
                      </div> 
                     
                   </div> 
                   <ul class="drop-menu ng-cloak"  >
                      <li ng-repeat="item in menuData" >
                         <div class="first-menu clearfix">
                            <div style="height:40px;line-height:40px"> <img src="${contextPath}/img/ico_data.png"> </div> 
                            <div class="second-menu " ng-click="toggleMenu(item, $event)" ng-hide="leftItem"> <span class="wrap-text" ng-hide="leftItem" >[[item.name]]</span> </div>
                            <div style="height:40px;width:20px"  class="[[getItemIcon(item)]]" > </div>
                        </div>                      
                         <ul  ng-show="item.$$isExpend">
                            <li  ng-repeat="item in item.childrens" 
                                ng-class="{true: 'active', false: 'inactive'}[item.$$isExpend]"
                                ng-click="itemActive(item,$event)"
                                 >
                                    <div class="first-menu clearfix">
                                     
                                      <div style="margin-left:20px" class="second-menu " ng-click="itemShow(item, $event)" ng-hide="leftItem">
                                      <span class="wrap-text" ng-if="!isLeaf(item)"  >[[item.name]]</span> 
                                      <a ng-if="isLeaf(item)" href="#/[[item.url]]">[[item.name]]</a>
                                      </div>
                                      <div style="height:40px;width:20px" class="[[getItemIcon(item)]]" > </div>
                                    </div>                             
                                    <ul    ng-show="item.$$isExpend">
                                      <li class="leaf" ng-repeat="item in item.childrens" 
                                          ng-class="{active:selected==item.id}"
                                          ng-click="itemActive(item,$event)"
                                         >
                                        <a href="#/[[item.url]]">[[item.name]]</a>  
                                     </li>
                                 </ul>

                          
                           </li>
                         </ul>
                      </li>
                    
                      
                   </ul>
                   <div id="arrow-flag" class="arrow-hide"  ng-click="showLeft()"></div>
            </div>
         
            
              <div  class="chart-main"    > 
                <!--   <div class="sel-menu">
                    
                        <ul>
                           <li><a href="#/">首页</a> <i class="arrow-down"></i></li>
                           <li ng-repeat="selMenu in  selMenus"> 
                             <a href="#[[selMenu.url]]">[[selMenu.name]]</a> <i ng-click="delMenu(selMenu.id)"  class="arrow-down"></i> 
                           </li>
                         </ul>
                          <div style="float:right"><span>错误</span><img src="./img/ico10.png"><span>1</span> <span>警告</span> <img src="./img/ico8.png"><span>2</span><span>提示</span><img src="./img/ico9.png"><span>3</span></div>   
                  </div> -->
                  <div ng-view ></div> 
              </div>
       
            
                  
        </div>
    </div>  
      <script src="http://cdn.static.runoob.com/libs/jquery/2.1.4/jquery.min.js"></script>       
   <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
   <script src="https://apps.bdimg.com/libs/angular-route/1.3.13/angular-route.js"></script>
   <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular-animate.min.js"></script>
   <script src="https://cdn.bootcss.com/echarts/3.8.5/echarts-en.common.min.js "></script>
   <script src="${contextPath}/angular/js/commCtrl.js"></script>
   <script src="${contextPath}/angular/js/directives.js"></script>
   <script src="${contextPath}/angular/js/index.js"></script>
   <script src="${contextPath}/angular/js/chart3.js"></script>
   <script src="${contextPath}/angular/js/data_standard/dataSource.js"></script>
   <script src="${contextPath}/angular/js/data_standard/dataTable.js"></script>
    <script src="${contextPath}/angular/js/data_standard/baseTable.js"></script>
     <script id="curTable.html" type="text/ng-template">  
          <div class="table" id="[[tbId]]" data-ng-init="load()">
   <div id="dataHeader">
    <div class="thead" style="width:100%">
    <table style="width:100%">
      <tr>
        <td style="text-align: center" ng-if="dataset.data.items.length&&dataset.info.index">
          <span>序号</span>
        </td>
        <td style="text-align: center"  ng-if="dataset.info.multiselect&&dataset.data.items.length"><span
          class="selall" ng-click="sellallclick($event)">全选</span></td>
        <td ng-repeat="item in dataset.title" title="[[item.title]]"
          ng-click="col_order(item.fieldname)">[[item.title]]</td>
        <td style="text-align: center" ng-if="(dataset.info.edit||dataset.info.del||dataset.info.edit||dataset.info.delete||dataset.info.dispose)&&dataset.data.items.length">操作</td>       
        <td>
        </td>
      </tr>
    </table>
  </div>
  </div>
  <div id="dataList">
  <div class="tcontent">
  <div style="padding: 12px;font-size: 14px;" ng-if="!dataset.data.items.length">没有找到相关内容</div>
    <table class="tbody" style="width:100%">
		<tbody style="width:100%">
      <tr ng-repeat="item in dataset.data.items"
        on-Finish-Render-Filter ">
        
        <td ng-if="dataset.data.items.length" style="text-align: center" rowspan="[[item.num==undefined?1:item.num>0?item.num:0]]">
          <span>[[$index+1]]</span>
        </td>
        
        <td ng-if="dataset.info.multiselect"><span class="onsel"></span></td>     
        <td ng-repeat="i in dataset.title"
          ng-class="(i.datatype!='num'&&i.datatype!='money')?'tb_left':'tb_right'" ng-bind-html="curFormat({file:i.fieldname,value:item[i.fieldname],id:item[dataset.info.sortname],ed:rightInfo.edit,item:item})||cu_dataformat(i.fieldname,i.datatype,item[i.fieldname])" >
        </td>

     <td ng-if="dataset.info.edit||dataset.info.del||dataset.info.edit||dataset.info.delete||dataset.info.dispose" class="edit">
          <a ng-if="dataset.info.edit" ng-click="edit({item:item})">修改</a>
          <a ng-if="dataset.info.del" ng-click="del({item:item})">预览</a>
          <a ng-if="dataset.info.delete" ng-show="(item.verifyState==undefined) || item.verifyState==0" ng-click="delete({id:item[dataset.info.sortname],ver:item})">删除 </a>
          <a ng-if="dataset.info.dispose" ng-click="dispose({item:item})">测试连接</a>
		<a ng-if = "dataset.info.synchronous" ng-click="synchronous({item:item})"> 同步表结构</a>
		<a ng-if = "dataset.info.updatetable" ng-click="updatetable({item:item})"> 更新预览表结构</a
        </td> 
        
        
        
        
        <td>
        </td>
      </tr>
	</tbody>
    </table>

  </div>
  </div>
  <div id="dataFooter">
  <div class="pagesize" ng-if="dataset.info.toolbar">
    <div class="p_1">
      <span>每页显示:</span> <a ng-click="pageclick($event,{pagesize:10})"
        class="aActive">10</a> <a ng-click="pageclick($event,{pagesize:20})">20</a>
      <a ng-click="pageclick($event,{pagesize:50})">50</a> <a
        ng-click="pageclick($event,{pagesize:100})">100</a>
    </div>
    <input type="button" value="跳转" class="btn"
      ng-click="pageclick($event,{tzistrue:true})"> <input
      type="text" class="txtBox" onpaste="return false"  onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"  placeholder="1" value="{{dataset.info.curpage}}">
    <div class="p_2">
      <a ng-click="pageclick($event,{upage:true})">上一页</a> <span>[[dataset.info.curpage]]/[[dataset.info.total]]</span>
      <a ng-click="pageclick($event,{upage:false})" class="pactive">下一页</a>
    </div>
  </div>
  </div>
  <div class="box_shadow"></div>
</div>  
 
    </script>   
   
   <script type="text/javascript">
      var  height=$(window).height();
      var  width=$(window).width();
         $('.chart-main').height(height-80);
         $('.chart-main').width(width-170);
         $('.content').width(width);
        $('.content').height(height-50);
        $('.left-menu').height(height-50);
         console.log(height,width);

   </script>
   
   </body> 
   </html> 
