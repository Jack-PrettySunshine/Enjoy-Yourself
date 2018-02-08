jQuery(function($){
			var $container = $('.container');
			var $Tab = $('.container span');
			var $content = $('#content');
			
			console.log($Tab[0]);//DOMjie点原生对象
			console.log($Tab.get(1));
			console.log($Tab.get([2]));
		
			//默认第一个高亮
			
			$($Tab[0]).addClass('active');
			$content.children().first().show().nextAll().hide();

			//绑定点击事件事件委托
			$container.on('click','span',function(){
				var idx = $(this).index();//索引							
				$(this).addClass('active').siblings().removeClass('active');

				//content对应索引的内容显示并隐藏其他内容
				$content.children().eq(idx).fadeIn().siblings().fadeOut();
			})
})