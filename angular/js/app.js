'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.when('/chart', {templateUrl: 'partials/chart.html', });
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]).controller('demo', ['$scope', function($scope){

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

                           
                var companyChart = new Highcharts.chart('container0', {  //企业月度数量
                chart: {
                    type: 'line'
                },
                title: {
                    text: '',
                    align: "left",
                    style:{
                        color: '#FF00FF',
                        fontWeight: 'bold',
                     },
                 
                 
                },
                credits:{enabled:false},
                subtitle: {
                    text: ''
                },
                xAxis: {
                    lineColor:'rgb(86,132,254)',
                    tickColor:'#fff', 
                    labels:{
                            align: 'right',
                            style:{color:'rgb(86,132,254)'
                           }},             
                    startOnTick: true,
                    gridLineWidth:1,  
                    type: 'category',    
                    categories:['201502', '201503', '201504', '201505', '201506', '201507', '201508','201509','201510','201511','201512','201601']
                },
                yAxis: {
                        min: 0,
                        startOnTick: true,  
                        endOnTick: true,  
                        lineWidth: 1,
                        lineColor: 'rgb(86,132,254)',
                        labels:{
                            style:{color:'rgb(86,132,254)'
                           }},  
                        gridLineWidth:1,  
                        gridLineColor: '#d3d3d3',  
                        tickColor:'#fff', 
                        tickLength: 5,  
                        tickWidth: 1,
                        title:{text:""}            
 

                },

                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        color:'rgb(86,132,254)',
                        dataLabels: {
                            enabled: false,
                            format:'{point.y:.0f}',
                            color:'rgb(86,132,254)'
                        }
                    }
                },
                colors: ["rgb(86,132,254)"],
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<b>{point.y:.0f}</b> <br/>'
                },
                series: [{
                    name: '企业数量',        
                    data: [100, 120,110, 130, 160, 150,170,200,190,200,250,220]
                }],
            });














  	
  }])
