/**
 * 
 */
angular.module('app')
              .controller('dataSourceCtrl',  ['$scope','$http','$sce',function($scope,$http,$sce){
                  
                   
                  $scope.option= {
                        info: {
                            pagesize: 10, //每页显示
                            upage: false, //上一页
                            curpage: 1, //当前页
                            total: 1, //总页数
                            tzpage: 1, //跳转页
                            tzistrue: false, //是否跳转页
                            multiselect:false, //多选
                            index:false,
                            toolbar: true,
                            sortname: 'id',
                            sort: 'asc',
                            del: true, //预览
                            edit: true, //编辑
                            delete: true, //删除
                            testlink:true,//测试连接testlink({item:item})
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
                  $scope.iswarn = false;
                  $scope.iserrorfalid = false;
                  $scope.issuccess233 = false;
                  $scope.isconnectsuccess = false;
                  $scope.isconnecterror = false;
                  $scope.iscover = false;
                  $scope.iserror = false;//操作失败
                  $scope.issuccess = false;//操作成功
                  $scope.isupdatesuccess = false;
                  $scope.isupdatefalid = false;

                  $scope.showtips = false;//提示框
                  $scope.notodps = true;
                  $scope.istodps = false;
                  $scope.show = false;//新增、修改界面
                  $scope.adddata = false;
                  $scope.updatedata = false;
                  $scope.isshow = false;
                  $scope.islengther = false;
                 $scope.notlengther = true;

                  $scope.user = "";//数据源名
                  $scope.thistype = "";//数据库类型
                  $scope.thattype = "";//组件类型
                  $scope.description = "";//数据源描述
                  $scope.dbUrl = "";//连接URL
                  $scope.daUsername = "";//用户名
                  $scope.dbPassword = "";//密码

                  $scope.inittips = function(){
                     $scope.issuccess = false;//操作成功
                      $scope.iswarn = false;
                     $scope.iserror = false;//操作失败
                   
                     $scope.iserrorfalid = false;
                  $scope.issuccess233 = false;
                  $scope.isconnectsuccess = false;
                  $scope.isconnecterror = false;
                   $scope.isupdatesuccess = false;
                  $scope.isupdatefalid = false;
                 
                  }

                  $scope.closethis = function(){
                    $scope.showtips = false;
                     $scope.issuccess = false;//操作成功
                      $scope.iswarn = false;
                     $scope.iserror = false;//操作失败
                   
                   $scope.inittips();
                  }
                  //关闭
                  $scope.closethat = function(){

                    $scope.show = false;
                    $scope.iscover = false;
                   
                  }
                  //弹窗的样式控制
                  $scope.typeshow = function(){
                      console.log($scope.thistype);
                      if($scope.thistype=="ODPS"){
                          $scope.notodps = false;
                           $scope.istodps = true;
                      }else{
                        $scope.notodps = true;
                           $scope.istodps = false;
                      }
                  }

                  //清除按钮listreset()
                  $scope.listreset = function(){
                      $scope.show=false;
                      $scope.user = "";//数据源名
                      $scope.thistype = "";//数据库类型
                      $scope.thattype = "";//组件类型
                      $scope.description = "";//数据源描述
                      $scope.dbUrl = "";//连接URL
                      $scope.daUsername = "";//用户名
                      $scope.dbPassword = "";//密码
                  }
                  $scope.add=function(){

                          //初始化界面
                          $scope.updatedata = false;
                          $scope.adddata = true;
                          $scope.show=true;
                          $scope.iscover = true;

                          $scope.notodps = true;
                          $scope.istodps = false;

                            //清空输入框
                            $scope.user = "";
                           $scope.thistype = "";
                           $scope.thattype = "";
                           $scope.description = "";
                           $scope.dbUrl = "";
                           $scope.dbUsername = "";
                           $scope.dbPassword = "";

                           console.log($scope.dbUsername,$scope.dbUrl);
                  }
                 


                 //新增数据参数的获取
                 // var vals1 = $("#cnt").find('input');
                 // var vals2 = $("#cnt").find('select');

                 //连接测试
                 $scope.testLink = function(){
                    console.log($scope.dbUsername);
                        
                      //根据url地址请求测试链接
                      $http({
                             method: 'POST',
                                   url:"http://localhost:8080/console/data/standard/datasource/testConnect.do",
                                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                                    data:{
                                          name:$scope.user,
                                          desc: $scope.description,
                                          type:$scope.thistype,
                                          connInfo:JSON.stringify({
                                                    url:$scope.dbUrl,
                                                    username: $scope.dbUsername,
                                                    password: $scope.dbPassword
                                          })
                                    }
                      }).success(function(res){
                         
                          if(res.success===false){
                               $scope.showtips = true;console.log(5555,$scope.showtips)
                              $scope.issuccess =false;

                              $scope.inittips();
                            //显示错误提示框,蒙版出现
                              
                            
                             $scope.iserror = true;
                              $scope.isconnecterror = true;

                                
                          }else if(res.success=true){
                                 $scope.iserror = false;
                               $scope.inittips();
                               
                              $scope.iscover = true;
                              $scope.showtips = true;
                              $scope.issuccess= true;
                              $scope.isconnectsuccess = true;
                          }
                          $scope.isRefresh = ! $scope.isRefresh;
                      }).error(function(res){
                            console.log(res)
                      })
                 }


                $scope.check = function(){
                    
                          $scope.closethat();
                        //关闭弹窗和遮罩层
                        // $scope.show = false;
                        // $scope.iscover =false;

                          console.log($scope.dbUsername)
                        //jdbc:oracle:thin:@192.168.0.247:1521:orcl
                        
                        $http({
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
                        
                          
                          if(data.success===false){
                              $scope.issuccess =false;
                             
                              $scope.inittips();
                            //显示错误提示框,蒙版出现
                              
                             $scope.showtips = true;
                             $scope.iserror = true;
                              $scope.iserrorfalid = true;

                                
                          }else if(data.success===true){
                               $scope.inittips();
                               
                         
                              $scope.showtips = true;
                              $scope.issuccess= true;
                              $scope.issuccess233 = true;
                          }

                          $scope.isRefresh = ! $scope.isRefresh;
                        
                        }).error(function(data) {
                               console.log(data)           
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
           
            $scope.thatID ;
                //删除功能
            $scope.delete = function(id){
                  
                   //出现警告弹窗和蒙版
                   $scope.inittips();
                   $scope.showtips = true;
                   $scope.iswarn = true;
                   $scope.thatID = id;
                   console.log($scope.thatID);
                 
            }
            //点击确定按钮进行删除
            $scope.isDel = function(){
                   $http({
                      method: 'POST',
                      url:"http://localhost:8080/console/data/standard/datasource/delete.do",
                      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                          data:{
                            ids:$scope.thatID
                          }
                   }).success(function(data){
                  
                       if(data.success===false){
                                $scope.iscover = false;
                              $scope.issuccess =false;
                              $scope.inittips();
                            //显示错误提示框,蒙版出现
                              
                             $scope.showtips = true;
                             $scope.iserror = true;
                               $scope.isupdatefalid = true;

                                
                          }else if(data.success===true){
                               $scope.inittips();
                               
                              
                              $scope.showtips = true;
                              $scope.issuccess= true;
                              $scope.isupdatesuccess = true;
                          }
                      $scope.isRefresh = ! $scope.isRefresh;
                    }).error(function(data) {
                                      
                        });
                        
                     // 刷新页面
                  
            }
      

             $scope.user = '';
             //修改功能
             $scope.thisid = '';
            $scope.edit=function(obj){
                  console.log(obj);
                 //弹窗出现,蒙版出现填入当前修改项的信息
                 $scope.iscover = true;
                  $scope.show = true;
                 $scope.adddata = false;
                 $scope.updatedata = true;
               

               
                  var thisInfo= JSON.parse(obj.connInfo);
                 $scope.user = obj.name;
                 $scope.thistype = obj.type;
                 //console.info(typeof obj.editable.toString());
                 $scope.thattype = obj.editable.toString();
                 $scope.description = obj.desc;
                 $scope.dbUrl = thisInfo.url;
                 $scope.dbUsername = thisInfo.username;
                 $scope.dbPassword = thisInfo.password;
                
                 $scope.thisid = obj.id;
               
            } 
            $scope.update = function(){
              $scope.show = false;
              $scope.iscover = false;
              console.log( $scope.iscover);
              
                  //重新读取数据
                   var name =  $scope.user;
                   var    dsSourceType= $scope.thattype;
                   var  desc=  $scope.description 
                   var  type=$scope.thistype ;
                    var connInfo={
                        url: $scope.dbUrl,
                        username: $scope.dbUsername,
                        password: $scope.dbPassword
                      };
                  //发起ajax请求
                  $http({
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
                   
                    
                    //关闭弹窗
                    if(data.success===false){
                                $scope.iscover = false;
                              $scope.issuccess =false;
                              $scope.inittips();
                            //显示错误提示框,蒙版出现
                              
                             $scope.showtips = true;
                             $scope.iserror = true;
                               $scope.isupdatefalid = true;

                                
                          }else if(data.success===true){
                               $scope.inittips();
                               
                              
                              $scope.showtips = true;
                              $scope.issuccess= true;
                              $scope.isupdatesuccess = true;
                          }
                    
                  //刷新页面
                    $scope.isRefresh = ! $scope.isRefresh;
                  }).error(function(data) {
                                    
                  });
                    
            }
                  
              

             
            //预览表
            $scope.del = function(a){

                $scope.isshow = true;
                //根据id请求数据
                $http({
                  method: 'POST',
                  url:"http://localhost:8080/console/data/standard/datasource/listTable.do",
                  headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                  data:{id:a.id}
                }).success(function(res){
                  $scope.previewdata = res.data;


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
                    $scope.isRefresh = ! $scope.isRefresh;
                  console.log($scope.thislength);
                  console.log($scope.previewdata);
                 
                }).error(function(data) {
                                          
                });
            }

            
            //测试连接
            $scope.testlink = function(link){
             
              console.log(link);
              $http({
                    method: 'POST',
                    url:"http://localhost:8080/console/data/standard/datasource/testConnect.do",
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data:link
              }).success(function(res){
                
                  if(res.success===true){
                     $scope.iserror =false;
                       $scope.inittips();
                       
                    
                      $scope.showtips = true;
                      $scope.issuccess= true;
                      $scope.isconnectsuccess = true;

                        
                  }else if(res.success==false){
                     $scope.issuccess =false;
                      $scope.inittips();
                    //显示错误提示框,蒙版出现
                      
                     $scope.showtips = true;
                     $scope.iserror = true;
                      $scope.isconnecterror = true;

                     
                  }
                    $scope.isRefresh = ! $scope.isRefresh;
              }).error(function(data) {
                                            
              });
            }

            //同步表结构
            $scope.synchronous = function(synchronous){
             
              console.log(synchronous.syncStatus);
              //http://192.168.0.42:8080/console/data/standard/datasource/add.do
              $http({
                    method: 'POST',
                    url:"http://localhost:8080/console/data/standard/datasource/add.do",
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data:synchronous
              }).success(function(res){
                
                     if(res.success===true){
                            

                                 $scope.inittips();
                               
                              
                              $scope.showtips = true;
                              $scope.issuccess= true;
                              $scope.isupdatesuccess = true;
                               synchronous.syncStatus = "SYNCING";//正在同步
                          }else if(res.success===false){
                                $scope.inittips();
                              $scope.iscover = false;
                              $scope.issuccess =false;
                             
                            //显示错误提示框,蒙版出现
                              
                             $scope.showtips = true;
                             $scope.iserror = true;
                               $scope.isupdatefalid = true;
                                $scope.isRefresh = ! $scope.isRefresh;
                          }
                    
                           
              }).error(function(res){
                console.log(res)
              })
            }


            //更新预览表
            $scope.updatetable = function(updatetable){
              console.log(updatetable);
              //http://192.168.0.42:8080/console/data/standard/datasource/updateData.do
              $http({
                    method: 'POST',
                    url:"http://localhost:8080/console/data/standard/datasource/updateData.do",
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data:updatetable
              }).success(function(res){
                  
                      if(res.success===false){
                                $scope.iscover = false;
                              $scope.issuccess =false;
                              $scope.inittips();
                            //显示错误提示框,蒙版出现
                              
                             $scope.showtips = true;
                             $scope.iserror = true;
                               $scope.isupdatefalid = true;

                                
                          }else if(res.success=true){
                               $scope.inittips();
                               
                              
                              $scope.showtips = true;
                              $scope.issuccess= true;
                              $scope.isupdatesuccess = true;
                          }
                          $scope.isRefresh = ! $scope.isRefresh;
              }).error(function(res){
                console.log(res)
              })
            }
            $scope.curFormat = function(file, value) {
                if(file=='syncStatus'&&value!=undefined){
                   
                      if(value=="SYNCING"){
                          return $sce.trustAsHtml('正在同步');
                      }else if(value=="SYNCED"){
                        return $sce.trustAsHtml('已同步');
                      }else if(value=="FAILURE"){
                        return $sce.trustAsHtml('同步失败');
                      }
                }
            }
          
                
              }]);