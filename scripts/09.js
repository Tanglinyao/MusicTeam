//��ѡ��������Ӧ�����ݣ�������������
/*$(document).ready(function(){
	$('#topics a').on('click',function(event){
		event.preventDefault();//��������Ĭ�ϲ���
		var topic = $(this).text();//��ȡ��ǰ����������ı��ڵ㣬����topic

		$('#topics a.selected').removeClass('selected');//��a��ǩ�е�selected��ʽȥ��
		$(this).addClass('selected');//����ǰ�����������selected��ʽ

		$('#news tr').show();//��ʾ���������
		if(topic != 'All'){//�ж�topic����All����ִ���������
			//��tr�е�td���������������������ǰ������ı��ڵ���ͬ����
			$('#news tr:has(td):not(:contains("'+ topic +'"))').hide();
		}
	});
});*/

//�Ż�1
/*$(document).ready(function(){
	$('#topics a').on('click',function(event){
		event.preventDefault();//��������Ĭ�ϲ���
		var topic = $(this).text();//��ȡ��ǰ����������ı��ڵ㣬����topic

		$('#topics a.selected').removeClass('selected');//��a��ǩ�е�selected��ʽȥ��
		$(this).addClass('selected');//����ǰ�����������selected��ʽ

		$('#news').find('tr').show();//��ʾ���������
		if(topic != 'All'){//�ж�topic����All����ִ���������
			//��tr�е�td���������������������ǰ������ı��ڵ���ͬ����
			//$('#news tr:has(td):not(:contains("'+ topic +'"))').hide();
			$('#news').find('tr:has(td)').not(function(){
				// ���ﵱǰ����ͱ����tr���td��
				//���������children����id��ѡ��ľ��ǵ��ĸ���Ԫ���е��ı�
				return $(this).children(':nth-child(4)').text() == topic;
			}).hide();
		}
	});
});*/

//Ϊ������������Ч��
/*$(document).ready(function(){
	$('#news').find('tr:nth-child(odd)').addClass('alt');
});*/

//��ǰ�����������࣬
//�����в��ӣ���������
/*$(document).ready(function(){
	//filterҲ��һ�����Һ���,index �Ǵ�0 ��ʼ������
	$('#news tr').filter(function(index){
		return (index % 4) < 2;
	}).addClass('alt');
});*/

//Ϊ�˱�֤��۵�һ�£���Ҫ��������еı�����
$(document).ready(function(){
	//�ĵ�������Ϻ���������� stripe() ������ 
	//ÿ�ε�����������ʱҲ�����һ�θú���
	function stripe(){
		$('#news').find('tr.alt').removeClass('alt');
		$('#news tbody').each(function(){
			//filterҲ��һ�����Һ���,index �Ǵ�0 ��ʼ������
			//$(this).children(':visible').has('td').filter(function(index){
				//return (index % 4) < 2;
			//}).addClass('alt');
			$(this).children(':visible').has('td')
				.filter(':group(3)').addClass('alt');
		});	
	}
	stripe();
	$('#topics a').on('click',function(event){
		event.preventDefault();//��������Ĭ�ϲ���
		var topic = $(this).text();//��ȡ��ǰ����������ı��ڵ㣬����topic

		$('#topics a.selected').removeClass('selected');//��a��ǩ�е�selected��ʽȥ��
		$(this).addClass('selected');//����ǰ�����������selected��ʽ

		$('#news').find('tr').show();//��ʾ���������
		if(topic != 'All'){//�ж�topic����All����ִ���������
			//��tr�е�td���������������������ǰ������ı��ڵ���ͬ����
			//$('#news tr:has(td):not(:contains("'+ topic +'"))').hide();
			$('#news').find('tr:has(td)').not(function(){
				// ���ﵱǰ����ͱ����tr���td��
				//���������children����id��ѡ��ľ��ǵ��ĸ���Ԫ���е��ı�
				return $(this).children(':nth-child(4)').text() == topic;
			}).hide();
		}
	stripe();
	});
});

//�ı�����Ч��
(function($){
	$.extend($.expr[':'], {
		group: function(element, index, matches, set){
			//matches[3] �����������Ψһ���õ�ֵ��
			//������һ��ѡ�������ʽΪ :group(b) ����
			//matches[3] �а�����ֵ���� b ��Ҳ���������е��ı�
			//������������У�ֻ��Ҫ index �� matches ����������
			var num = parseInt(matches[3], 10);
			if(isNaN(num)){
				return false;
			}
			return index % (num * 2) < num;
		}
	});
})(jQuery);