
;(function($){
	// $.prototype.lxCarousel = function(options){
	$.fn.JackCarousel = function(options){
		// this => $('#lbt');
		// 默认参数
		var defaults = {
			//width:this.outerWidth(),
			//height:this.outerHeight(),
			width:810,
			height:320, 
			autoPlay:true,//ok
			small:false,
			buttons:false,//ok
			page:false,//ok
			duration:5000,//ok
			index:0,//ok
			type:'fade',//vertical,horizontal,fade,show
		}
		var opt = $.extend({},defaults,options);
		
		return this.each(function(idx,ele){
			var $self = $(ele), 		
				index = opt.index,// 默认显示图片
				len = opt.imgs.length,//轮播图片数量
				lens,//垂直或水平无缝滚动图片数量
				obj,//动画对象
				timer;//定时器
			$self.addClass('JackCarousel').css({
				width:opt.width,
				height:opt.height
			});

		    /*$self.css({
				width:opt.width,
				height:opt.height
			});*/

			var $ul = $('<ul/>');
			//生成水平方向轮播图和垂直方向的轮播图的结构
			if(opt.type === 'horizontal' || opt.type === 'vertical'){
				lens = len+1;
				$.each(opt.imgs,function(idx,url){
					$('<li/>').html(`<img src="${url}">`).appendTo($ul);
				});
				var copy = $ul.children().eq(0).clone(true);
				$ul.append(copy);
				$ul.appendTo($self);
				if(opt.type === 'horizontal'){
					$ul.width(opt.width*lens);
					$ul.addClass('horizontal');
				}
			}else{
				//生成fade的和默认的结构
				var $box = $('<div/>').addClass('fade').css({
					width:opt.width,
					height:opt.height
				});	
				var html = options.imgs.map(function(item){
					return `<img src="${item}">`;
				}).join('');
				// $self.find('.fade img').css({
				// 	width:opt.width,
				// 	height:opt.height
				// });
				$box.html(html).appendTo($self);
				$self.find('.fade img').eq(index)[0].style.opacity = 1;
				/*$('img').eq(index)[0].style.opacity = 1;*/
			}
			// 生成分页
			if(opt.page){
				$page = $('<div/>').addClass('page');
				for(var i=1;i<=len;i++){
					$span = $('<span/>').text(i);

					// 给第一个或者指定的span添加高亮
					if(i==index+1){
						$span.addClass('active');
					}
					$span.appendTo($page);
				}
				$page.appendTo($self);
			}
			// 前后按钮
			if(opt.buttons){
				$('<div/>').addClass('prev').html('&lt;').appendTo($self);
				$('<div/>').addClass('next').html('&gt;').appendTo($self);
			}
			//是否生成small图
			if(opt.small && opt.type!== 'vertical'){
				var $small = $('<ul/>').addClass('small');
				//设置small的宽高
				$small.css({
					width:opt.width,
					height:opt.height/len
				})
				/*$small.width = (opt.width);
				$small.height = (opt.height/4);*/
				$.each(opt.imgs,function(idx,url){
					$('<li/>').html(`<img src="${url}">`).appendTo($small);
				});
				//添加small增加$self的高度
				$self.css({
					height:opt.height + opt.height/len
				});
				$self.append($small);
				//设置small下面的li的宽高
				$self.find('.small li').css({
					height:opt.height/len,
					width:opt.width/len
				});
				//$self的高度改变之后要改变页码的定位
				if(opt.page){
					$self.find('.page')[0].style.bottom = (opt.height/len + 15) + 'px';
				}			
				//$self的高度改变之后要改变上一张和下一张按钮的定位
				if(opt.buttons){
					$self.find('.prev')[0].style.top = -opt.height/len+ 'px';
					$self.find('.next')[0].style.top = opt.height/2+ 'px';
				}
				
				//让small下面的图片第一张或者指定的透明度为1
				$self.find('.small img').eq(index)[0].style.opacity = 1;
			}
		
			// 上一页下一页
			$self.on('click','.prev',function(){
				index--;
				if(opt.type === 'horizontal' || opt.type === 'vertical'){
					if(index<0){
						index = lens - 2;
						if(opt.type === 'horizontal'){
							$ul[0].style.left = -len*opt.width + 'px'
						}else{
							$ul[0].style.top = -len*opt.height + 'px'
						}
					}
				}
				showPic();
			}).on('click','.next',function(){
				index++;
				showPic();
			})

			// 移入移出
			.on('mouseenter',function(){
				clearInterval(timer);
				// $self.find('.page').show();
				// $self.find('.prev').show();
				// $self.find('.next').show();
			}).on('mouseleave',function(){
				timer = setInterval(autoPlay,opt.duration);
				// $self.find('.page').hide();
				// $self.find('.prev').hide();
				// $self.find('.next').hide();
			})
			// 点击页码
			.on('mouseenter','.page span',function(){
				index = $(this).index();
				showPic();
			})
			//点击small
			.on('mouseenter','.small li',function(){
				index = $(this).index();
				showPic();
			})
			// 是否自动轮播
			if(opt.autoPlay){
				$self.trigger('mouseleave');
			}

			function autoPlay(){
				index++;
				showPic();
				
			}

			function showPic(){
				//处理垂直方向的无缝轮播的index值和ul定位
				if(opt.type === 'vertical'){
					if(index >lens-1){
						$ul[0].style.top = 0;
						index = 1;
					}else if(index<0){
						index = lens - 1;
					}
					//处理水平方向的无缝轮播的index值和ul定位
				}else if(opt.type === 'horizontal'){
					if(index >lens-1){
						$ul[0].style.left = 0;
						index = 1;
					}else if(index<0){
						index = lens - 1;
					}
				}else{
					// 默认fade的index
					if(index > len-1){
						index = 0;
					}else if(index<0){
						index = len-1;
					}
				}		
				//执行轮播图动画
				if(opt.type === 'horizontal'){
					obj = {left:-index*opt.width};
					$ul.stop().animate(obj);
				}else if(opt.type === 'vertical'){
					obj = {top:-index*opt.height};
					$ul.stop().animate(obj);
				}else{
					$box.children().stop().eq(index).animate({opacity:1}).siblings().animate({opacity:0});
				}
				// 高亮分页
				if(opt.page){
					if(index === len){
						$self.find('.page span').first().addClass('active').siblings().removeClass();
					}
					$self.find('.page span').eq(index).addClass('active').siblings().removeClass();
				}
				//small动画
				if(opt.small && opt.type!== 'vertical'){
					if(index === len){
						$self.find('.small img').eq(len-1).stop().animate({opacity:0.5});
						$self.find('.small img').first().stop().animate({opacity:1});
					}else{
						$self.find('.small img').stop().animate({opacity:0.4});
						$self.find('.small img').eq(index).stop().animate({opacity:1});
					}	
				}
			}
		});
		
	}

})(jQuery);
