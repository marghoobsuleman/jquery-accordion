//menu Accordion
//author: Marghoob Suleman
//Date: 05th Aug, 2009
//Version: 1.0
//web: www.giftlelo.com | www.marghoobsuleman.com

msAccordion = {
	currentDiv:'1',
	previousDiv:'',
	isVertical: false,
	mainHolder:'',
	iDefaultid:0,
	init: function(sHolder, defaultid) {
		this.mainHolder =sHolder;
		this.iDefaultid = (defaultid==undefined) ? this.iDefaultid : defaultid;
		var allDivs = $("#"+this.mainHolder+" div.set");
		this.setIds(allDivs, this.iDefaultid);
	},
	makeVertical: function(bVertical) {
		this.isVertical = bVertical;
		if(this.isVertical==true) {
			$("#"+this.mainHolder +" > div").css({display:"block", float:"none", clear:"both"});
			$("#"+this.mainHolder +" > div > div.title").css({display:"block", float:"none", clear:"both"});
			$("#"+this.mainHolder +" > div > div.content").css({clear:"both"});
		}
	},
	setDefault: function(sid) {
		$("#"+sid).click();
	},
	openDiv: function(id) {
		var sTitleID = id;
		var iCurrent = sTitleID.split("_")[sTitleID.split("_").length-1];
		var sContentID = id+"_msContent_"+iCurrent;
		if($("#"+sContentID).css("display")=="none") {
			if(msAccordion.previousDiv!="") {
				this.closeDiv(msAccordion.previousDiv);
			};
			if(this.isVertical) {
				$("#"+sContentID).slideDown("slow");
			} else {
				$("#"+sContentID).show("slow");
			}
			msAccordion.currentDiv = sContentID;
			msAccordion.previousDiv = msAccordion.currentDiv;			
		}		
	},
	closeDiv: function(div) {
		if(this.isVertical) {
			$("#"+div).slideUp("slow");
		} else {
			$("#"+div).hide("slow");
		}
	},
	setIds: function(divs, defaultid) {
		var allDivs = divs;
		allDivs.each(function(current) {
								 var iCurrent = current;
								 var sTitleID = "msTitle_"+iCurrent;
								 var sContentID = sTitleID+"_msContent_"+iCurrent;
								 var currentDiv = allDivs[iCurrent];
								 var totalChild = currentDiv.childNodes.length;
								 for(var iCount=0;iCount<totalChild;iCount++) {
									 if(currentDiv.childNodes[iCount].className=='title') {
										 currentDiv.childNodes[iCount].id = sTitleID;
										 $("#"+sTitleID).click(function() {msAccordion.openDiv(sTitleID)});
									 } 
									 if(currentDiv.childNodes[iCount].className=='content') {
										 currentDiv.childNodes[iCount].id = sContentID;
									 }
								 }
								 });
		//open default;
		this.setDefault("msTitle_"+defaultid);
	}
}
