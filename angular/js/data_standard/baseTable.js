/**
 * 
 */
angular.module('app')
              .controller('baseTableCtrl',  ['$scope','$http','$state',function($scope,$http,$state){
            	 
            	             	     
                           $state.go('baseTable.dataTableList');
             
            	     
            	  
              }])
                .controller('dataTableListCtrl',  ['$scope','$http',function($scope,$http){  

                                                           
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
                                dispose: true,
                                index:true
                                
                            },
                            title: [  
                                    {"fieldname":"sDsName","title":"所属数据源"},
                                     {"fieldname":"tblName","title":"基础表名称"},
                                     {"fieldname":"tblDesc","title":"基础表描述"},
                                     {"fieldname":"fromdatatable","title":"来源数据表"},
                                     {"fieldname":"fromdatasource","title":"来源数据源"},
                                     {"fieldname":"userName","title":"创建人"},
                                     {"fieldname":"groupName","title":"创建人单位"},
                                     {"fieldname":"created","title":"创建时间"},  
                                     {"fieldname":"tblStatus","title":"状态"},
                                     {"fieldname":"unfinished","title":"未完成映射数"},
                                    
                            ],
                            data:[],
                      
                        };

                        //数据请求
                        // $http({
                        //     method: 'POST',
                        //     url:"http://localhost:8080/console/data/standard//baseTable/tableList.do",
                        //     headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        //     data:{
                        //         tblCategory:"T",
                        //         likeUserName:"系统管理员",
                        //         start:0,
                        //         length:50,
                        //     }
                        // }).success(function(res){
                        //     console.log(res);
                        // })

                    }])
                 .controller('editTableStructCtrl',  ['$scope','$http',function($scope,$http){  


                                                       
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
                        sor: true, //详情
                        edit: true, //编辑
                        delet: 'asc',
                        delte: true, //删除
                        dispose: true,
                        index:true,
                        
                    },
                  title: [   {"fieldname":"name","title":"所属数据源"},
                             {"fieldname":"tablename","title":"基础表名称"},
                             {"fieldname":"tabledescription","title":"基础表描述"},
                             {"fieldname":"fromdatatable","title":"来源数据表"},
                             {"fieldname":"fromdatasource","title":"来源数据源"},
                             {"fieldname":"createName","title":"创建人"},
                             {"fieldname":"createCompany","title":"创建人单位"},
                             {"fieldname":"createTime","title":"创建时间"},  
                             {"fieldname":"status","title":"状态"},
                             {"fieldname":"unfinished","title":"未完成映射数"},
                             {"fieldname":"done","title":"操作"},
                          ],
                  data:[],
              
                };




                    }])