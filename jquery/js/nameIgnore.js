;jQuery(function($){
	//获取页面元素
	var keyword = $('#keyword');
	var datalist = $('#datalist');

	var namelist = '高业桦,陈武强,黄志威,毛继陆,岑雨堂,刘子杨,王文健,张惠媚,饶荣,谢中煌,陈俊明,梁浩贤,骆飞平,曾洋洋,陈素允,曹毓琦,刘韵,徐进文,区家如,吴光艳,吕祖垚,陆金锋,小羊,杨培钦,徐啸,潘然然,林志浩';

	var arr_namelist = namelist.split(',');

	//使用JQ-ui
	keyword.autocomplete({source:arr_namelist});

});