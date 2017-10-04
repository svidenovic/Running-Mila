
function Shout(){
	
	this.shouts = [
		" Ostaću debela, </br> neću se vezati ♪",
		" Ja sam Milkiću !",
		" Skuvam ti sendvič ",
		" Prdim u snu !",
		" Stefanooo !",
		" Ne volim stopala !",
		" Vrišt !",
		" Skič !",
		" Mjau !",
		" Ne liži mi puder !",
		" Lepim žvaku na fon",
		" Smaram ljude i to, </br> sa sve 3 pesme !",
		" Udebelila sam se !",
		" Napijem se od 2 piva !"
	];
	
	this.bubble = {};
	this.buuble_active = false;
	
	this.getOne = function(){
		return this.shouts[ getRandomInt(0, this.shouts.length-1) ];
	};
	
	this.out = function(){
		var This = this;
		this.buuble_active = true;
		
		$(this.bubble).html( this.getOne() );
		
		$(this.bubble).show(200).delay(3000).hide(200, function(){
			This.buuble_active = false;
			$("#btn_shout").prop("disabled", false);
		});
	}
};
