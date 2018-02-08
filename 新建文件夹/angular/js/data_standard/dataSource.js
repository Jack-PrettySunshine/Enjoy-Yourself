/**
 * 
 */
angular.module('app')
              .controller('dataSourceCtrl',  ['$scope','$http',function($scope,$http){
                  
                   
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
                        sortname: 'id',
                        sort: 'asc',
                        del: true, //预览
                        edit: true, //编辑
                        delete: true, //删除
                        synchronous: true,//同步
                        updatetable:true//更新预览

                    },
                  title: [   {"fieldname":"name","title":"数据源名称"},
                             {"fieldname":"type","title":"数据源类型"},
                           
                             {"fieldname":"connInfo","title":"连接信息"},
                             {"fieldname":"desc","title":"数据源描述"},
                             {"fieldname":"syncStatus","title":"状态"}
                             ],
                  data:[],
              
                };
                 
                  $scope.notodps = true;
                  $scope.istodps = false;
                  $scope.show = false;
                  
                  $scope.adddata = false;
                  $scope.updatedata = false;

                  $scope.user = "";
                 $scope.thistype = "";
                 $scope.thattype = "";
                 $scope.description = "";
                 $scope.dbUrl = "";
                 $scope.daUsername = "";
                 $scope.dbPassword = "";

                  $scope.typeshow = function(){
                      console.log($scope.thistype);
                      if($scope.thistype=="ODPS"){
                          $scope.notodps = false;
                           $scope.istodps = true;
                      }
                  }

                  $scope.add=function(){
                       //初始化界面
                      $scope.adddata = true;
                        $scope.show=true;

                      $scope.notodps = true;
                      $scope.istodps = false;

                        //清空输入框
                        $scope.user = "";
                       $scope.thistype = "";
                       $scope.thattype = "";
                       $scope.description = "";
                       $scope.dbUrl = "";
                       $scope.daUsername = "";
                       $scope.dbPassword = "";
                  }
                 


                 //新增数据参数的获取
                 var vals1 = $("#cnt").find('input');
                 var vals2 = $("#cnt").find('select');

                 
                 $scope.check = function(){
                    

                    //关闭弹窗和遮罩层
                   $scope.show = false;

                  //jdbc:oracle:thin:@192.168.0.247:1521:orcl
                    //http://192.168.0.42:8080/console/data/standard/datasource/testConnect.do
                  $.ajax({
                         method: 'POST',
                         url:"http://localhost:8080/console/data/standard/datasource/add.do",
                          headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        data:{
                          // name:name,
                          // desc:desc,
                          // type:type,
                          // dsSourceType:dsSourceType,
                          // connInfo:JSON.stringify(connInfo)
                          name:$scope.user,
                          desc: $scope.description,
                          type:$scope.thistype,
                          connInfo:JSON.stringify({
                            url:$scope.dbUrl,
                            username: $scope.dbUsername,
                            password: $scope.dbPassword
                          })
                        }
                      
                }).success(function(data){
                  console.log(JSON.parse(data));
                


                
                }).error(function(data) {
                                  
                });
                    
                //刷新页面
                $scope.isRefresh = ! $scope.isRefresh;   
                    
                    
                  

                 }
                 
                $scope.search= '';
                $scope.searchtype = "";
                //搜索功能

                 $scope.seachFn = function(){
                  console.log($scope.searchtype);
                  $scope.seachtext ={
                    
                      name:$scope.search,
                      type: $scope.searchtype,
                      start:0,
                      length:50,
                    }
                  $scope.isSeach =!$scope.isSeach;
                //$scope.seachtext = $scope.seachtext.name;
                  //请求 完成清空输入框
                    
                   
                 }
           

                //删除功能
                 $scope.delete = function(id){
                   console.log(id);
                   $.ajax({
                      method: 'POST',
                      url:"http://localhost:8080/console/data/standard/datasource/delete.do",
                      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                          data:{
                            ids:id
                          }
                   }).success(function(data){
                  console.log(JSON.parse(data));
                  
                
                }).error(function(data) {
                                  
                    });
                    
                  //刷新页面
               $scope.isRefresh = ! $scope.isRefresh; 
                 }
                 $scope.user = '';
                 //修改功能
                 $scope.thisid = '';
                $scope.edit=function(obj){
                  
                   //弹窗出现,填入当前修改项的信息
                    $scope.show = true;
                   $scope.adddata = false;
                   $scope.updatedata = true;
                   

                   
                  var thisInfo= JSON.parse(obj.connInfo);
                   $scope.user = obj.name;
                   vals2[0].value =   obj.type;
                   
                   vals2[1].value= obj.dsSourceType;
                   vals1[1].value = obj.desc;
                   vals1[2].value = thisInfo.url;
                   vals1[3].value = thisInfo.username;
                   vals1[4].value = thisInfo.password;
                   
                   console.log(obj.id);
                   $scope.thisid = obj.id;
                   
                } 
                $scope.update = function(){
               $scope.show = false;
                  //重新读取数据
                   var name = vals1[0].value;
                   var    dsSourceType=vals2[1].value;;
                   var  desc=vals1[1].value;  
                   var  type=vals2[0].value;  
                  var connInfo={
                      url:vals1[2].value,
                      username:vals1[3].value,
                      password:vals1[4].value,
                    };
                  //发起ajax请求
                  $.ajax({
                  method: 'POST',
                  url:"http://localhost:8080/console/data/standard/datasource/update.do",
                         headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        data:{
                          name:name,
                          desc:desc,
                          type:type,
                          id: $scope.thisid,
                          
                          connInfo:JSON.stringify(connInfo)
                        }
                      
                }).success(function(data){
                  console.log(JSON.parse(data));
                  //关闭弹窗
                  
                  console.log($scope.show);
                //刷新页面
                  // $scope.isRefresh = ! $scope.isRefresh;
                }).error(function(data) {
                                  
                    });
                  $scope.isRefresh = ! $scope.isRefresh;
                }
                  
              

                  $scope.isshow = false;
                  $scope.islengther = false;
                  $scope.notlengther = true;
                 //预览表
                 $scope.del = function(a){
                     $scope.isshow = true;
                    //根据id请求数据
                    $.ajax({
                      method: 'POST',
                      url:"http://localhost:8080/console/data/standard/datasource/listTable.do",
                      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                      data:{id:a.id}
                    }).success(function(res){
                      $scope.previewdata = JSON.parse(res).data;


                      //获取数据长度
                      $scope.thislength = $scope.previewdata.length;

                      //根据数据长度判断显示模块
                      if($scope.thislength>0){
                           $scope.islengther = true;
                          $scope.notlengther = false;
                      }else{
                        $scope.islengther = false;
                        $scope.notlengther = true;
                      }

                      console.log($scope.thislength);
                      console.log($scope.previewdata);
                      $scope.$apply();
                    })
                 }
            $scope.curFormat = function(file, value) {
              // console.log($scope.dataset);
              if(file=='enabled'&&value!=undefined){
                  if(value==0)
                  return $sce.trustAsHtml('禁用');
                  else if(value==1)
                  return $sce.trustAsHtml('启用');
                }
            }
          
                
              }]);