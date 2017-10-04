
function Sounds() {
	this.fart_objs;
	this.swallow_objs;
	this.burp_objs;
	this.victory;
	this.level_done;
	this.game_over;
	
	this.init = function(){
		// farts:
		var arr = [];
		$("#audios").children("audio").each( function(i,it){
			if( $(it).attr("id").match("fart") ){
				arr.push( document.getElementById( $(it).attr("id") ) );
			}
		});
		this.fart_objs = arr;
		
		// swallows:
		arr = [];
		$("#audios").children("audio").each( function(i,it){
			if( $(it).attr("id").match("Swallow") ){
				arr.push( document.getElementById( $(it).attr("id") ) );
			}
		});
		this.swallow_objs = arr;
		
		// burps:
		arr = [];
		$("#audios").children("audio").each( function(i,it){
			if( $(it).attr("id").match("Burp") ){
				arr.push( document.getElementById( $(it).attr("id") ) );
			}
		});
		this.burp_objs = arr;
		
		// victory, levelDone, gameOver
		this.victory = document.getElementById("Victory");
		this.level_done = document.getElementById("LevelDone");
		this.game_over = document.getElementById("GameOver");
	};
	
	this.eat = function(){
		if (!sounds_on) return;
		
		var s = getRandomInt( 0, this.swallow_objs.length-1 );
		var b = getRandomInt( 0, this.burp_objs.length+1 );
		
		this.swallow_objs [s] .play();
		if (b < this.burp_objs.length)
			this.burp_objs [b] .play();
	};
	
	this.shit = function(){
		if (!sounds_on) return;
		
		var i = getRandomInt( 0, this.fart_objs.length-1 );
		this.fart_objs [i] .play();
	};
	
	this.Victory = function(){ 
		if (!sounds_on) return;
		this.victory.play();
	};
	this.LevelDone = function(){
		if (!sounds_on) return;
		this.level_done.play();
	};
	this.GameOver = function(){
		if (!sounds_on) return;
		this.game_over.play();
	};
};
