angular.module('app')
              .controller('companyCtrl',  ['$scope','$http',function($scope,$http){
            	var basePath='http://localhost:8080/console';  
            	var pieUrl=basePath+'/stat/data/statByDimession.do?dimession=ys';
            	var TotalUrl=basePath+'/stat/data/statTotal.do';
            	var lineUrl=basePath+'/stat/data/statByEachDay.do';
            	$http({
        			method: 'GET',
                  	url: "http://localhost:8080/console/serverinfosts/list.do",
                  	 headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},

        		}).success(function(data){
        			console.log(data);
        		}).error(function(data) {
                              
                });
            	  $http({
                      method: 'GET',
                      url: pieUrl,
                      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                  }).success(function(data) {
                  	var data = data.data;
//                 	console.log(data);
                 	var types = new Array;
                 	var totals = new Array;
                 	for(var i=1; i<data.length;i++){
                 		types.push(data[i].dicMapper.dimession?data[i].dicMapper.dimession:data[i].dimession);
                 		totals.push((data[i].value/100000000).toFixed(3))
                 	}
                 	
//                 	console.log(types);
//                 	console.log(totals);
                 	var details = new Array;
                 	for(var i=0; i<types.length; i++){
                 		details.push({value:totals[i],name:types[i]})
                 	}
//                 	console.log(details);
                  	
                 	 var dom = $("#container0")[0];
                     var myChart = echarts.init(dom);
                     var app = {};
                     var option = null;
                     option = {
                             	backgroundColor: '#ffffff',//背景色
 		                        title: {
 		                            text: '要素分类比例图',
 		                            left: '20px',
 		                            top:'30px',
 		
 		                            textStyle: {"fontSize": 16,"fontWeight": "500","color": "#333"} 
 		                        },
 		                        tooltip : {
 		                            trigger: 'item',
 		                            showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
 		                            hideDelay: 500,            // 隐藏延迟，单位ms
 		                            transitionDuration : 0.4,  // 动画变换时间，单位s
 		                            formatter: "{b}: {c}(亿) ({d}%)<br>今日增量：0<br>最近7日增量：0<br>最近一个月增量：0<br>",
 		                        },
                   
 		                        color: ['lightblue','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)',"#999933"],
 		                        legend: {
 		                            orient: 'vertical', 
 		                        
 		                            top: '70px',
 		                            bottom: 10,
 		                            left: '20px',
 		                            data: types
 		                        },
 		                        series : [
 		                            {
 		                                type: 'pie',
 		                                radius : '60%',
 		                                center: ['60%', '50%'],
 		                                hoverAnimation:false,
 		                                selectedMode: 'single',
 		                                data:details,
 		                                itemStyle: {
 		                                    emphasis: {
 		                                        shadowBlur: 10,
 		                                        shadowOffsetX: 0,
 		                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
 		                                    },
 		                                    normal:{ 
 			                                          label:{ 
 			                                              show: true, 
 			                                              //formatter: '{b} : {c} ({d}%)' 
 			                                              // formatter: "{b} : {c} 亿元\n{d}%
 			                                               formatter: "{b}\n{d}%"
 			                                          }, 
 			                                          labelLine :{show:true} 
 		                                    } 
 		                                }
 		                            }
 		                        ]
                     	};
                     if (option && typeof option === "object") {
                         myChart.setOption(option, true)
                     }
                  	
                  }).error(function(data) {
                      
                  });
            	  
                $http({
                    method: 'GET',
                    url: TotalUrl,
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                }).success(function(data) {
            	   
               
                	var data = data.data[0];
//                	console.log(data);
                	$scope.total = (data.total/100000000).toFixed(3)+"亿";
                	$scope.cc = (data.cc/100000000).toFixed(3)+"亿";
                	$scope.count = data.count;
                	$scope.lyxt = data.lyxt;
                	$scope.lydy = data.lydy;
                	$scope.lydw = data.lydw;
                	$scope.yw = data.yw;
                	$scope.ys = data.ys;
                	$scope.lysjy = data.lysjy;
                	
                	
                }).error(function(data) {
                    
                });
             
            	 
            	

                   
                    
                    //折线图
                    var linesource;
                    $http({
                        method: 'GET',
                        url: lineUrl,
                        headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    }).success(function(data) {
                  	   
//                  	  linesource = angular.toJson(data);
                    	linesource = data.data;
//                    	console.log(linesource);
//                    	linesource.forEach(function(item,index){
                    		var date = [];
                    		var values = [];
                    		var max = 0;
                			var dw = '';
                			
                    		for(var i=0; i<linesource.length;i++){
                    			date.push(linesource[i].day);
                    			values.push(linesource[i].value)
                    			
                    		}
                    		
                    		//选取6个为4倍数的日期，并进行格式化
                    		var date2 = date.filter(function(item,index){
                    			if(index%1===0){
                    				return date
                    			}
                    		});
//                    		console.log(date2)
//                    		var str1= date2.join(",")
//                    		console.log(str1);
                    		var date3 = new Array;
                    		for(var i=0; i<date2.length;i++){
                    			date3.push(date2[i].toString())
                    		}
                    		
//                    		for(var i=0; i<date3.length;i++){
//                    			date3[i].
//                    		}
//                    		console.log(date3[0][3].replace("-"));
                    	
                    		
                    		
                    		var values2 = values.filter(function(item,index){
                    			if(index%1===0){
                    				return values
                    			}
                    		});
                    		
//                    		console.log(values2);
                    		
                    		//单位进行确定,取整亿为单位
                    		for(var i=0;i<values2.length;i++){
                    			if(values2[i]>max){
                    				max = values2[i]
                    			}
                    		}
                    		if(max>100000000){
                    			dw = "亿";
                    			for(var i=0;i<values2.length;i++){
                    				values2[i]=(values2[i]/100000000).toFixed(2);
                				}
                			}else if(max>=10000){
                				dw='万';
                				for(var i=0;i<values2.length;i++){
                					values2[i]=(values2[i]/10000).toFixed(2);
                				}
                    		}

                    		var domt = document.getElementById("container");
                            var myChart = echarts.init(domt);
                            var app = {};
                            // option = null;
                            option = {
                                  backgroundColor: '#ffffff',//背景色
                                   grid: {
                                        width:"86%",
                                        height:"75%",
                                        top:"65px"
                                        // left: '2%',
                                        // right: '0.5%',
                                        // bottom: '3%',
                                        // containLabel: true
                                        },
                              title: {

                                    text: '数据增量统计',
                                    left: '20px',
                                    top:'10px',
                                    textStyle: {"fontSize": 16,"fontWeight": "500","color": "#333","width":"13000px"} ,
//                                    subtext:'统计最近30天数据增量   单位/'+dw,
                                    subtext:'统计最近30天数据增量'

                                },
                                tooltip : {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data:['省厅数据','地市数据','所有数据'],
                                     top: '20px'
                                },
                                calculable : true,
                                xAxis : [
                                    {
                                        type : 'category',
                                        boundaryGap : false,
//                                        data : ['2017/11/3','2017/11/9','2017/11/15','2017/11/19','2017/11/23','2017/11/25','2017/11/30']
                                        data:date2
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value',
                                    	axisLabel: {
                			                formatter: '{value}'+dw
                			            }
//                                    	 axisLabel : {
//                                             formatter: '{value} °C'
//                                         }
                                    }
                                ],
                                series : [ 
        		                            {  
//        		                                name:'省厅数据',
        		                                type:'line',
        		                                cursor: 'pointer',
        		                                top:'100px',
        		                                // stack: '总量',
//        		                                data:[20, 32, 51, 34, 70, 30, 10],
        		                                data:values2,
        		                                itemStyle:{
        		                                  normal:{
        		                                      color: "#F60" //图标颜色
        		                                  }
        		                              },
        		                              // lineStyle:{
        		                              //     normal:{
        		                              //         width:10,  //连线粗细
        		                              //         color: "#0F0"  //连线颜色
        		                              //     }
        		                              // }
        		                            },
//        		                            {
//        		                                name:'地市数据',
//        		                                type:'line',
//        		                                // stack: '总量',
//        		                                data:[30, 22, 31, 34, 90, 50, 40]
//        		                            },
//        		                            {
//        		                                name:'所有数据',
//        		                                type:'line',
//        		                                data:[50, 54, 82, 68, 160, 80, 50]
//        		                            }
        		                         ]
                            	};
                                  if (option && typeof option === "object") {
                                	  myChart.setOption(option, true);
                                  }     
//                    	})
                    	

                    }).error(function(data) {
                        
                    });
                   
                    

       }]);
    