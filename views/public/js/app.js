document.addEventListener('DOMContentLoaded', function() {
   
	console.log("Load")
	var drag = document.getElementsByClassName("draggable")
	var style = document.getElementsByClassName("slick-track")
	var tab_img = document.querySelectorAll(".slide_pround img")
	var control_bottom = document.querySelectorAll(".slick-dots li")
	
	if(drag.length>0 && style.length>0 && tab_img.length >0 && control_bottom.length > 0){
	//config
	var totalPage = 2,tabindex= Number(style[0].getAttribute("tabindex")), next = 0;
	var isPress = false,posPress = 0,posCurrent = 0,posTranslate = 0, screen_width = screen.width
	
	control_bottom[tabindex-1].classList.add("slick-active")
	for(let i = 0 ; i< drag.length;i++){
	   drag[i].addEventListener("mousedown", 	onMousedown);
	   drag[i].addEventListener("mouseup", 		onMouseup);
	   drag[i].addEventListener("mousemove", 	onMousemove);
	   drag[i].addEventListener("mouseleave", 	onMouseleave);
	}
	//init
	for(let i = 0 ; i< tab_img.length;i++){
	   tab_img[i].setAttribute("draggable", false);
	}
	function posTabindex(page){
		return (page-1)*screen.width
	}
	function onTabindex(posCurrent){
		let scr_width = screen.width;
		let wrap = totalPage*screen.width;
		let page = -1;
		for(let i= 1; i <=totalPage;i++){
			if(posCurrent < i*screen.width){
				page = i;
				break;
			}
		}
		return page;
	}
	
	function addStyle(value){
		for(let i = 0 ; i< style.length;i++){
		   style[i].setAttribute("style", value);
		}
	}
	function update(){
		let pos = -posTabindex(tabindex)
		
		if(next == 0){
			posTranslate = pos;
		}else if(next == 1){
			posTranslate = pos-posCurrent;
		}else{
			posTranslate = pos+posCurrent;
		}
		
		addStyle("opacity: 1; width: "+screen.width*totalPage+"px; transform: translate3d("+(posTranslate)+"px , 0px, 0px);")
	}

	function onMousedown(e) {
		console.log("mousedown")
		isPress = true
		posPress = e.screenX;
		tabindex = Number(style[0].getAttribute("tabindex"));
	}
	
	function onMouseup(){
		console.log("mouseup")
		isPress = false
		
		//prev
		if(next == -1){
			if(tabindex <= 1){
				tabindex = 1
			}else{
				--tabindex;
			}
		}
		//next
		if(next == 1){
			if(tabindex >= totalPage){
				tabindex = totalPage
			}else{
				++tabindex;
			}
		}
		style[0].setAttribute("tabindex",tabindex)
		addStyle("opacity: 1; width: "+screen.width*totalPage+"px; transform: translate3d("+(-posTabindex(tabindex))+"px , 0px, 0px);")		
		for(let i=0;i<control_bottom.length;i++){
			control_bottom[i].classList.remove("slick-active");
		}
		control_bottom[tabindex-1].classList.add("slick-active")
		
	}
	
	function onMousemove(e){
		if(isPress){
			console.log("onMousemove")
			console.log(e.screenX)
			if(posPress == e.screenX){
				posCurrent = e.screenX;
				next = 0;
			}else if(posPress > e.screenX){
				posCurrent = posPress - e.screenX;
				next = 1;
			}else{
				posCurrent = e.screenX - posPress
				next = -1;
			}
			update(e.screenX);
		}
	}
	
	function onMouseleave(){
		console.log("onMouseout")
		isPress = false
		onMouseup()
	}
   
   
}
   
}, false);