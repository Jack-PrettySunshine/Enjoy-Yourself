var tableid = "";
function copytBodyWidth(id) {
	tableid = id;
	var b = $('#' + id + ' .tcontent').find('tr:first').find('td');
	var c = $('#' + id + ' .thead').find('tr:first').find('td');
	var tbwidth = 0;
	for (var i = 0; i < b.length; i++) {
		var colWith = b.eq(i).width();
		var titleWith = c.eq(i).width();
		if (!titleWith)
			continue;
		if (colWith <= titleWith) {
			c.eq(i).width(titleWith);
			b.eq(i).width(titleWith);
			tbwidth += titleWith + 30;
		} else {
			c.eq(i).width(colWith);
			tbwidth += colWith + 30;
		}
	}
	tbwidth += 40;
	$('#' + id + ' .thead table').attr('width', tbwidth);
	$('#' + id + ' .tcontent table').attr('width', tbwidth);
	$('#' + id + ' .tcontent').scroll(
			function(e) {
				$('#' + id + ' .thead table').css('left',
						(-$(this).scrollLeft()) + 'px');
			});
}
// 重置页面
function f_HomePage() {

	var height = $(window).height();
	var width = $(window).width();
	$("#content").css("height", (height - 60) + "px");
	$("#left").css("height", (height - 60) + "px");
	$("#right").css("width", (width - 176 - 30) + "px");
	// $(".right-content").css("width", (width -176-12-6) + "px");
	// $(".homepage").css("width",(width -176 -30) + "px");
	// $(".homepage").css("height",(height -80) + "px");
	$(".homepage a").css("width", (width - 176 - 30) + "px");
	$(".homepage a").css("height", (height - 110) + "px");

	$(".right-content div").css("border", "1px solid #f6f7fa");
	$(".right-content div").css("background", "#f6f7fa");
	$("#left").css("background-color", "#f6f7fa");

}
function cu_hide(vl) {
	$(vl).animate({
		opacity : 'hide'
	}, 'show');
}
function cu_show(vl) {
	$(vl).show().animate({
		opacity : '0.5'
	}, 'show');
}
var SidebarTabHandler = {
	resetFirst : function() {
		$(".box").find(".tabItemContainer>li>a").removeClass("tabItemCurrent");
		$(".box").find(".tabItemContainer>li>a:first").addClass(
				"tabItemCurrent");

		$(".box").find(".tabBodyItem").removeClass("tabBodyCurrent");
		$(".box").find(".tabBodyItem:first").addClass("tabBodyCurrent");

		$(".updatebox").find(".tabItemContainer>li>a").removeClass(
				"tabItemCurrent");
		$(".updatebox").find(".tabItemContainer>li>a:first").addClass(
				"tabItemCurrent");

		$(".updatebox").find(".tabBodyItem").removeClass("tabBodyCurrent");
		$(".updatebox").find(".tabBodyItem:first").addClass("tabBodyCurrent");

	},
	Init : function() {
		$(".box").find(".tabItemContainer>li").click(
				function() {
					$(".box").find(".tabItemContainer>li>a").removeClass(
							"tabItemCurrent");
					$(".box").find(".tabBodyItem")
							.removeClass("tabBodyCurrent");
					$(this).find("a").addClass("tabItemCurrent");
					$($(".box").find(".tabBodyItem")[$(this).index()])
							.addClass("tabBodyCurrent");
					var _tabLength = $(".tabItemContainer>li>a").length - 3

					// if($(this).index()<2){
					if ($(this).index() < _tabLength) {
						$(".box>form>.rownext").show();
						$(".box>form>.rowsub").hide();
					} else {
						$(".box>form>.rownext").hide();
						$(".box>form>.rowsub").show();
					}
				});
		$(".updatebox").find(".tabItemContainer>li").click(
				function() {
					$(".updatebox").find(".tabItemContainer>li>a").removeClass(
							"tabItemCurrent");
					$(".updatebox").find(".tabBodyItem").removeClass(
							"tabBodyCurrent");
					$(this).find("a").addClass("tabItemCurrent");
					$($(".updatebox").find(".tabBodyItem")[$(this).index()])
							.addClass("tabBodyCurrent");
				});
		$(".nextstep").click(
				function() {

					obj = $(".box").find(".tabItemCurrent").parent().next()
							.children("a");
					obj2 = $(".box").find(".tabBodyCurrent").next();
					var i = $(".box").find(".tabItemCurrent").parent().next()
							.index();
					$(".box").find(".tabItemContainer>li>a").removeClass(
							"tabItemCurrent");
					$(".box").find(".tabBodyItem")
							.removeClass("tabBodyCurrent");
					obj.addClass("tabItemCurrent");
					obj2.addClass("tabBodyCurrent");
					// 判断到最后一页才显示确定按钮
					var _tabLength = $(".tabItemContainer>li>a").length - 3
					if (i >= _tabLength) {
						$(".box>form>.rownext").hide();
						$(".box>form>.rowsub").show();
					}
					// if(i>=2){
					// $(".box>form>.rownext").hide();
					// $(".box>form>.rowsub").show();
					// }
				});

		/*
		 * if(1024<$(window).innerWidth()<1900) { var
		 * h=$(window).innerWidth()*1.25/1920; } else
		 * if($(window).innerWidth()>=1900) { var h=$(window).innerWidth()/1920; }
		 * else{ var h=0.8; } $(".box").css("transform","scale("+h+")");
		 * $(".box").css("-moz-transform","scale("+h+")");
		 * $(".box").css("-webkit-transform","scale("+h+")");
		 * $(".box").css("-ms-transform","scale("+h+")");
		 * 
		 * $(".updatebox").css("transform","scale("+h+")");
		 * $(".updatebox").css("-moz-transform","scale("+h+")");
		 * $(".updatebox").css("-webkit-transform","scale("+h+")");
		 * $(".updatebox").css("-ms-transform","scale("+h+")");
		 */

		var h = $(window).innerHeight() * 0.65;
		$(".box").find(".tabBodyContainer").css("max-height", h + "px");
	}
}
function _0(item) {
	if (item) {
		for (i in item) {
			return item[i];
		}
	}
	return "";
}
var formatDate = function(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
};
function cancel() {
	$(".box").fadeOut("fast");
	$(".ConfirmBox2").fadeOut("fast");
	$(".updatebox").fadeOut("fast");
	$(".errBox").fadeOut("fast");
	$("#mask").remove();
	$(".verhid").fadeOut("fast");
	$(".ConfirmBox").fadeOut("fast");
	resetFileInput();
}

function cancel_errBox() {
	$(".errBox").fadeOut("fast");
	$("#maskErr").remove();
}

function CancelConfirm() {
	$(".ConfirmBox").fadeOut("fast");
}

function showConfirmBox() {
	$(".box").add($(".ConfirmBox"));
	$(".ConfirmBox").show();
}

function showcharge() {
	$("body").append("<div id='mask2'></div>");
	$(".ChargeBox").show();
	$("#mask2").addClass("mask2").fadeIn();
}
function CancelCharge() {
	$(".ChargeBox").fadeOut("fast");
	$("#chargeconfim").hide();
	$("#mask2").remove();
}
function showChargeConfirmBox() {
	$(".ChargeBox").add($("#chargeconfim"));
	$("#chargeconfim").show();
}
function showchild(obj) {

	$(obj).parent().parent().children(".child").toggle();

}
function chooseAll(obj) {
	if ($(obj).prop("checked")) {

		$(obj).parent().parent().children(".child").find(".choose").prop(
				'checked', true);

	} else {
		$(obj).parent().parent().children(".child").find(".choose").prop(
				'checked', false);

	}

	var checkNum = 0
	var num = $(obj).parent().parent().parent().children("ul li ").find(
			".choose").not("[name]").length;
	var checkNum = $(obj).parent().parent().parent().children("ul li ").find(
			".choose:checked").not("[name]").length;
	if (checkNum == 0 || num != checkNum) {
		$(obj).parent().parent().parent().parent().children(".list").find(
				"label").eq(1).find(".choose").prop('checked', false);
	} else if (num == checkNum) {
		$(obj).parent().parent().parent().parent().children(".list").find(
				"label").eq(1).find(".choose").prop('checked', true);
	}
}

function chooseFalse(obj) {
	var checkNum = 0;
	var jqobj = $(obj).parent().parent().parent().parent();
	var num = jqobj.children(".child").find(".choose").length
	checkNum = jqobj.children(".child").find(".choose:checked").length
	if (checkNum == 0 || num != checkNum) {
		jqobj.children().find(".choose").eq(0).prop('checked', false);
	} else if (num == checkNum) {
		jqobj.children().find(".choose").eq(0).prop('checked', true);
	}

	var checkNum1 = 0;
	var num1 = $(obj).parent().parent().parent().parent().parent().children(
			"ul li ").find(".choose").not("[name]").length;
	var checkNum1 = $(obj).parent().parent().parent().parent().parent()
			.children("ul li ").find(".choose:checked").not("[name]").length;
	if (checkNum1 == 0 || num1 != checkNum1) {
		$(obj).parent().parent().parent().parent().parent().parent().children(
				".list").find("label").eq(1).find(".choose").prop('checked',
				false);
	} else if (num1 == checkNum1) {
		$(obj).parent().parent().parent().parent().parent().parent().children(
				".list").find("label").eq(1).find(".choose").prop('checked',
				true);
	}
}

function resetLeftmenu() { // 重置左侧栏高度

	var rightHeight = $(".wrap-chart").height();

	// console.log("hello leftmenu"+rightHeight);

	$("#left .left-menu").css("height", (rightHeight) + "px");

}

// 重置页面
function f_initPage() {

	var height = $(window).height();
	var width = $(window).width();
	$("#content").css("height", (height - 61) + "px");
	$("#left").css("height", (height - 61) + "px");
	$("#right").css("width", (width - 170 - 17) + "px");
	$(".updatebox").css("height", (height - 90) + "px");
	$("#dataContent").css("height", (height - 61) + "px");
	var ht = 400;
	if ($(".team").length > 0)
		ht = (height - 80 - 32 - 120 - 4 - 50-30);
	else
		ht = (height - 80 - 32 - 120 - 4-30);
	if ($(".team2").length > 0)
		ht = ht - 15;
	if($("#Bversion").length > 0) {
		ht = ht - 80;
	}
	$("#dataList").css("height", height-280+ "px");
	$(".tcontent").css("height", height-280 + "px");
	//$("#left").css("background-color", "#2d2d2d");
	$("#left .left-menu").css("height", (height - 90) + "px");
	if ($(".chart-head").length > 0) {
		resetLeftmenu();
	}

	if (tableid != "") {
		var b = $('#' + tableid + ' .tcontent').find('tr:last').find('td');
		var c = $('#' + tableid + ' .thead').find('tr:last').find('td');
		var tmaxwidth = $('#' + tableid + ' .thead').width();
		var tbwidth = 0;
		for (var i = 0; i < b.length; i++) {
			var colWith = b.eq(i).width();
			var titleWith = c.eq(i).width();
			// if (!titleWith) continue;
			if (i == b.length - 1
					&& tmaxwidth
							- (tbwidth + (colWith <= titleWith ? titleWith
									: colWith)) > 0) {
				var endw = tmaxwidth - tbwidth - 60;
				$('#' + tableid + ' .tcontent').find('table').removeAttr(
						"width");
				$('#' + tableid + ' .thead').find('table').removeAttr("width");
				$('#' + tableid + ' .tcontent').find('table').width(tmaxwidth)
						.find("tr:first").width(tmaxwidth).find("td:last")
						.width(endw).css("max-width", endw + "px");
				$('#' + tableid + ' .thead').find('table').width(tmaxwidth)
						.find("tr:first").width(tmaxwidth).find("td:last")
						.width(endw).css("max-width", endw + "px");
			} else {
				if (colWith <= titleWith) {
					tbwidth += titleWith + 30;
					c.eq(i).width(titleWith);
					b.eq(i).width(titleWith);
				} else {
					tbwidth += colWith + 30;
					c.eq(i).width(colWith);
					b.eq(i).width(colWith);
				}
			}
		}
	}
}
// 记录coodies
function setCookie(name, value) {
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	if (expires != null) {
		var LargeExpDate = new Date();
		LargeExpDate.setTime(LargeExpDate.getTime()
				+ (expires * 1000 * 3600 * 24));
	}
	document.cookie = name
			+ "="
			+ escape(value)
			+ ((expires == null) ? "" : ("; expires=" + LargeExpDate
					.toGMTString()));
}
// 读取coodies
function getCookie(Name) {
	var search = Name + "="
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
		if (offset != -1) {
			offset += search.length
			end = document.cookie.indexOf(";", offset)
			if (end == -1)
				end = document.cookie.length
			return unescape(document.cookie.substring(offset, end))
		} else
			return ""
	}
}

function resetFileInput() {
	var fileN = $("#fileN")
	if (fileN.length > 0) {
		fileN.after(fileN.clone().val(""));
		fileN.remove();
	}
	var fileE = $("#fileE")
	if (fileE.length > 0) {
		fileE.after(fileE.clone().val(""));
		fileE.remove();
	}
}

function getRootPath() {
	var strFullPath = window.document.location.href;
	var strPath = window.document.location.pathname;
	var pos = strFullPath.indexOf(strPath);
	var prePath = strFullPath.substring(0, pos);
	var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
	return (prePath + postPath);
}

// 二级目录展开
function showsecond(obj) {
	// $(this).toggleClass("currentDd").siblings(".subNav").removeClass("currentDd")
	$(obj).toggleClass("currentDt").siblings(".subNav")
			.removeClass("currentDt")
	$(obj).next(".navContent").slideToggle(500).siblings(".navContent")
			.slideUp(500);

}






