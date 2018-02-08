jQuery(function($){
		
			$('#ite').on("mouseover","li",function(){
					
					$(this).children().eq(1).css("display","block");
					
			}).on("mouseout","li",function(){
				
				
					$(this).children().eq(1).css("display","none");
				
					
			})

			//吸顶菜单
			var headers = $('.handle')[0];
			
			window.onscroll = function(){
				 
				//先获取滚动条滚动过的距离
				var scrollTop = window.scrollY;
				// console.log(scrollTop);
				if(scrollTop > 200){
					headers.className = 'handle fixed';
				}else{
					headers.className = 'handle';
				}	

				//body对象  
		        var $body = $("body");  
		        //body高度  
		        var bh = $body.height();
		         var wh = $(window).height();    
				//动态添加类名
			if(scrollTop>wh){  
                 
            }  
				// console.log(scrollTop,bh,wh);
			}
			var wow = new WOW({
			    boxClass: 'wow',
			    animateClass: 'animated',
			    offset: 0,
			    mobile: true,
			    live: true
			});
			wow.init();
			//animated fadeInUp
			
			//遍历
			// for(var i=0; i<$(".title").length; i++){
			// 	$(".title")[i].classList.add("animated", "fadeInUp");
			// }
		

			// var oldscolltop =0 ;
			// var curscolltop;
			//  window.onscroll = function(){
			//  	var scrollTop = window.scrollY;
			 	
			//  	var del = scrollTop - oldscolltop;
			//  	if(scrollTop<=149){
			//  		headers.className = 'handle';
			//  	}else if(del<0){			 	
			//  		headers.className = 'handle fixed';
			//  	}else{
			//  		headers.className = 'handle';
			//  	}
			//  	oldscolltop = scrollTop;
			//  }
})