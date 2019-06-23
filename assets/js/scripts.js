/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2019. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    function initMap() {

        var location = new google.maps.LatLng(50.0875726, 14.4189987);

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 16,
            panControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

    }

    google.maps.event.addDomListener(window, 'load', initMap);
});

  $(function () {
    // le texte qui défile
    $('.typist')
      .typist({
        text: 'Creative Designer',
        speed: 12,
        cursor: false
      })
      .typistPause(2000) // 2 sec
      .typistRemove(23)
      .typistAdd('Tech addict')
      .typistPause(2000) // 2 sec
      .typistRemove(23)
      .typistAdd('Dreamer')
      .typistPause(2000) // 2 sec
      .typistRemove(23)
      .typistAdd('Gamer')
      .typistPause(2000) // 2 sec
      .typistRemove(23)
      .typistAdd('Business Analyst');

  });
})(jQuery, window, document);

var trigger = [
	["hi","hey","hello"], 
	["how are you", "how is life", "how are things", "how you doin"],
	["what are you doing", "what is going on"],
	["how old are you"],
	["who are you", "are you human", "are you bot", "are you human or bot"],
	["who created you", "who made you","who created you?", "who made you?"],
	["your name please",  "your name", "may i know your name", "what is your name"],
	["i love you"],
	["joke"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["tell me more about you","what do you do ?","what do you do"],
  ["do you look for a job","are you open to opportunities"],
  ["what skills do you have","what are your skills"],
  ["are you graduated"],
  ["do you know agile methods"],
  ["where do you live"],
  ["where do you work"],
  ["can i get your resume","can i get your cv"],
  ["what is your email adress"]
];

var reply = [
	["Hi","Hey","Hello","😉"], 
	["Fine", "Pretty well", "Fantastic","😀","😎🤑"],
	["Nothing much","Just answering you","Can you guess?","I don't know actually"],
	["I am 28 day old"],
	["I am just a bot", "I am a bot"],
	["My creator is Romain BOSSELET", "God"],
	["A man has no name","Romain BOSSELET"],
	["I love you too", "I also love me"],
	["I dreamed I was forced to eat a giant marshmallow. When I woke up, my pillow was gone"],
  ["Bye", "Goodbye", "See you later"],
  ["Currently, I work as a business analyst but my mind is still at coding","I am a web developer/business analyst"],
  ["I am open to the market, just get in touch"],
  ["I can do PHP, Java, Javascript, HTML, CSS, Liferay"],
  ["I am a software engineer graduated from Institut Supérieur de l'Electronique et du Numérique"],
  ["The scrum guide is my bedside book","I occupied the post of scrum master"],
  ["I live in Nice"],
  ["I work in Sopra Steria, Nice Sophia Antipolis. I am a web developer/business analyst"],
  ["Available at the end of this website"],
  ["rbosselet@gmail.com"]
];

var alternative = ["Sorry, I don't understand", "404 : answer not found"];

document.querySelector("#input-chat").addEventListener("keypress", function(e){
	var key = e.which || e.keyCode;
  if(key === 13){
    var input = document.getElementById("input-chat").value;
    if(input){
      $('<div class="yours messages"><div class="message"><p></p>'+input+'</div></div>').prependTo('.messages-chat');
      document.getElementById("input-chat").value=""; //clear input value
      var text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, "").replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, ""); 
      if(compare(trigger, reply, text)){
        var answer = compare(trigger, reply, text);
      } else {
        var answer = alternative[Math.floor(Math.random()*alternative.length)];
      }
      $('<div class="mine messages"><div class="message"><p></p>'+answer+'</div></div>').prependTo('.messages-chat');
      if ($('.apple-switch').is(':checked')){
        speak(answer);
      }
    }
	}
});

function compare(arr, array, string){
	var item;
	for(var x=0; x<arr.length; x++){
		for(var y=0; y<array.length; y++){
			if(arr[x][y] == string){
				items = array[x];
				item =  items[Math.floor(Math.random()*items.length)];
			}
		}
	}
	return item;
}

function speak(string){
	var utterance = new SpeechSynthesisUtterance();
	utterance.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == "Agnes";})[5];
	utterance.text = string;
	utterance.lang = "en-US";
	utterance.volume = 1; //0-1 interval
	utterance.rate = 1;
	utterance.pitch = 2; //0-2 interval
	speechSynthesis.speak(utterance);
}
