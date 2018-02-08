
/* Directives */

angular.module('myApp.directives', [])
   .controller('curTableCtr', ['$rootScope','$scope', '$http', '$filter', '$sce', function($rootScope,$scope, $http, $filter, $sce) {
/*        var $scope.tb_s = {
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
            title: [ {"fieldname":"name","title":"数据资源名称"},
                           {"fieldname":"type","title":"数据资源类型"},
                           {"fieldname":"dbUrl","title":"数据源URL"},
                           {"fieldname":"dbUsername","title":"用户名"},
                           {"fieldname":"adminCompany","title":"管理单位"},
                           {"fieldname":"adminName","title":"管理员"},
                           {"fieldname":"adminPhone","title":"联系电话"},
                           {"fieldname":"status","title":"连接状态"}, ], 
            data: []
      
        };*/
 





        $scope.rightInfo=angular.copy($rootScope.rightInfo);
        var type = "";
       // $scope.dataset = angular.fromJson(tb_s);

        $scope.selDate = null;
        $scope.selDates = [];

        $scope.selId = '';
        $scope.selIds = [];
        $scope.operate = "";
        $scope.parameters = {};
        var cu_datetype = {
            date: 'yyyy-MM-dd HH:mm:ss'
        };
        $scope.cu_dataformat = function(file, type, value) {
            var format = cu_datetype[type];
            if (value != undefined) {
                switch (type) {
                    case 'date':
                        value = $filter('date')(new Date(value), format);
                        if(file == "expireDate"){
                          value = $filter('date')(new Date(value), 'yyyy-MM-dd');
                        }
                        break;
                    case 'money':
                      value = $filter('number')(value, 2);
                }
                return $sce.trustAsHtml('<span>' + value + '</span>');
            } else {
                return '';
            }

        };
        $scope.opclick = function(type) {
            $scope.operate = type;
        };

        $scope.sellallclick = function(elemt) {
            var elemt = $(elemt.target);
            if (elemt.html() == '全选') {
                angular.element('.onsel').addClass('sel').removeClass('onsel');
                elemt.html('全不选');
                $.each($scope.dataset.data, function(j, k) {
                    $scope.selIds.push(k[$scope.dataset.info.sortname]);
                    $scope.selDates.push(k);
                });
                $scope.selDate = null;
                $scope.selId = '';

            } else {
                angular.element('.sel').addClass('onsel').removeClass('sel');
                elemt.html('全选');
                $scope.selIds = [];
                $scope.selDates = [];
                $scope.selDate = null;
                $scope.selId = '';
            }
        };
        $scope.$watch('isRefresh', function(o, n) {
            if ($scope.isRefresh !== undefined) {
              $scope.tb_s.info.pagesize=$("#dataFooter .pagesize .aActive").html();
              $scope.tb_s.info.curpage=$("#dataFooter .pagesize .txtBox").val();
                $scope.refreshTable();
                console.log(999);
            }
        });
        $scope.$watch('isSeach', function(j, k) {

          console.log("tb_s"+$scope.option);
            $scope.selDate = null;
            $scope.selDates = [];

            $scope.selId = '';
            $scope.selIds = [];
            $scope.operate = "";
            $scope.dataset="";
            angular.element('.selall').html('全选');
            // cu_show('.table .box_shadow');
            $scope.parameters = $scope.seachText;
            //版本控制参数
            if ($("#Bversion").length > 0) {
//              $scope.parameters.pagesize = '';
                $scope.parameters.pageSize = $scope.tb_s.info.pagesize;
                $scope.parameters.pageNo = 1;
              $scope.parameters.arrayList = JSON.stringify({
                "softId": $rootScope.softId,
              });
/*                $scope.parameters.changeUser = "版本发布人";
                $scope.parameters.softId = 'X4';
                $scope.parameters.updateDesc = '版本发布人再发布版本';
                $scope.parameters.updateLevel = 2;
                $scope.parameters.verCode = '1.0.5.1';
                $scope.parameters.verFile = 'updload/ddd/xxx/ddd';
                $scope.parameters.verType = 1;*/
              $scope.headers = {'Content-Type':'application/x-www-form-urlencoded'};
              $scope.params = $scope.parameters;
              $scope.data = {};
            } else {
//              $scope.parameters.pagesize = $scope.tb_s.info.pagesize;
//              $scope.parameters.curpage = 1;
              $scope.headers = {'Content-Type':'application/json'};
              $scope.params = {};
              $scope.data = $scope.parameters;
            }
//            $http({
//              method:'post',
//              responseType:'json',
//              url:$scope.tbUrl,
//              headers:$scope.headers,
//              params:$scope.params,
//               data:$scope.data
//            }).success(function(data) {
//                if (data) {
//
//                    cu_hide('.table .box_shadow');
//                    $scope.tb_s = $.extend({}, $scope.tb_s, angular.fromJson(data));
//                    $scope.dataset = $scope.tb_s;
//                   
//                }
//            });
            $.ajax({
        		method: 'POST',
    			url:$scope.tbUrl,
              	headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
              	 data:$scope.data
        	}).success(function(data){
        		console.log(JSON.parse(data));
        		//刷新页面
        		 cu_hide('.table .box_shadow');
        		 data = JSON.parse(data);
               $scope.tb_s = $.extend({}, $scope.tb_s, data);
               $scope.dataset = $scope.tb_s;
        	  
               $scope.$apply();
        		console.log( $scope.dataset);
        	})
           //版本控制参数end
            
         // 判断是否是跨域访问  jsonp为跨域访问
//            if($scope.requestmode=="jsonp"){
//              if($scope.tbUrl.indexOf("http")<0)
//              $scope.tbUrl="http://"+window.location.host+"/"+$scope.tbUrl;
//            }

        	
        	
        	
        });
        $scope.refreshTable = function() {
            $scope.selDate = null;
            $scope.selDates = [];

            $scope.selId = '';
            $scope.selIds = [];
            $scope.operate = "";
            angular.element('.selall').html('全选');
            cu_show('.table .box_shadow');
            if ($("#Bversion").length > 0) {
              $scope.parameters.pageSize = $scope.tb_s.info.pagesize == 0 ? 10 : $scope.tb_s.info.pagesize;
              $scope.parameters.pageNo = $scope.parameters.curpage>1?$scope.parameters.curpage:1;
              $scope.parameters.arrayList = JSON.stringify({
                "softId": $rootScope.softId,
              });
              
              $scope.headers = {'Content-Type':'application/x-www-form-urlencoded'};
              $scope.params = $scope.parameters;
              $scope.data = {};
            } else {
             /* $scope.parameters.pagesize = $scope.tb_s.info.pagesize == 0 ? 10 : $scope.tb_s.info.pagesize;
              $scope.parameters.curpage = $scope.parameters.curpage>1?$scope.parameters.curpage:1;*/
              $scope.parameters = $scope.seachText;
              $scope.headers = {'Content-Type':'application/json'};
              $scope.params = {};
              $scope.data = $scope.parameters;
            }
            
         // 判断是否是跨域访问  jsonp为跨域访问
            if($scope.requestmode=="jsonp"){
              if($scope.tbUrl.indexOf("http")<0)
              $scope.tbUrl="http://"+window.location.host+"/"+$scope.tbUrl;
            }
//            
//            $http({
//              method:'post',
//              responseType:'json',
//              url:$scope.tbUrl,
//              headers:$scope.headers,
//              params:$scope.params,
//                data:$scope.data
//            }).success(function(data) {
//                if (data) {
//                    cu_hide('.table .box_shadow');
//                    $scope.tb_s = $.extend({}, $scope.tb_s, angular.fromJson(data));
//                    $scope.dataset = $scope.tb_s;
//                }
//            });
            $.ajax({
        		method: 'POST',
    			url:$scope.tbUrl,
              	headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
              	 data:$scope.data
        	}).success(function(data){
        		console.log(JSON.parse(data));
        		//刷新页面
        		 cu_hide('.table .box_shadow');
        		 data = JSON.parse(data);
               $scope.tb_s = $.extend({}, $scope.tb_s, data);
               $scope.dataset = $scope.tb_s;
        	  
               $scope.$apply();
        		console.log( $scope.dataset);
        	})   
            
        }
        $scope.col_order = function(cl) {
            arguments.callee['fn' + cl] = !arguments.callee['fn' + cl];
            $scope.dataset.data.items = $filter('orderBy')($scope.dataset.data.items, [cl], arguments.callee['fn' + cl]);
            console.log("cl"+cl);
        };
        $scope.pageclick = function(elemt, cl) {
            $scope.selDate = null;
            $scope.selDates = [];

            $scope.selId = '';
            $scope.selIds = [];
            $scope.operate = "";
            angular.element('.selall').html('全选');
            if (cl.upage && $scope.tb_s.info.curpage <= 1) {
                return;
            }
            if (cl.upage !== undefined) {
                if (cl.upage) {
                    $scope.tb_s.info.curpage--;
                } else if (tb_s.info.curpage < $scope.tb_s.info.total) {
                    $scope.tb_s.info.curpage++;
                } else return;
            }
            if (cl.pagesize !== undefined) {
                $scope.tb_s.info.curpage = 1;
                $scope.tb_s.info.total = 1;
            }
            if (cl.tzistrue === true) {
                if ($scope.dataset.info.tzpage >= $scope.tb_s.info.total) {
                    $scope.tb_s.info.curpage = $scope.tb_s.info.total;
                    $scope.dataset.info.tzpage = $scope.tb_s.info.total;
                } else {
                    if (Number($scope.dataset.info.tzpage)) {
                        $scope.dataset.info.curpage = $scope.dataset.info.tzpage;
                    } else {
                      $scope.tb_s.info.pagesize=$("#dataFooter .pagesize .aActive").html();
                      $scope.tb_s.info.curpage=$("#dataFooter .pagesize .txtBox").val()
                      if(tb_s.info.curpage==0)
                        $scope.tb_s.info.curpage=1;
                      if(tb_s.info.curpage>tb_s.info.total)
                        $scope.tb_s.info.curpage=tb_s.info.total;
                      $scope.dataset.info.tzpage=tb_s.info.curpage;
                    }
                }
            }
            var elemt = $(elemt.target);
            if (elemt.parent('.p_1').length > 0) {
                elemt.addClass('aActive').siblings('a').removeClass('aActive');
            }
            $scope.tb_s.info = angular.extend(tb_s.info, cl);
            cu_show('.table .box_shadow');
            
            
            if ($("#Bversion").length > 0) {
              $scope.parameters.pageSize = $scope.tb_s.info.pagesize;
              $scope.parameters.pageNo = $scope.tb_s.info.curpage;
              $scope.parameters.arrayList = JSON.stringify({
                "softId": $rootScope.softId,
              });
              $scope.headers = {'Content-Type':'application/x-www-form-urlencoded'};
              $scope.params = $scope.parameters;
              $scope.data = {};
            } else {
              $scope.parameters.pagesize = $scope.tb_s.info.pagesize;
              $scope.parameters.curpage = $scope.tb_s.info.curpage;
              $scope.parameters.searchContent = $scope.seachText;
              $scope.headers = {'Content-Type':'application/json'};
              $scope.params = {};
              $scope.data = $scope.parameters;
            }
            
/*         // 判断是否是跨域访问  jsonp为跨域访问
            if($scope.requestmode=="jsonp"){
              if($scope.tbUrl.indexOf("http")<0)
              $scope.tbUrl="http://"+window.location.host+"/"+$scope.tbUrl;
            }*/
            //发起分页请求
            $http({
              method:'post',
              responseType:'json',
              url:$scope.tbUrl,
              headers:$scope.headers,
              params:$scope.params,
                data:$scope.data
            }).success(function(data) {
                if (data) {
                    cu_hide('.table .box_shadow');
                    $scope.tb_s = $.extend({}, $scope.tb_s, angular.fromJson(data));
                    $scope.dataset = $scope.tb_s;
                }
            });
        };
        $scope.m_select = function(e, id) {
            var elemt = $(e.target);
            var f = eval('{' + $scope.dataset.info.sortname + ':"' + id + '"}');
            var d = $filter('filter')($scope.dataset.data, f, true);
            if (elemt.hasClass('sel') || elemt.hasClass('onsel')) {
                if (elemt.hasClass('sel')) {
                    $scope.selIds.push(id);
                    $scope.selDates.push(d);
                } else {
                    $scope.selIds.splice(jQuery.inArray(id, $scope.selIds), 1);
                    $scope.selDates.splice(jQuery.inArray(d, $scope.selDates), 1);
                }
            } else {
                $scope.selId = id;
                $scope.selDate = d[0];
            }
        }
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
           copytBodyWidth($scope.tbId);
            angular.element('.onsel,.sel').click(function() {
                $(this).hasClass('onsel') ? $(this).addClass('sel').removeClass('onsel') : $(this).addClass('onsel').removeClass('sel');
            });
        });
       $scope.load = function() {  
           f_initPage(); 
       }  
    }])
    .directive('onFinishRenderFilter', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }

    })
    .directive('curTable', function() {
        return {
            restrict: 'E',
            //transclude: true,
            controller: 'curTableCtr',
            controllerAs: 'curTableCtr',
            replace: true,
            templateUrl: 'curTable.html',
            scope: {            
                tbUrl: '@',
                tbId: '@',
                tb_s:'=option',
                isRefresh: '=',
                isSeach: '=',
                seachText: '=',
                parameters: '=',
                dataset: '=',
                selDates: '=',
                selDate: '=',
                selId: '=',
                selIds: '=',
                selFn: '&',
                edit: '&',
                delete: '&',
                del: '&',
                dispose: '&',
                curFormat: '&',
                
            },
            link: function(scope, element, attr) {

            }
        }
    })
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('treeView',[function(){
 
     return {
          restrict: 'E',
          templateUrl: 'partials/treeView.html',
          scope: {
              treeData: '=',
              canChecked: '=',
              textField: '@',
              itemClicked: '&',
              itemCheckedChanged: '&',
              itemTemplateUrl: '@'
          },
         controller:['$scope', function($scope){
             $scope.itemExpended = function(item, $event){
                 item.$$isExpend = ! item.$$isExpend;
                 $event.stopPropagation();
             };
 
             $scope.getItemIcon = function(item){
                 var isLeaf = $scope.isLeaf(item);
 
                 if(isLeaf){
                     return 'fa fa-leaf';
                 }
 
                 return item.$$isExpend ? 'fa fa-minus': 'fa fa-plus';  
             };
 
             $scope.isLeaf = function(item){
                return !item.children || !item.children.length;
             };
 
             $scope.warpCallback = function(callback, item, $event){
                  ($scope[callback] || angular.noop)({
                     $item:item,
                     $event:$event
                 });
             };
         }]
     };
 }]);
