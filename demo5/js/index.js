
      angular.module('app',['ngRoute','myApp.directives','ngAnimate'])
                   .controller('mainCtrl', function($scope){
                    
                         $scope.menuData=[{id:1,name:"数据汇聚",next:[{id:11 ,name:"数据源管理",next:[{id:111,name:"· 源数据注册",url:'finance'},{id:112,name:"· 目标源数据注册",url:'finance',}]}, {id:12 ,name:"汇聚任务管理",next:[{id:121,name:"· 向导式操作"},{id:121,name:"· 拖拽式操作"}]}, {id:13 ,name:"整合异常监控",next:[{id:131,name:"调度服务管理"}]}]},                                                                                                                                                                                                                  
                                          {id:2,name:"数据编目",next:[ {id:21 ,name:"数据资源编目",next:[{id:111,name:"源数据注册",url:'finance',}]},{id:22 ,name:"目录查询",next:[{id:221,name:"向导式操作"}]}, {id:23 ,name:"数据标准管理",next:[{id:231,name:"数据源管理"}]}, ]},
                                          {id:3,name:"数据质量",next:[ {id:11 ,name:"数据源管理",next:[{id:111,name:"源数据注册"}]}, {id:12 ,name:"汇聚任务管理",next:[{id:121,name:"向导式操作"}]}, {id:13 ,name:"整合异常监控",next:[{id:131,name:"调度服务管理"}]}, ]},
                                          {id:4,name:"分析建模",},
                                          {id:5,name:"数据服务",},
                                          {id:6,name:"数据安全",}];
                         
                       
                         $scope.selMenus=[];
                        var firstMenu ,secondMenu;                   

                         function init(){
                                
                               angular.forEach($scope.menuData,function(data){
                                            data.$$isExpend=false;

                                             angular.forEach(data.next,function(value){
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
                                    
                                    firstMenu=item.id;
                                 
                                   $event.stopPropagation();
                         };
                      

                         $scope.itemShow= function(item, $event){
                                    
                                   item.$$isExpend=!item.$$isExpend;                                      

                                   $event.stopPropagation();

                                   secondMenu=item.id;
                         };

                     
                  
                 

                 

                    $scope.showLeft=function(){

                                 
                                  

                                    if ($('#arrow-flag').hasClass("arrow-hide")){

                                               $('.chart-main').animate({left:'50px'});
                                               $('#arrow-flag').removeClass('arrow-hide').addClass('arrow-show').css('right','130px');

                                    }else{
                                               
                                           $('.chart-main').animate({left:'160px'});
                                           $('#arrow-flag').removeClass('arrow-show').addClass('arrow-hide').css('right','30px');
                                    }

                      }
                  
                     
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




                               
                           })
                                
                  .controller('financeCtrl', ['$scope','$http',function ($scope,$http){
        
            //  $scope.recharge=10000;
  
         
        
               console.log("financeCtrl");

                  $scope.curFormat = function(file, value) {
            // console.log($scope.dataset);
            if(file=='enabled'&&value!=undefined){
                if(value==0)
                return $sce.trustAsHtml('禁用');
                else if(value==1)
                return $sce.trustAsHtml('启用');
              }
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
               


       }]).config(['$routeProvider', function($routeProvider){
                $routeProvider
                .when('/', {
                        templateUrl: 'chart.html',
                        controller: 'companyCtrl'
                    })
                .when('/finance', {
                        templateUrl: 'userManager.html',
                        controller: 'financeCtrl'
                    })
                .when('/restaurant',{
                        templateUrl: 'partials/partial2.html',
                        controller: 'restaurantCtrl'
                    })
                .otherwise({redirectTo:'/'});
            }]);
