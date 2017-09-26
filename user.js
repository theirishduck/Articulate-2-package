var emailObject = document.createElement("a"),
	subtitlesObject = document.createElement("a"),
	slideNumber = document.createElement("p"),
	progressBarObject = document.createElement("div"),
	controlNode = document.getElementById("control-progress"),
	nextButtonNode = document.getElementById("control-next"),
	refreshButtonNode = document.getElementsByClassName("icon restart"),
	playButtonNode = document.getElementsByClassName("icon play"),
	pauseButtonNode = document.getElementsByClassName("pausebtn progress-bar-button"),
	player = GetPlayer(),
	blinkInterval,
	enterFrame,
	slideNumberNode,
	nextBlinking = false,
	toggle = false,
	isOnPause = false,
	prevSlide = 0,
	completePercentage = 0,
	j = 0,
	k = 0,
	totalTime = 10,
	subTitleNode,
	emailsubject = 'Add%What%20you%20need',
	emailbody = 'What%20was%20the%20slide%20number%20of%20the%20issue?%0D%0AWhat%20was%20the%20issue?';

//intialize function
function init(){
  //appends all elements to the control element
	controlNode.appendChild(progressBarObject);
	controlNode.appendChild(emailObject);
	controlNode.appendChild(subtitlesObject);
	controlNode.children[3].parentNode.insertBefore(controlNode.children[3], controlNode.children[0]);
  // assigns IDs to newly created elements
	subtitlesObject.id = 'subtitlesIcon';
	subtitlesObject.title = 'Subtiles';
	emailObject.id = 'emailIcon';
	emailObject.title = 'Send email';
	progressBarObject.id = 'courseProgressBar';
	refreshButtonNode[0].title = 'Restart';
	playButtonNode[0].title = 'Play';
	pauseButtonNode[0].title = 'Pause';
	emailObject.href = 'mailto:'+'your@site'+'?subject='+emailsubject+'&body='+emailbody;
	slideNumberNode = document.getElementById('slideParagraph');
	progressObject = document.getElementById('courseProgressBar');
	subtitlesButtonNode = document.getElementById("subtitlesIcon");
  // creates a toggle
	subtitlesButtonNode.onclick = function(e){
		toggle = !toggle
	}
	// checks for toggle every thenth of a second
	enterFrame  = setInterval(checkForSlide,10);
}
// selects the subtitle box inside the player
function retrieveSubtitles(collection){
	for(var elem in collection){
		if(collection[elem].style.height === '74'+'px' || collection[elem].style.height === '75'+'px'){
			return collection[elem];
		}
	}	
};

function checkForSlide(){
	var slideText;
	var arrFromList;
	var bolt = false;
	var subtitle1;
	progressBarObject.title = 'Course time left: ' + Math.floor(totalTime - totalTime * completePercentage)+'m : '+( ((totalTime - totalTime * completePercentage) * 60) % 60) + 's';
  // checks for a slide chage
	if(slideText !== prevSlide){
    // selects the slide number
		slideText = Number(player['slideIndex'] - 4);
    // based on the slide number return the course progress by dividing the current slide number the total of slides  
		completePercentage = Number( Number(player.currentSlidesViewed) / Number(player.totalViewSlides) ).toFixed(2);
		// move the progress bar image according to the progress
		if(completePercentage < 0.2){
			progressBarObject.style.backgroundPosition = "0px 0px";
		}else if(completePercentage < 0.4){
			progressBarObject.style.backgroundPosition = "-45px 0px";
		}
		else if(completePercentage < 0.6){
			progressBarObject.style.backgroundPosition = "-90px 0px";
		}
		else if(completePercentage < 0.8){
			progressBarObject.style.backgroundPosition = "-135px 0px";
			
		}else if(completePercentage < 1){
			progressBarObject.style.backgroundPosition = "-180px 0px";
		}
		else{
			progressBarObject.style.backgroundPosition = "-225px 0px";
		}		

		arrFromList = Array.prototype.slice.call(document.getElementsByClassName("itemgroup"));
		if (arrFromList.length > 0){
			if(retrieveSubtitles(arrFromList) !== undefined){
				subTitleNode = retrieveSubtitles(arrFromList);
				toggle ? subTitleNode.style.display = 'block' : subTitleNode.style.display = 'none';
			}
		}
		prevSlide = slideText;
	}
	if(player.progressBar.lastProgressPercent === 1){
		if(j > 50){
			if (player.currentSlide().title !== 'Quiz 1'){
				fadeInOut(nextButtonNode);
			} 
			j = 0;
		}
		j++;
	}

	if(player.lastPaused && player.progressBar.lastProgressPercent !== 1){
		if(k > 50){
			if(playButtonNode[0] !== null){
				fadeInOut(playButtonNode[0]);
			} 
			k = 0;
		}
		k++;
	}
}
// makes button blinks if slide has been viewed
function fadeInOut(element){
	if(element !== null){
		if(element.classList.contains("animationFadeOut")){
			element.classList.remove("animationFadeOut");
			element.classList.add("animationFadeIn");
		}else{
			element.classList.remove("animationFadeIn");
			element.classList.add("animationFadeOut");
		}
	}
}

init();
