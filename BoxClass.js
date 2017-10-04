
function Box(id){
	this.id = id;
	this.content = {};
	this.speed = anim_times[level];
	this.T = { CAKE:0, TOILET:1 };
	this.type = this.T.CAKE;
	this.prog = 0;
	this.update_happened = false;
	
	this.createBox = function(){
		if (level == level_max) this.type = this.T.CAKE;
		else{
			this.type = (getRandomInt(0,2) < 2)
			? this.T.CAKE : this.T.TOILET; // cakes are 2x more likely
		}
		
		this.content = document.createElement("div");
		$(this.content).attr("class", "box_element");
		this.setBeforeImg();
		
		$(this.content).hide();
		$("#trackDiv").append(this.content);
		$(this.content).fadeIn(300);
	};
	
	this.moveBox = function(funCall){
		var This = this;
		var funCall_called = false;
		var threshold = 100; // default value
		
		$(This.content).animate(
			{
				"margin-left": - parseFloat( 
					$(This.content).css("width").replace(/[^-\d\.]/g,"")
				)
			},
			{
				duration: this.speed,
				easing: "linear",
				start: function() {
					threshold = getRandomInt( 
						distance_limits[0], distance_limits[1]
					);
					funCall_called = false;
				},
				complete: function() {
					update_levelProgBar( 100*(This.id+1)/nof_boxes );
					
					$(This.content).fadeOut( 300, function(){
						$(This.content).remove();
					});
					
					This.update_happened = false;
					if(This.id == nof_boxes-1){
						level_active = false;
						if(level == level_max){
							modal_victory.show();
						}else{
							modal_levelDone.show();
							jumper.update_jumper_speed();
						}
					}
				},
				progress: function(animation, progress) {
					This.prog = Math.round(100*progress);
					handle_collisions( This );
					if( threshold < This.prog && !funCall_called ){
						funCall(); // calls the next box to be made
						funCall_called = true;
					}
				}
			}
		);
	};
	
	this.removeBox = function(){
		var This = this;
		$(this.content).fadeOut( 500, function(){
			$(This.content).remove();
		});
	};
	
	this.setBeforeImg = function(){
		var img_src = "";
		if(this.type == this.T.CAKE){
			var i = getRandomInt( 0, images.cakes_before.length-1 );
			img_src = images.cakes_before[i];
		}
		else{ // toilet:
			img_src = images.toilet_before;
		}
		$(this.content).css("background-image", "url('"+img_src+"')");
	};
	
	this.setAfterImg = function(){
		var img_src = "";
		if(this.type == this.T.CAKE){
			img_src = images.cake_after;
			sounds.eat();
		}
		else{ // toilet:
			img_src = images.toilet_after;
			sounds.shit();
		}
		$(this.content).css("background-image", "url('"+img_src+"')");
	};
	
}
// not used:
Box.prototype.getMarginFloat = function(){
	return parseFloat( 
		$(this.content).css("margin-left").replace(/[^-\d\.]/g,"")
	);
};
