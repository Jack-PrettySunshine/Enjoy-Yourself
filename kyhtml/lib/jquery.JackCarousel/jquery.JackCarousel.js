;(function($){
	// $.prototype.lxCarousel = function(options){
	$.fn.JackCarousel = function(options){
		

		// 默认参数
		var defaults = {
			width:810,
			height:320,
			autoPlay:true,
			small:false,
			buttons:true,
			page:true,
			duration:3000,
			index:1,
			type:'horizontal',//vertical,horizontal,fade,show
			seamless:true
		}

		var opt = $.extend({},defaults,options);

		var imgs = opt.imgs;
		
		//图片复制
		imgs.unshift(imgs[imgs.length-1]);
		imgs.push(imgs[1]);

		return this.each(function(idx,ele){

			var $self = $(ele);

			var len = imgs.length;

			// 添加特定类名
			$self.addClass('JackCarousel');

			// 定义宽高
			$self.css({
				width:opt.width,
				height:opt.height
			})
			
			// 生成大图
			var $ul = $('<ul/>');

			$.each(opt.imgs,function(idx,url){
				$('<li/>').html(`<img src="${url}">`).appendTo($ul);
			});

			//大图初始位置
			opt.type === 'horizontal'? $ul.css({left:-(opt.index)*opt.width}):$ul.css({top:-(opt.index)*opt.height});

			//生成小图
			if(opt.small){

				//小图克隆

				var $small = $ul.clone(true,true).width(opt.width);

				//小图移除第一张和最后一张
				$small.children().eq(len-1).remove();
				$small.children().eq(0).remove();
				$small.insertAfter(this).addClass('JackCarouselCarouselSmall');

				//创建遮罩层
				var $cover = $('<div/>').addClass('JackCarouselCarouselCover').css({height:'80px',position:'absolute',top:'0',left:'0',width:$small.first().outerWidth(true)});
				//小图浮动并且添加遮罩层
				$small.children().css({'float':'left',position:'relative'}).append($cover);
				$small.find('img').width(opt.width/(len-2)).css({display:'block'});

				//默认只有第一张没有遮罩
				$small.find('div').each(function(idx,ele){
					idx === 0?  $(ele).css({background:'#000',opacity:0}): $(ele).css({background:'#000',opacity:0.7})
				})
			}

			$ul.appendTo($self);

			// 水平排列
			if(opt.type === 'horizontal'){
				$ul.width(opt.width*len);
				// $ul.addClass('horizontal');
			}

			// 默认显示图片
			var index = opt.index;
			
			// 生成分页
			if(opt.page){
				var $page = $('<div/>').addClass('page');
				for(var i=1;i<=len-2;i++){
					// var $span = $('<span/>');是否需要数字
					var $span = $('<span/>').text(i);
					// 给第一个span添加高亮
					if(i==index){
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

			var timer;

			// 上一页下一页
			$self.on('click','.prev',function(){
				index--;
				showPic();
			}).on('click','.next',function(){
				index++;
				showPic();
			})

			// 移入移出
			.on('mouseenter',function(){
				clearInterval(timer);//是否对prev,next隐藏
				// $('.prev').show();
				// $('.next').show();
			}).on('mouseleave',function(){
				timer = setInterval(autoPlay,opt.duration);
				// $('.prev').hide();
				// $('.next').hide();
			})


			// 点击页码
			.on('click','.page span',function(){
				index = $(this).index()+1;
				showPic();
			})

			// 自动轮播
			if(opt.autoPlay){
				$self.trigger('mouseleave');
			}

			function autoPlay(){
				index++;
				showPic();
			}

			function showPic(){
				// 到达最后一张时，重新回到第一张
				// 到达第一张一张时，重新回到最后一张
				if(index > len-1){

					opt.type === 'horizontal'? $ul.css({left:-(opt.width)}) : $ul.css({top:-(opt.height )});
					index = 2;
				}else if(index<=0){
					opt.type === 'horizontal'? $ul.css({left:-(opt.width)*(len-1)}) : $ul.css({top:-(opt.height)*(len-1)});
					index = len-2;
				}

				// 滚动显示每一张图片
				var obj;

				if(opt.type === 'horizontal'){
					obj = {left:-index*opt.width};
				}else if(opt.type === 'vertical'){
					obj = {top:-index*opt.height};
				}

				$ul.stop().animate(obj);

				// 高亮分页
				if(opt.page){
					if(index === len-1){
						$page.children().eq(0).addClass('active').siblings().removeClass();
					}else{
						$page.children().eq(index-1).addClass('active').siblings().removeClass();
					}
				}

				//小图淡入淡出效果
				if(opt.small){	
					if(index === len-1){
						$small.find('div').each(function(idx,ele){
							idx === 0? $(ele).animate({opacity:0}):$(ele).animate({opacity:0.7})
						})	
					}else{
						$small.find('div').each(function(idx,ele){
							idx === index-1? $(ele).stop(true).animate({opacity:0}):$(ele).stop(true).animate({opacity:0.7})
						})	
					}
				}
			}
		});
	}
})(jQuery);
