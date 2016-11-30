//率选出与点击相应的内容，其他内容隐藏
/*$(document).ready(function(){
	$('#topics a').on('click',function(event){
		event.preventDefault();//避免鼠标的默认操作
		var topic = $(this).text();//获取当前操作对象的文本节点，赋给topic

		$('#topics a.selected').removeClass('selected');//把a标签中的selected样式去掉
		$(this).addClass('selected');//给当前操作对象添加selected样式

		$('#news tr').show();//显示表格所有行
		if(topic != 'All'){//判断topic不是All，就执行下面语句
			//把tr中的td隐藏起来，除了与操作当前对象的文本节点相同以外
			$('#news tr:has(td):not(:contains("'+ topic +'"))').hide();
		}
	});
});*/

//优化1
/*$(document).ready(function(){
	$('#topics a').on('click',function(event){
		event.preventDefault();//避免鼠标的默认操作
		var topic = $(this).text();//获取当前操作对象的文本节点，赋给topic

		$('#topics a.selected').removeClass('selected');//把a标签中的selected样式去掉
		$(this).addClass('selected');//给当前操作对象添加selected样式

		$('#news').find('tr').show();//显示表格所有行
		if(topic != 'All'){//判断topic不是All，就执行下面语句
			//把tr中的td隐藏起来，除了与操作当前对象的文本节点相同以外
			//$('#news tr:has(td):not(:contains("'+ topic +'"))').hide();
			$('#news').find('tr:has(td)').not(function(){
				// 这里当前对象就变成了tr里的td了
				//所以这里的children就是id，选择的就是第四个单元格中的文本
				return $(this).children(':nth-child(4)').text() == topic;
			}).hide();
		}
	});
});*/

//为表格行添加条纹效果
/*$(document).ready(function(){
	$('#news').find('tr:nth-child(odd)').addClass('alt');
});*/

//给前两行添加这个类，
//后两行不加，依此类推
/*$(document).ready(function(){
	//filter也是一个查找函数,index 是从0 开始计数的
	$('#news tr').filter(function(index){
		return (index % 4) < 2;
	}).addClass('alt');
});*/

//为了保证外观的一致，还要跳过表格中的标题行
$(document).ready(function(){
	//文档加载完毕后会立即调用 stripe() 函数， 
	//每次单击主题链接时也会调用一次该函数
	function stripe(){
		$('#news').find('tr.alt').removeClass('alt');
		$('#news tbody').each(function(){
			//filter也是一个查找函数,index 是从0 开始计数的
			//$(this).children(':visible').has('td').filter(function(index){
				//return (index % 4) < 2;
			//}).addClass('alt');
			$(this).children(':visible').has('td')
				.filter(':group(3)').addClass('alt');
		});	
	}
	stripe();
	$('#topics a').on('click',function(event){
		event.preventDefault();//避免鼠标的默认操作
		var topic = $(this).text();//获取当前操作对象的文本节点，赋给topic

		$('#topics a.selected').removeClass('selected');//把a标签中的selected样式去掉
		$(this).addClass('selected');//给当前操作对象添加selected样式

		$('#news').find('tr').show();//显示表格所有行
		if(topic != 'All'){//判断topic不是All，就执行下面语句
			//把tr中的td隐藏起来，除了与操作当前对象的文本节点相同以外
			//$('#news tr:has(td):not(:contains("'+ topic +'"))').hide();
			$('#news').find('tr:has(td)').not(function(){
				// 这里当前对象就变成了tr里的td了
				//所以这里的children就是id，选择的就是第四个单元格中的文本
				return $(this).children(':nth-child(4)').text() == topic;
			}).hide();
		}
	stripe();
	});
});

//改变行数效果
(function($){
	$.extend($.expr[':'], {
		group: function(element, index, matches, set){
			//matches[3] 是这个数组中唯一有用的值；
			//假设有一个选择符的形式为 :group(b) ，则
			//matches[3] 中包含的值就是 b ，也就是括号中的文本
			//我们这个例子中，只需要 index 和 matches 这两个参数
			var num = parseInt(matches[3], 10);
			if(isNaN(num)){
				return false;
			}
			return index % (num * 2) < num;
		}
	});
})(jQuery);