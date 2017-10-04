
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var level = 0;
var level_max = 5;
var level_active = false;
var sounds_on = true;

var distance_limits = [20,80];
var anim_times = [5000, 4000, 3000, 2000, 1500, 1000];
var jumping_times = [700, 560, 448, 358, 268, 201];
var nof_boxes = 10;

var images = {};
var sounds = {};
var jumper = {};
var modal_victory = {};
var modal_levelDone = {};
var modal_gameOver = {};
var modal_help = {};

var box_curr = {};
function runBoxes(){
	var boxi = 0;
	function newBox(){
		if(boxi < nof_boxes){
			var box = new Box(boxi++);
			box.createBox();
			box_curr = box;
			box.moveBox( newBox );
		}
		else boxi = 0;
	}
	newBox();
}

$(document).ready(function(){
	
	$(".mainDiv").css("margin-left", (screen.width-900)/2);
	
	images = new Images();
	sounds = new Sounds();
	sounds.init();
	
	jumper = new Jumper();
	jumper.createJumper();
	
	modal_victory   = new Modal( ModalTypes.VICTORY    );
	modal_levelDone = new Modal( ModalTypes.LEVEL_DONE );
	modal_gameOver  = new Modal( ModalTypes.GAME_OVER  );
	modal_help      = new Modal( ModalTypes.HELP       );
	modal_victory   .init();
	modal_levelDone .init();
	modal_gameOver  .init();
	modal_help      .init();
	
	$("#p_currLevel").find("span").html(level+1);
	
	$("#btn_nextlevel").click(function(){
		if(!level_active){
			$(this).prop("disabled", true);
			level_active = true;
			runBoxes();
		}
	});
	
	$("#btn_help").click(function(){
		modal_help.show();
	});
	
	$("#btn_shout").click(function(){
		if(!jumper.shout.bubble_active){
			$(this).prop("disabled", true);
			jumper.shout.out();
		}
	});
	
	$("#trackDiv").click(function(){
		jumper.jump();
	});
	
	$("#btn_nextlevel").focus();
	
	$("#btn_sounds").click(function(){
		if (sounds_on){
			$("#btn_sounds :nth-child(1)").css("color","#000000");
			$("#btn_sounds :nth-child(2)").html("off");
		}else{
			$("#btn_sounds :nth-child(1)").css("color","#34FF00");
			$("#btn_sounds :nth-child(2)").html("on");
		}
		sounds_on = !sounds_on;
	});
	
	var win_cake_eatem = false;
	$(".win_cake").click(function(){
		if (!win_cake_eatem){
			$(this).css("background-position", "80px 0px");
			$("#txt_after_cake").html( Modal_texts.Victory[2] );
			win_cake_eatem = !win_cake_eatem;
		}else{
			$("#txt_after_cake").html( Modal_texts.Victory[3] );
		}
	});
		
});

function handle_collisions( box ){
	if(80 < box.prog && box.prog < 85){
		if(!jumper.jumping && !box.update_happened){
			box.setAfterImg();
			
			jumper.update_jumper_weight( box.type );
			jumper.update_weight_view();
			
			if (jumper.weightOutOfBounds()){
				level_active = false;
				modal_gameOver.show();
			}
			
			box.update_happened = true;
		}
	}
}

function update_levelProgBar( percent ){
	var progbar = $("#levelProgBar").find(".progress-bar");
	$(progbar).attr("aria-valuenow", parseInt(percent));
	$(progbar).attr("style", "width:"+parseInt(percent)+"%");
}

