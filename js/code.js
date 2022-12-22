// New window: show and bring to top
function newWindow(element) {
    jQuery(element).show();
    jQuery(element).selectWindow();

    if (element == '#doom') {
    	loadDoom();
    }

}




jQuery( function() {
    // Window drag
    jQuery( ".window" ).draggable({ handle: "div.windowtitle",distance:5,scroll: false,containment:"parent" });

    // Window resize
    jQuery( ".window" ).resizable({ handles: "all", alsoresize: ".windowinner",minWidth: 200,minHeight: 23 });

    // Window close
    jQuery('.windowclose').on("click", function () { jQuery(this).parents('div.window').hide(); });

	jQuery('.introclose').on("click", function () { jQuery(this).parents('div.window').hide(); jQuery('#intro_back').hide(); });



    // Window click-to-bring-to-top
    (function() {
        var highest = 100;

        jQuery.fn.selectWindow = function() {
            // Make top


			if(this.attr("id") == "baseWindow"){
				//nowCss = this.css('z-index');

				//jQuery("#win_TimeTable").css("z-index",parseInt(nowCss)+1);
				//jQuery("#win_About").css("z-index",parseInt(nowCss)+2);

				//highest = parseInt(nowCss)+2;

			}else{
		            this.css('z-index', ++highest);
			}
            // Make this window selected and others not
            this.addClass('selectedwindow');
            jQuery('.window').not(this).each(function(){
                jQuery(this).removeClass('selectedwindow');
             });
        };
    })();
    
	jQuery('.window').mousedown(function() {
        jQuery(this).selectWindow();
    });

    // Icon single click
    jQuery('.icon').click(function() {
		if(jQuery(this).find('p').attr("class") != "highlight"){		  
			jQuery('p').removeClass('highlight');
			}
			jQuery(this).find('p').toggleClass('highlight');
    	});

	jQuery('.max').click(function(){
		goMax(this);
	});

	jQuery('.min').click(function(){
		goMin(this,jQuery(this).attr('oriW'),jQuery(this).attr('oriH'));
	});
});


/* rooted */

jQuery( function() {
	//draggable() 함수 	jquery-ul.js 스크립트 파일 안에 선언된 함수
	jQuery( ".icon" ).draggable({ distance:10 });
	} );


function goMax(obj){
	jQuery(".selectedwindow").removeClass("minimize");
	jQuery(".selectedwindow").toggleClass("maximize");

	if(jQuery(".selectedwindow").hasClass("maximize") === true){
		jQuery('.max').html("&#11123;");
	}else{
		jQuery('.max').html("&#11109;");
	}
}

function goMin(obj,w,h){
	jQuery(".selectedwindow").removeClass("maximize");
	//jQuery(".selectedwindow").toggleClass("minimize");
	jQuery(".selectedwindow").css({width:w,height:h});
	if(jQuery(".selectedwindow").hasClass("maximize") === true){
		jQuery('.max').html("&#11109;");
	}else{
		jQuery('.max').html("▼");
	}
}


////////////////////////////////////////////////////


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var ssCount =0;
var screenSaverInterval;

function screenSaver(){
	screenSaverInterval = setInterval(function(){
		jQuery(".iconImg").each(function (index,item){
			//console.log('ss go'+index+"/"+jQuery(document).height()+"/"+jQuery(document).width());
			jQuery(document).height();
			jQuery(document).width();
			randTop = randomInt(1,jQuery(document).height());
			randLeft = randomInt(1,jQuery(document).width());
			jQuery(item).clone().appendTo('body').attr("class","iconImgClone").css({top: randTop,left:randLeft, position:"fixed",zIndex:99999});
			});						

		ssCount++;
		//console.log("ss = "+ssCount);

		if(ssCount > 50){
			clearInterval(screenSaverInterval);
		}

	},5000);	
}

function screenSaverExit(){
	clearInterval(screenSaverInterval);
	ssCount =0;
	jQuery(".iconImgClone").remove();
}


function sortTable() {
	let table = document.getElementById("timeTable");
	let rowsCollection = table.querySelectorAll("tbody");
	let rows = Array.from(rowsCollection);
	shuffleArray(rows);
	for (const row of rows) {
		table.appendChild(row);
	}
}


function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}


////////////////////////////////////////////////////


function getTime() {
	var date = new Date();
	var today = new Intl.DateTimeFormat('kr',{dateStyle : "short", timeStyle : "medium"}).format(date);
	document.getElementById('today').textContent = today;
	window.setTimeout(getTime, 1000);
}

function getCount() {
	var start = new Date(Date.UTC(2019, 9, 3, 12, 0, 0));
	var end = new Date();
	var count = new Intl.RelativeTimeFormat('kr',{numeric: "always", style: "short"}).format(end-start, 'seconds');
	var countdown = new Intl.DateTimeFormat('kr',{dateStyle : "short", timeStyle : "medium"}).format(end-start);
	var term = end - start;
	var diffHour = Math.floor(term % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
	var diffMinute = Math.floor(term % (1000 * 60 * 60) / (1000 * 60));
	var diffSecond = Math.floor(term % (1000 * 60) / (1000));
	var diffDay = parseInt(term / (1000 * 60 * 60 * 24));
	document.getElementById('countdown').textContent = diffDay+":"+diffHour+":"+diffMinute+":"+diffSecond;
	window.setTimeout(getCount, 1000);
}

function getYear() {
	var tdate = new Date();
	var tyear = tdate.getUTCFullYear();
	document.getElementById('tyear001').textContent = tyear;
	document.getElementById('tyear002').textContent = tyear;
	window.setTimeout(getYear, 1000);
}


function DdayCountdown() {
	const countDownTimer = function (id, date) {
		var _vDate = new Date(date); // 전달 받은 일자
		var _second = 1000;
		var _minute = _second * 60;
		var _hour = _minute * 60;
		var _day = _hour * 24;
		var timer;

		function showRemaining() {
			var now = new Date();
			var distDt = _vDate - now;

			if (distDt < 0) {
				clearInterval(timer);
				document.getElementById(id).textContent = '어플이 출시 되었습니다!';
				return;
			}

			var days = Math.floor(distDt / _day);
			var hours = Math.floor((distDt % _day) / _hour);
			var minutes = Math.floor((distDt % _hour) / _minute);
			var seconds = Math.floor((distDt % _minute) / _second);

			//document.getElementById(id).textContent = date.toLocaleString() + "까지 : ";
			document.getElementById(id).textContent = days + '일 ';
			document.getElementById(id).textContent += hours + '시간 ';
			document.getElementById(id).textContent += minutes + '분 ';
			document.getElementById(id).textContent += seconds + '초';
		}

		timer = setInterval(showRemaining, 1000);
	}

	var dateObj = new Date();
	dateObj.setDate(dateObj.getDate() + 1);

	//countDownTimer('Dday01', dateObj); // 내일까지
	countDownTimer('Dday01', '01/31/2023 23:59'); // 2022년 11월 30일까지, 시간을 표시하려면 01:00 AM과 같은 형식을 사용한다. 
	countDownTimer('Dday02', '02/28/2023 23:59'); // 2023년 01월 31일까지, 시간을 표시하려면 01:00 AM과 같은 형식을 사용한다.
	//countDownTimer('Dday03', '04/01/2024'); // 2024년 4월 1일까지
	//countDownTimer('Dday04', '04/01/2019'); // 2024년 4월 1일까지
}

function getAge(){
	const today = new Date();
	const birthDate = new Date(1989, 9, 19); // 생일 // 0 -> 1월, 1 -> 2월 ...

	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	document.getElementById('getAge').textContent = age;
	window.setTimeout(getAge, 1000);

}


////////////////////////////////////////////////////


function ScreenSaver() {
	jQuery(document).ready(function(){
		var timeout;
		jQuery(document).on("mousemove keydown click", function() {
			clearTimeout(timeout);
			screenSaverExit();
			
			timeout = setTimeout(function() {
					screenSaver();
			}, 1 * 15 * 1000);

			//2 * 60 * 1000
		}).click();
	});
}
