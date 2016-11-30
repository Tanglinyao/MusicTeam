//���غ���
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

//���ǩ��������ǩ(�±�ǩ,Ŀ���ǩ)
function insertAfter(newElement,targetElement){
	//ȡ��Ŀ���ǩ�ĸ�Ԫ�ؽڵ�
	var parent = targetElement.parentNode;
	//�жϸø�Ԫ�ؽڵ�����һ����Ԫ�ؽڵ��Ƿ����Ŀ���ǩ,�Ǿ�ֱ��׷���±�ǩ
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{//�������,����Ŀ���ǩ����һ����ǩǰ�����һ����ǩ
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//addClass()����,����ʽ
function addClass(element,value){
	//�жϸñ�ǩclass�����Ƿ���ֵ,���û��,��ֱ�Ӹ�ֵ
	if(!element.className){
		element.className = value;
	}else{//����Ѿ�����,��׷��һ��ֵ,����ʽ
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

//��������Ǻ���
function highlightPage(){
	//�ж��Ƿ����ʹ�ýű������
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	//ȡ��headerԪ�ؽڵ�,����һ������
	var headers = document.getElementsByTagName("header");
	if(headers.length == 0 ) return false;
	//��ȡ��nav��Ԫ�ؽڵ�
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	//��ȡ��nav�µ�aԪ�ؽڵ�
	var links = navs[0].getElementsByTagName("a");
	if(links.length == 0) return false;
	for(var i = 0 ; i < links.length; i++){
		var linkurl;//����һ������,���Աȵ�ǰ��url�Ƿ����
		for(var j = 0 ; j < links.length; j++){
			linkurl = links[j].getAttribute("href");

			//ȡ�õ�ǰҳ��url:window.location.href
			//string.indexOf()�����ַ�����һ�γ��ֵ�λ��,�������-1,���ʾû��ƥ�䵽
			if(window.location.href.indexOf(linkurl) != -1){
				links[j].className = "here";
				//��ÿ��ҳ���body������ͬ����ʽ
				//�õ���toLowerCase()����,����д��ĸ�ĳ�Сд��ĸ
				//��a��ǩ���ı��ڵ��еĴ�д����Сд
				var linktext = links[j].lastChild.nodeValue.toLowerCase();
				//��body������ʽ����id,��id="home",����ҳ��Ҳ��Ӧ��һ�������Լ���
				document.body.setAttribute("id",linktext);
			}
		}
	}
}

//ʵ�ֻõ�Ƭ����,�õ�ͼƬ�ƶ�
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement){//ÿ�ζ���ֻ֤��һ�����ƶ�
		clearTimeout(elem.movement);
	}
	//�ж���ʼλ��
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

//�ѻõ�Ƭֱ�ӷ����ĵ��е�"intro"�������
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
	//Ϊ�õ�Ƭ����һ��С����
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(preview);
	slideshow.appendChild(frame);
	insertAfter(slideshow,intro);
	//���ű���intro�����е���������
	//���õ�����Ҳ����,��intro��Ϊdocument
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

//����aboutҳ��Ľű�,ֻ��ʾ���������
function showSection(id){
	//��� section��ǩ�ļ���
	var sections = document.getElementsByTagName("section");
	for(var i = 0; i < sections.length; i++){
		//����������id�Ƿ���ڴ�id,���Ǿ�����
		if(sections[i].getAttribute("id") != id){
			sections[i].style.display = "none";
		}else{
			//��,����ʾ����
			sections[i].style.display = "block";
		}
	}
}

//���ӵ���ʱ���ú���showSection(id)
function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0 ) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	//ѭ������
	for(var i = 0; i < links.length; i++){
		//ȡ��#�����id
		var sectionId = links[i].getAttribute("href").split("#")[1];
		//�����id������,�������ô�ѭ��
		if(!document.getElementById(sectionId)) continue;
		//id����,����������
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		//�����������,�����showSection()����
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}
}

//����photosҳ��
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

//����ռλ��
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

//����showPic����
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

//�����ʽ����
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
//�����ʽ�����Ӧ�¼�
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i = 0 ; i < rows.length; i++){
		rows[i].oldClassName = rows[i].className;//����ԭ������ʽ
		rows[i].onmouseover = function(){
			//�������ʽ
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function(){
			//����뿪,����ԭ������ʽ
			this.className = this.oldClassName;
		}
	}
}

//������Դ�
function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	//��ȡabbr��ǩ
	var abbrs = document.getElementsByTagName("abbr");
	if( abbrs.length < 1 ) return false;
	//��������
	var defs = new Array();
	for(var i = 0; i < abbrs.length; i++){
		//���浱ǰ�����Դ�abbr
		var current_abbr = abbrs[i];
		if(current_abbr.childNodes.length < 1) continue;
		//ȡ��abbr��title���ֵ,����definition��
		var definition = current_abbr.getAttribute("title");
		//ȡ��abbr��ǩ������ֽڵ�
		var key = current_abbr.lastChild.nodeValue;
		//ÿ�����ֶ�Ӧһ��title,����ά����,defs[key][definition]
		defs[key] = definition;
	}
	//������ʾ��ǩ
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

//����label��for������,contactҳ��
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

//����form
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

//����form
/*function prepareForms(){
	for(var i = 0; i < document.forms.length; i++){
		var thisform = document.forms[i];
		resetFields(thisform);
	}
}*/

//����û��Ƿ�����������
function isFilled(field){
	if(field.value.replace(" ","").length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != placeholder);
}

//���email
function isEmail(field){
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1)
}

//����֤
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

//���ñ���֤����
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

//�ύ��,��Ajax�����ύ����
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

//����Ajax������loadingͼƬ
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		//ɾ��������Ԫ��
		element.removeChild(element.lastChild);
	}
	//��ͼ����ӵ���Ԫ��
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

//����Ajax������
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
