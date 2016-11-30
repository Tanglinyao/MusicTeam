//加载函数
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}	
	}
}

//向标签后面插入标签(新标签,目标标签)
function insertAfter(newElement,targetElement){
	//取得目标标签的父元素节点
	var parent = targetElement.parentNode;
	//判断该父元素节点的最后一个子元素节点是否等于目标标签,是就直接追加新标签
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{//如果不是,就在目标标签的下一个标签前面插入一个标签
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//addClass()函数,加样式
function addClass(element,value){
	//判断该标签class属性是否有值,如果没有,则直接赋值
	if(!element.className){
		element.className = value;
	}else{//如果已经有了,则追加一个值,即样式
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

//导行栏标记函数
function highlightPage(){
	//判断是否可以使用脚本的语句
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	//取得header元素节点,返回一个集合
	var headers = document.getElementsByTagName("header");
	if(headers.length == 0 ) return false;
	//再取得nav的元素节点
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	//再取得nav下的a元素节点
	var links = navs[0].getElementsByTagName("a");
	if(links.length == 0) return false;
	for(var i = 0 ; i < links.length; i++){
		var linkurl;//定义一个变量,来对比当前的url是否相等
		for(var j = 0 ; j < links.length; j++){
			linkurl = links[j].getAttribute("href");

			//取得当前页面url:window.location.href
			//string.indexOf()返回字符串第一次出现的位置,如果返回-1,则表示没有匹配到
			if(window.location.href.indexOf(linkurl) != -1){
				links[j].className = "here";
				//给每个页面的body创建不同的样式
				//用到了toLowerCase()函数,将大写字母改成小写字母
				//把a标签的文本节点中的大写换成小写
				var linktext = links[j].lastChild.nodeValue.toLowerCase();
				//给body加上样式属性id,即id="home",其他页面也对应有一个他们自己的
				document.body.setAttribute("id",linktext);
			}
		}
	}
}

//实现幻灯片功能,用到图片移动
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement){//每次都保证只有一次在移动
		clearTimeout(elem.movement);
	}
	//判断起始位置
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && ypos == final_y){
		return true;
	}
	if(xpos < final_x){
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos > final_x){
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos < final_y){
		var dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos > final_y){
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

//把幻灯片直接放在文档中的"intro"段落后面
function prepareSlideshow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	//为幻灯片创建一个小窗口
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(preview);
	slideshow.appendChild(frame);
	insertAfter(slideshow,intro);
	//接着遍历intro段落中的所有链接
	//若让导行栏也触发,把intro改为document
	//var links = intro.getElementsByTagName("a");
	var links = document.getElementsByTagName("a");
	var destination;
	for(var i = 0; i < links.length; i++){
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html") != -1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html") != -1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html") != -1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html") != -1){
				moveElement("preview",-600,0,5);
			}
		}
	}
}

//处理about页面的脚本,只显示点击的内容
function showSection(id){
	//获得 section标签的集合
	var sections = document.getElementsByTagName("section");
	for(var i = 0; i < sections.length; i++){
		//看传进来的id是否等于此id,不是就隐藏
		if(sections[i].getAttribute("id") != id){
			sections[i].style.display = "none";
		}else{
			//是,就显示出来
			sections[i].style.display = "block";
		}
	}
}

//链接单击时调用函数showSection(id)
function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0 ) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	//循环遍历
	for(var i = 0; i < links.length; i++){
		//取得#后面的id
		var sectionId = links[i].getAttribute("href").split("#")[1];
		//如果该id不存在,则跳出该次循环
		if(!document.getElementById(sectionId)) continue;
		//id存在,就隐藏起来
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		//当点击该链接,则调用showSection()方法
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}
}

//处理photos页面
function showPic(whichpic){
	if(!document.getElementById("picture")) return true;
	var source = whichpic.getAttribute("href");
	var picture = document.getElementById("picture");
	picture.setAttribute("src",source);
	if(!document.getElementById("des")) return false;
	if(whichpic.getAttribute("title")){
		var text = whichpic.getAttribute("title");
	}else{
		var text = "";
	}
	var des = document.getElementById("des");
	if(des.firstChild.nodeType == 3){
		des.firstChild.nodeValue = text;
	}
	return false;
}

//创建占位符
function prePicture(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var picture = document.createElement("img");
	picture.setAttribute("id","picture");
	picture.setAttribute("src","images/placeholder.gif");
	picture.setAttribute("alt","my image gallery");
	var des = document.createElement("p");
	des.setAttribute("id","des");
	var text = document.createTextNode("Choose an image");
	des.appendChild(text);
	//<ul id="imagegallery">
	var gallery = document.getElementById("imagegallery");
	insertAfter(des,gallery);
	insertAfter(picture,des);
}

//调用showPic函数
function prePic(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i =0 ; i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this);
		}
	}
}

//表格样式操作
function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for(var i = 0; i < tables.length; i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var j = 0 ; j < rows.length; j++){
			if(odd == true){
				addClass(rows[j],"odd");
				odd = false;
			}else{
				odd = true;
			}
		}
	}
}
//表格样式鼠标响应事件
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i = 0 ; i < rows.length; i++){
		rows[i].oldClassName = rows[i].className;//储存原来的样式
		rows[i].onmouseover = function(){
			//添加新样式
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function(){
			//鼠标离开,返回原来的样式
			this.className = this.oldClassName;
		}
	}
}

//获得缩略词
function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	//获取abbr标签
	var abbrs = document.getElementsByTagName("abbr");
	if( abbrs.length < 1 ) return false;
	//创建数组
	var defs = new Array();
	for(var i = 0; i < abbrs.length; i++){
		//保存当前的缩略词abbr
		var current_abbr = abbrs[i];
		if(current_abbr.childNodes.length < 1) continue;
		//取得abbr中title里的值,放在definition里
		var definition = current_abbr.getAttribute("title");
		//取得abbr标签里的文字节点
		var key = current_abbr.lastChild.nodeValue;
		//每个文字对应一个title,即二维数组,defs[key][definition]
		defs[key] = definition;
	}
	//创建显示标签
	var dlist = document.createElement("dl");
	for(key in defs){
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length < 1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0 ) return false;
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}

//处理label中for的属性,contact页面
function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i = 0; i < labels.length; i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function(){
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}

//处理form
function resetFields(whichform){
	if(Modernizr.input.placeholder) return;
	for(var i = 0; i < whichform.elements.length; i++){
		var element = whichform.elements[i];
		if(element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function(){
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value == text){
				this.className = "";
				this.value = "";
			}
		}
		element.onblur = function(){
			if(this.value == ""){
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}

//传入form
/*function prepareForms(){
	for(var i = 0; i < document.forms.length; i++){
		var thisform = document.forms[i];
		resetFields(thisform);
	}
}*/

//检查用户是否输入了内容
function isFilled(field){
	if(field.value.replace(" ","").length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != placeholder);
}

//检查email
function isEmail(field){
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1)
}

//表单验证
function validateForm(whichform){
	for(var i = 0; i < whichform.elements.length; i++){
		var element = whichform.elements[i];
		if(element.required == "required"){
			if(!isFilled(element)){
				alert("Please fill in the " + element.name + " field.");
				return false;
			}
		}
		if(element.type == "email"){
			if(!isEmail(element)){
				alert("The " + element.name + " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

//调用表单验证函数
function prepareForms(){
	for(var i = 0; i < document.forms.length; i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function(){
			if(!validateForm(this)) return false;
			var article = document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}

//提交表单,用Ajax拦截提交请求
function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined"){
		XMLHttpRequest = function(){
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){}
			return false;
		}
		return new XMLHttpRequest();
	}
}

//加载Ajax函数的loading图片
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		//删除所有子元素
		element.removeChild(element.lastChild);
	}
	//把图像添加到该元素
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

//发送Ajax请求函数
function submitFormWithAjax( whichform, thetarget ) {
  
	var request = getHTTPObject();
	if (!request) { return false; }

	 // Display a loading message.
	 displayAjaxLoading(thetarget);

	 // Collect the data.
	 var dataParts = [];
	 var element;
	 for (var i=0; i<whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	 }
	 var data = dataParts.join('&');

	 request.open('POST', whichform.getAttribute("action"), true);
	 request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	 request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
			  var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
			  if (matches.length > 0) {
				thetarget.innerHTML = matches[1];
			  } else {
				thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
			  }
			} else {
			  thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	 };

	 request.send(data);
	   
	 return true;
};


addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(prePicture);
addLoadEvent(prePic);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
