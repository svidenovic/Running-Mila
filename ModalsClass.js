
var ModalTypes = {
	VICTORY:0, LEVEL_DONE:1, GAME_OVER:2, HELP:3
};

function Modal(type){
	this.type = type;
	this.modal = {};
	this.reload_onClose = false;
	
	this.init = function(){
		var txt = "", btn_txt = "";
		var This = this;
		
		switch (this.type){
			case ModalTypes.VICTORY:
				txt = Modal_texts.Victory[0];
				btn_txt = Modal_texts.Victory[1];
				this.modal = $("#Modal_victory");
				this.reload_onClose = true;
				break;
			case ModalTypes.LEVEL_DONE:
				txt = Modal_texts.LevelDone [level][0];
				btn_txt = Modal_texts.LevelDone [level][1];
				this.modal = $("#Modal_levelDone");
				this.reload_onClose = false;
				break; 
			case ModalTypes.GAME_OVER:
				this.modal = $("#Modal_gameOver");
				this.reload_onClose = true;
				break;
			case ModalTypes.HELP:
				txt = Modal_texts.Help[0];
				btn_txt = Modal_texts.Help[1];
				this.modal = $("#Modal_help");
				this.reload_onClose = false;
				break;
			default: break;
		}
		if (this.type != ModalTypes.GAME_OVER){
			if (this.type == ModalTypes.VICTORY)
				$(this.modal).find(".modal-body").html(txt);
			else
				$(this.modal).find(".modal-body p").html(txt);
			
			$(this.modal).find("#btn_close").html(btn_txt);
		}
		
		$(this.modal).on('hidden.bs.modal', function () {
			if (This.type == ModalTypes.LEVEL_DONE){
				update_levelProgBar(0);
				$("#p_currLevel").find("span").html(++level+1);
				nof_boxes = parseInt( 10 * anim_times[0]/anim_times[level] );
			}
			if (This.reload_onClose) location.href=location.href;
			
			$("#btn_nextlevel").focus();
		});
	};

	this.show = function(){
		if (this.reload_onClose){
			$(jumper.content).stop();
			$(box_curr.content).stop();
			jumper.removeJumper();
			box_curr.removeBox();
		}
		
		if (this.type == ModalTypes.LEVEL_DONE){
			$(this.modal).find(".modal-title").find("span").html(level+1);
			
			$(this.modal).find(".modal-body p").html(
				Modal_texts.LevelDone [level] [0]
			);
			$(this.modal).find("#btn_close").html(
				Modal_texts.LevelDone [level] [1]
			);
		}
		if (this.type == ModalTypes.GAME_OVER){
			var idx = parseInt( jumper.weight / jumper.weight_lims[1] );
			$(this.modal).find(".modal-body p").html(
				Modal_texts.GameOver [idx] [0]
			);
			$(this.modal).find("#btn_close").html(
				Modal_texts.GameOver [idx] [1]
			);
		}
		if (this.type != ModalTypes.HELP) 
			$("#btn_nextlevel").prop("disabled", false);
		
		$(this.modal).modal("show");
		
		switch (this.type){
			case ModalTypes.VICTORY: sounds.Victory(); break;
			case ModalTypes.LEVEL_DONE: sounds.LevelDone(); break;
			case ModalTypes.GAME_OVER: sounds.GameOver(); break;
			default: break;
		}
	};
};

var Modal_texts = {
	Victory: [
		"<p>Supermen je odleteo i odneo svoja široka ramena, jbg spora si. :P </br>"
		+"Ali ti je čestitao rodjendan i čeka te u sledećoj rundi. ;) </br>"
		+"Bravo Milkiću :D evo pojedi tortu: </p> <div class='win_cake'></div>"
		+"<p id='txt_after_cake'></p>",
		"Aj ispočetka !",
		"Kakav speed :o",
		"E pa jbg, nema više..."
	],
	GameOver: [
		["Puno kenjaš, nema više sere papira :P ", "Neću više, aj opet !"],
		["Puno jedeš, treba da sereš redovnije :D", "Ali ja sam dama, aj opet !"]
	],
	Help: [
		"U susret ti dolaze torte (+10kg) i WC šolje (-10kg) </br>"
		+"Počinješ sa 50kg, a gubiš igru kada dodješ do 100kg ili padneš na 0kg </br>"
		+"Ti možeš da pokupiš ili preskočiš bilo šta, da bi skočila klikćeš po pejzažu... </br>"
		+"Svaki nivo počinješ klikom na START, a ima ih 6, jer me mrzelo više da ih kucam. </br>"
		+"Ostalo provali sama... :)",
		"Kontam"
	],
	LevelDone: [
		["Bravo Milkiću :) </br> Dobro hodaš jer pravilno dišeš !", "Hvala Stefano :) aj dalje."],
		["Opa baki :D </br> Aj sad malo gledaj napred, a ne u sebe :P", "Šta bre ? ma daj dalje..."],
		["Ajde reci 3... XD </br> A da, ukočio sam ti vrat u kôdu...", "Jebi se bre, davaj dalje !"],
		["Zainteresovala si Supermena :D </br> Eno čeka te u WC-u na 6.nivou ;)", "Opa Mićo, pa on je top cica jer ima široka ramena :D"],
		["Supermen je pravilno nauljen :O </br> E ali, 6.nivo nema pauzu za WC :P", "Ne seri !? :o"]
	]
};

