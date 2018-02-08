
        
      angular.module('app',['ngRoute','myApp.directives','ngAnimate'])
                   .controller('mainCtrl', ['$scope','$http', function($scope,$http){
                    
                         $scope.menuData=[{id:1,name:"数据汇聚",childrens:[{id:11 ,name:"数据源管理",childrens:[{id:111,name:"源数据注册",url:'finance',}]}, {id:12 ,name:"汇聚任务管理",childrens:[{id:121,name:"向导式操作"}]}, {id:13 ,name:"整合异常监控",childrens:[{id:131,name:"调度服务管理"}]}]},                                                                                                                                                                                                                  
                                          {id:2,name:"数据编目",childrens:[ {id:21 ,name:"数据资源编目",childrens:[{id:111,name:"源数据注册",url:'finance',}]},{id:22 ,name:"目录查询",childrens:[{id:221,name:"向导式操作"}]}, {id:23 ,name:"数据标准管理",childrens:[{id:231,name:"数据源管理"}]}, ]},
                                          {id:3,name:"数据标准化",childrens:[{id:31,name:"数据源管理",url:'dataSource'},{id:31,name:"数据表管理",url:'dataTable'},{id:31,name:"基础表管理",url:'baseTable'}]},
                                          {id:4,name:"数据质量",childrens:[ {id:11 ,name:"数据源管理",childrens:[{id:111,name:"源数据注册"}]}, {id:12 ,name:"汇聚任务管理",childrens:[{id:121,name:"向导式操作"}]}, {id:13 ,name:"整合异常监控",childrens:[{id:131,name:"调度服务管理"}]}, ]},
                                          {id:5,name:"分析建模",},
                                          {id:6,name:"数据服务",},
                                          {id:7,name:"数据安全",}];
                         
                       
                         $scope.selMenus=[];
                        var firstMenu ,secondMenu;      
                        var menuUrl="http://localhost:8080/console/module/treeList.do";                   
                       
                  /*   $http({
                          method: 'GET',
                          url: menuUrl}).
                     success(function(data) {
                    	 $scope.menuData=data;
                     }).
                     error(function(data, status, headers, config) {
                     
                     });*/
                 
                
                        

                         function init(){
                                
                               angular.forEach($scope.menuData,function(data){
                                            data.$$isExpend=false;

                                             angular.forEach(data.childrens,function(value){
                                                   value.$$isExpend=false;
                                             })

                               })
                         }

                         init();

                                  $scope.toggleMenu=function(item, $event){
                                    
                                    angular.forEach($scope.menuData,function(data){
                                                 if (data.id==item.id){
                                                   
                                                     item.$$isExpend=!item.$$isExpend;
                                               

                                                 }else{
                                                    data.$$isExpend=false;

                                                 }
                                               
                                    });
                                    
                                 
                                    $scope.selected=item.id;
                                   $event.stopPropagation();
                         };
                         
                         $scope.getItemIcon = function(item){
                        	  var isLeaf = $scope.isLeaf(item);
                              
                              if(isLeaf){
                                return;
                              }          
                        	 
                             return item.$$isExpend ? 'arrow-left': 'arrow-down';   
                           };
                           
                         $scope.isLeaf = function(item){
                               return !item.childrens || !item.childrens.length; 
                              };   
                       
                         $scope.itemShow= function(item, $event){
                                    
                                   item.$$isExpend=!item.$$isExpend;                                      

                                   $event.stopPropagation();
                                   $scope.selected=item.id;
                                 
                         };

                       
                  
                 

                 

                  
                     
                    $scope.itemActive=function(item,$event){
                              


                                  $scope.selected=item.id;

                                  $scope.selMenus.push(item);

                                  $('#home').removeClass('active');
                                   $event.stopPropagation(); //冒泡导致selected取两次值且第一次undefine

                    }  
                 
                    $('#home').click(function(event) {
                   /* Act on the event */
                       $(this).addClass('active');
                 });
             
                 $scope.delMenu=function(item){
                                 
                                 console.log('item:'+angular.toJson(item));
                                  
                             angular.forEach($scope.selMenus,function(value,key){

                                    if (value.id==item) {
                                             
                                               $scope.selMenus.splice(key,1);
                                    };
                             })
                }




                               
                           }])
                                
                  .controller('financeCtrl', ['$scope','$http',function ($scope,$http){
                     var basePath='http://localhost:8080/console/';               
                	 var datasource_list = basePath + '/data_center/datasource/list.do';
                	var datasource_getByCategoryPrefix = basePath + '/data_center/datasource/getByCategoryPrefix.do';
             	    var datasource_add = basePath + '/data_center/datasource/add.do';
             		var datasource_addFIDataSource = basePath + '/data_center/datasource/addFIDataSource.do';
             		var datasource_update = basePath + '/data_center/datasource/update.do';
             		var datasource_updateFIDataSource = basePath + '/data_center/datasource/updateFIDataSource.do';
             		var datasource_delete = basePath + '/data_center/datasource/delete.do';

                 
                $scope.option= {
                  info: {
                      pagesize: 10, //每页显示
                      upage: false, //上一页
                      curpage: 1, //当前页
                      total: 1, //总页数
                      tzpage: 1, //跳转页
                      tzistrue: false, //是否跳转页
                      multiselect: true, //多选
                      toolbar: true,
                      sortname: 'id1',
                      sort: 'asc',
                      del: true, //详情
                      edit: true, //编辑
                      delete: true, //删除
                      dispose: true
                  },
                title: [   {"fieldname":"name","title":"数据资源名称"},
                           {"fieldname":"type","title":"数据资源类型"},
                           {"fieldname":"dbUrl","title":"数据源URL"},
                           {"fieldname":"dbUsername","title":"用户名"},
                           {"fieldname":"adminCompany","title":"管理单位"},
                           {"fieldname":"adminName","title":"管理员"},
                           {"fieldname":"adminPhone","title":"联系电话"},
                           {"fieldname":"status","title":"连接状态"},    ],
                data:[],
            
              };
                

         

              

          $scope.curFormat = function(file, value) {
            // console.log($scope.dataset);
            if(file=='enabled'&&value!=undefined){
                if(value==0)
                return $sce.trustAsHtml('禁用');
                else if(value==1)
                return $sce.trustAsHtml('启用');
              }
          }
        
          $scope.add=function(){
                 $scope.show=true;
           }


          
          $scope.edit=function(obj){

                console.log(angular.toJson(obj));

          }

       


           
          $scope.user = '';
          $scope.dbIp = '';
          $scope.dbPort = '';
          $scope.dbName = '';
          $scope.dbPassword = '';
          $scope.dbUsername = '';
          $scope.adminPhone = '';
         $scope.ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
         $scope.portReg =  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
         $scope.adminPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;//固话：/^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/
         
         $scope.isSubmit = true;
         $scope.check = function(){
        	 
         }
         

              $scope.tree=[
                              {
                                      id:"1",
                                      pid:"0",
                                      name:"家用电器",
                                      children:[
                                         {
                                            id:"4",
                                            pid:"1",
                                            name:"大家电"
                                         }
                                      ]
                                   },
                                   {
                                      id:"2",
                                      pid:"0",
                                      name:"家用电器",
                                      children:[
                                         {
                                            id:"5",
                                            pid:"2",
                                            name:"大家电"
                                         }
                                      ]
                                   },
                                   
                                ];

         
             

        }]).controller('restaurantCtrl', ['$scope','$http',function ($scope,$http){

     
          console.log("restaurantCtrl");



       }]).config(['$routeProvider','$interpolateProvider', function($routeProvider,$interpolateProvider){
                 'use strict'
				$interpolateProvider.startSymbol('[[');
			    $interpolateProvider.endSymbol(']]');
                
       
       
                $routeProvider
                .when('/', {
                        templateUrl: 'http://localhost:8080/console/angular/views/chart.html',
                        controller: 'companyCtrl'
                    })
                .when('/finance', {
                        templateUrl: 'http://localhost:8080/console/angular/views/table.html',
                        controller: 'financeCtrl'
                    })
                .when('/dataSource',{
                        templateUrl: 'http://localhost:8080/console/angular/views/data_standard/dataSourceManage.html',
                        controller: 'dataSourceCtrl'
                    })
                 .when('/baseTable',{
                        templateUrl: 'http://localhost:8080/console/angular/views/data_standard/baseTableManage.html',
                        controller: 'baseTableCtrl'
                    })
                  .when('/dataTable',{
                        templateUrl: 'http://localhost:8080/console/angular/views/data_standard/dataTableManage.html',
                        controller: 'dataTableCtrl'
                    })  
                .otherwise({redirectTo:'/'});
            }]).config(['$locationProvider', function($locationProvider) {
               $locationProvider.hashPrefix("");
         }]);
      
      
   
