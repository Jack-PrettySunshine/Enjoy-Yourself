/**
 * 
 */
angular.module('app')
              .controller('dataTableCtrl',  ['$scope','$http','$filter',function($scope,$http,$filter){
            	    
                                	     
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
                        del: false, //详情
                        edit: true, //编辑
                        delete: true, //删除
                        dispose: false,
                        index:true,
                        struct:true,
                        tableData:true
                        
                    },
                  title: [   {"fieldname":"tblName","title":"数据表名称"},
                             {"fieldname":"tblDesc","title":"数据表描述"},
                             {"fieldname":"dsName","title":"所属数据源"},
                              ],
                  data:[],
              
                };
                  
           
            $scope.seachtext={start:0,length:50,tblCategory:'S'};


             
      

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
                                      name:"类型一",
                                      children:[
                                         {
                                            id:"4",
                                            pid:"1",
                                            name:"子类型一"
                                         }
                                      ]
                                   },
                                   {
                                      id:"2",
                                      pid:"0",
                                      name:"类型二",
                                      children:[
                                         {
                                            id:"5",
                                            pid:"2",
                                            name:"子类型二"
                                         }
                                      ]
                                   },
                                   
                                ];

         
             var arrA,arrB,treeArr;
             $scope.rootTree={set:'root',children:[]};   

              $http({

              method:'post',
              responseType:'json',
              url:'http://localhost:8080/console/data/codeset/getCodeSetAndParents.do',
              data:"codeSetListStr=YWXT%2CYWXT%2CZYPT_ZZJGDM%2CHKGSDM"
            }).success(function(data) {
                   arrA=data.data;
                   arrA.map(function(item){
                          
                          item.set="root:"+item.set;
                       
                         return item;
                   })


              $http({

              method:'post',
              responseType:'json',
              url:'http://localhost:8080/console/data/code/getByCodeSets.do',
              data:"codeSets=%22HKGSDM%22%2C%22YWXT%22%2C%22ZYPT_ZZJGDM%22"
            }).success(function(data) {
                       arrB=data.data;
                       treeArr=arrA.concat(arrB);
                   
                      $scope.rootTree.children=listToTree(treeArr,'root');//调用函数，传入要转换的list数组，和树中顶级元素的set                                                                            
                       enhanceItem($scope.rootTree);

                       $scope.tree=$scope.rootTree.children;  
                       console.log($scope.rootTree); 
                    
                 
            });
                 
            });


    function listToTree(list,set) {  
        var ret = [];//一个存放结果的临时数组  
        for(var i in list) {  
           
        if(list[i].set.split(':')[0] == set) {//如果当前项的父id等于要查找的父id，进行递归  
               list[i].children = listToTree(list, list[i].set.split(':')[1]);  
               ret.push(list[i]);//把当前项保存到临时数组中  
             }  
        }  
        return ret;//递归结束后返回结果  
    }  
       

   var  enhanceItem=function(item,  parent){

                   angular.forEach(item.children, function (subItem) {
                         subItem.$parent=item;
                     enhanceItem(subItem, item);
      });

   }
         
   var codeSets=[];

  $scope.itemCheckedChanged=function(item){
        console.log(item);
        codeSets.push(item.code);
        $scope.seachtext.codeSets=codeSets.join();

        $scope.searchFn();
  }

   
  $scope.filterTree=function(){
        var subArr=$filter('filter')(treeArr,{desc:$scope.searchTree});

            $scope.rootTree.children=!listToTree(subArr,'root')?listToTree(subArr,'root'):subArr;                                                                       
          //  enhanceItem($scope.rootTree);
               
            console.log($scope.rootTree);
            $scope.tree=$scope.rootTree.children;  
                 
  }      












         

  


            
              








              $scope.searchFn=function(){

                         $scope.isSeach=!$scope.isSeach;

                       
                        
              }
             
                 

                $scope.cancel=function(){
                       $scope.show=false;
                       $scope.tableEdit=false;
                       $scope.tableStruct=false;
                      
                }

              $scope.edit=function(item){
                 $scope.show=true;
                 $scope.tableEdit=true;
                 $scope.tableStruct=false;
                 console.log(item);
                 $scope.editModel=item;
            }
          
            $scope.struct=function(item){
                     $scope.$broadcast('recall', item.tblId);  
                     $scope.show=true;
                     $scope.tableStruct=true;
                     $scope.tableEdit=false;

           }
          
          $scope.tableData=function(item){
              
                $scope.tableStruct=false;
                $scope.show=true;
                $scope.showTableData=true;                
                $scope.$broadcast('tableData', item.tblId);  
          }


           $scope.update=function(){

                   var up_url="http://localhost:8080/console/data/standard/table/update.do";
                      $.ajax({
                              method: 'post',
                              url:up_url,
                              headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                              data:{
                                tblId: $scope.editModel.tblId,                       
                                tblDesc:$scope.editModel.tblDesc
                              
                              }
                           
                            }).success(function(data){
                             
                              var data=JSON.parse(data)
                               if (data.success){
                                       $scope.show=false;
                                       $scope.isRefresh=!$scope.isRefresh;
                                       $scope.$apply();
                               };
                            
                                 
                            });    

           }
            	  

              }]).controller('tableStructCtrl',  ['$scope','$http','$sce',function($scope,$http,$sce){
                    $scope.dataset= {
               
                   title: [   {"fieldname":"colName","title":"字段名"},
                             {"fieldname":"colDesc","title":"字段描述"},
                             {"fieldname":"colType","title":"字段类型"},
                             {"fieldname":"colLength","title":"字段长度"},
                             {"fieldname":"colNullable","title":"是否可为空"},
                             {"fieldname":"colPk","title":"是否为主键"},
                             {"fieldname":"csSet","title":"代码集"}
                              ],
                   data:[],
              
                 };
               
              var tbUrl="http://localhost:8080/console/data/standard/table/listColumn.do";

       
    function  loadTableStruct(tblId){
            $.ajax({
            method: 'post',
            url:tbUrl,
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data:{
              tblId:tblId,
            
            }
         
          }).success(function(data){
            //console.log("tableStruct"+JSON.parse(data));
            console.log(JSON.parse(data))
            $scope.dataset = $.extend({}, $scope.dataset, JSON.parse(data));
            $scope.$apply();
               
          });    

    }


  



     
          $scope.cu_dataformat = function(file, type, value) {
                        
                if (file=="csSet"){
                       
                    return  $sce.trustAsHtml('<select><option>ywxt</option><option>ywxt</option></select>');
                                                                                                                            
                                         
                }else{
                  return $sce.trustAsHtml('<span>' + value + '</span>');
                }
              
         

        };
       
        $scope.$on('recall', function(e,tblId) {
                 
                console.log(tblId);
                 loadTableStruct(tblId);
           });










             }]).controller('tableDataCtrl',  ['$scope','$http','$sce',function($scope,$http,$sce){

                    $scope.dataset= {
               
                   title: [   {"fieldname":"cname","title":"Cname"},
                             {"fieldname":"cno","title":"Cno"},
                             {"fieldname":"tno","title":"Tno"}, 
                              ],
                   data:[],
              
                 };
       
          var tbUrl="http://localhost:8080/console/data/standard/table/getTabledata.do";
       
    function  loadTableData(tblId){
            $.ajax({
            method: 'post',
            url:tbUrl,
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data:{
              tblId:tblId,
            
            }
         
          }).success(function(data){
          
           
            $scope.dataset = $.extend({}, $scope.dataset, JSON.parse(data));
            $scope.$apply();
            console.log($scope.dataset );
          });    

    }


  



     
          $scope.cu_dataformat = function(file, type, value) {
                        
                if (file=="csSet"){
                       
                    return  $sce.trustAsHtml('<select><option>ywxt</option><option>ywxt</option></select>');
                                                                                                                            
                                         
                }else{
                  return $sce.trustAsHtml('<span>' + value + '</span>');
                }
              
         

        };
       
        $scope.$on('tableData', function(e,tblId) {
                 
                console.log(tblId);
                 loadTableData(tblId);
         });



             }]);