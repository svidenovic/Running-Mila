
function Jumper(){
	this.content = {};
	this.jump_speed = jumping_times[level];
	this.jump_hight = 140;
	this.jumping = false;
	
	this.weight_lims = [0,100];
	this.weight_step = 10;
	this.weight = 50;
	
	this.sprite_loop_i = 0;
	this.spritePosMat = {};
	
	this.shadow = {};
	this.shout = new Shout();
	
	this.createJumper = function(){
		this.gen_sprite_pos_matrix();
		
		this.content = document.createElement("div");
		$(this.content).attr("class", "jumper");
		this.createJumperHead();
		this.createJumperShadow();
		this.createShoutBubble();
		$("#trackDiv").append(this.content);
		
		this.update_weight_view();
		this.run_walking_sprite();
	};
	this.createJumperHead = function(){
		var head = document.createElement("div");
		$(head).attr("class","JumperHead");
		$(this.content).append( head );
	};
	this.createJumperShadow = function(){
		this.shadow = document.createElement("div");
		$(this.shadow).attr("class","JumperShadow");
		$("#trackDiv").append( this.shadow );
	};
	this.createShoutBubble = function(){
		var bubble = document.createElement("div");
		$(bubble).attr("class","shoutBubble");
		$(bubble).hide();
		this.shout.bubble = bubble;
		$(this.content).append( bubble );
	};
	
	this.removeJumper = function(){
		var This = this;
		$(this.content).fadeOut(500, function(){
			$(This.content).remove();
		});
		$(this.shadow).fadeOut(500,function(){
			$(This.shadow).remove();
		});
	};
	
	this.update_weight_view = function(){
		$("#p_currWeight").find("span").html(this.weight);
	};
	
	this.run_walking_sprite = function(){
		$(this.content).css("background-image", "url('"+images.Jumper_walking_sprite+"')" );
		$(this.content).css("background-position", "0px 0px");
		
		this.sprite_loop_i = 0;
		this.sprite_loop();
	};
	
	this.update_jumper_speed = function(){
		this.jump_speed = jumping_times[level];
	};
	
	this.update_jumper_weight = function(box_type){
		if( box_type == 0 ) this.weight += this.weight_step;
		else this.weight -= this.weight_step;
	};
	
	this.weightOutOfBounds = function(){
		return (
			this.weight <= this.weight_lims[0] || 
			this.weight_lims[1] <= this.weight
		);
	};
	
	this.jump = function(){
		if(this.jumping) return;
		
		var This = this;
		var marginTop = parseFloat( 
			$(this.content).css("margin-top").replace(/[^-\d\.]/g,"")
		);
		var tmp = 0.0;
		var fadeIn_started = false;
		
		$(this.content)
		.animate( // going up:
			{"margin-top": marginTop-this.jump_hight},
			{
				duration: this.jump_speed,
				easing: "linear",
				start: function() {
					This.jumping = true;
					$(This.shadow).fadeTo( 0.5*This.jump_speed, 0 );
				},
				complete: function() {},
				progress: function(animation, progress) {}
			}
		)
		.animate( // going down: 
			{"margin-top": marginTop},
			{
				duration: this.jump_speed,
				easing: "swing",
				start: function() {
					if (!fadeIn_started){
						$(This.shadow).fadeTo( 1.25*This.jump_speed, 1 );
						fadeIn_started = !fadeIn_started;
					}
				},
				complete: function() {
					This.jumping = false;
				},
				progress: function(animation, progress) {}
			}
		);
	};
		
}

Jumper.prototype.gen_sprite_pos_matrix = function(){
	var step = [100,140]; // [x,y]
	var end = [5,3];      // [w,h]
	
	var _spritePosMat = [];
	var tmp_vector = [];
	
	// generate position matrix:
	for (var h=0; h<end[1]; h++){
		tmp_vector = [];
		for (var w=0; w<end[0]; w++){
			tmp_vector.push([ w*step[0], h*step[1] ]);
		}
		_spritePosMat.push( tmp_vector );
	} 
	
	// matrix flips, 'cuz of recursiveness
	var tmp = [];
	var we = 0, he = 0;
	var w_lim = parseInt( Math.floor((end[0]-1)/2) );
	var h_lim = parseInt( Math.floor((end[1]-1)/2) );
	
	for (var h=0; h < end[1]; h++){
		for (var w=1; w <= w_lim; w++){
			we = end[0]-w;
			tmp = _spritePosMat[h][w];
			_spritePosMat[h][w] = _spritePosMat[h][we];
			_spritePosMat[h][we] = tmp;
		}
	}
	for (var h=1; h <= h_lim; h++){
		he = end[1]-h;
		tmp = _spritePosMat[h];
		_spritePosMat[h] = _spritePosMat[he];
		_spritePosMat[he] = tmp;
	}
	
	// drop 2D to 1D:
	this.spritePosMat = [];
	for (var h=0; h<end[1]; h++){
		for (var w=0; w<end[0]; w++){
			this.spritePosMat.push(_spritePosMat[h][w] );
		}
	}
};

Jumper.prototype.sprite_loop = function(){
	var This = this;
	if(This.sprite_loop_i < This.spritePosMat.length){
		$(This.content).delay( 0.1*this.jump_speed ).animate(
			{
				"background-position-x": 
				This.spritePosMat [This.sprite_loop_i][0] +"px",
				"background-position-y": 
				This.spritePosMat [This.sprite_loop_i][1] +"px"
			},{
				duration: 1,
				easing: "linear",
				complete: function(){ 
					if (++This.sprite_loop_i == This.spritePosMat.length)
						This.sprite_loop_i = 0;
					This.sprite_loop();
				}
			}
		);
	}
};
