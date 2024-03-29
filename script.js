window.onload = (event) => {
    var rellax = new Rellax('.rellax');
}

function amountscrolled(){
    var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    var docheight = getDocHeight()
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    console.log(pctScrolled + '% scrolled')
}
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}

addEventListener('scroll', (event) => {
    amountscrolled()
});

var infoStatements = [
    "We're the strategy department of team 3128. Starting in 2020, we've developed a series of applications to digitize our scouting process.",
    "Scouting is basically glorified stalking. We take notes of what other robots can do on the field, and we try to strategize with and against them.",
    "Ugh so many questions. Keep on scrolling to see our documentation, methodology, and github. Jokes aside, thanks for visiting :)"    
]

let prevState = 0;
let currState = 0;
window.addEventListener('scroll', function() {
	var ele1 = document.querySelector('#info-head');
    var ele2 = document.querySelector('#scout-head');
    var ele3 = document.querySelector('#next-head');
	var position = [ele1.getBoundingClientRect(), ele2.getBoundingClientRect(), ele3.getBoundingClientRect()]
    var para = document.getElementById("info-para")

    for(let i=0; i<3; i++){
        
        if(((position[i].top/window.innerHeight)<40) && ((position[i].top/window.innerHeight)>0)){

            if(i==0){

                setTimeout(() => {
                    para.innerHTML = infoStatements[i]
                }, 200);
                
                currState = i
                
            }
            else if((position[i-1].top/window.innerHeight)<0){

                setTimeout(() => {
                    para.innerHTML = infoStatements[i]
                }, 200);
                currState = i
                
            }
        }

    }
    console.log(position[0].top/window.innerHeight);
    if(!(prevState == currState)){
        prevState = currState;
        
            para.classList.add("paraAnim");
        setTimeout(() => {
            para.classList.remove("paraAnim");
        }, 200);
    }
});

function init(){
	new SmoothScroll(document,120,30)
}

function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
      
	var moving = false
	var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e)

		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}

	function update() {
		moving = true
    
		var delta = (pos - target.scrollTop) / smooth
    
		target.scrollTop += delta
    
		if (Math.abs(delta) > 0.5)
			requestFrame(update)
		else
			moving = false
	}

	var requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}
init()