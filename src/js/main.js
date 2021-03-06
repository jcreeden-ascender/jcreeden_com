$(document).ready(function(){
	$(window).on("scroll",function(){
		toggleSlideOut();
	});

	var $hamburger = $(".hamburger");
	  $hamburger.on("click", function(e) {
	    $hamburger.toggleClass("is-active");
	    toggleNav();
	  });
	 
	 //detect iOS
	 var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	 if(iOS){
	 	$("body").addClass("ios");
	 }



});

//app
var app = angular.module('jcApp',[]);

//controller
app.controller('jcCtrl',['$scope','$http', '$sce', function($scope,$http,$sce) {

	$http.get("/data/content.json").success(function(response){
		$scope.data = response.info;
		$scope.nav = $scope.data.nav;
		$scope.firstname= $scope.data.firstname;
    	$scope.lastname= $scope.data.lastname;
    	$scope.about = $sce.trustAsHtml($scope.data.about);
    	$scope.skills = $scope.data.skills;
    	$scope.employment = $scope.data.employment;
    	$scope.education = $scope.data.education;
	});


	/* FUNCTIONS */
	$scope.scrollDown = function(){
		scrollTo("#about");
	};

	$scope.sections = [];

	angular.element(document).ready(function () {
        setAnchors();
        $("section").each(function(){
        	$scope.sections.push($(this));
        });
    });


    $scope.topTop = function(){
    	$("html,body").animate({"scrollTop":"0px"},1000);
    }

    $scope.upOne = function(){
    	var scrollY = $(window).scrollTop();
    	var wHeight = $(window).height();
    	var targetY=0;

		if(scrollY>wHeight){
			
			for(s=0;s<$scope.sections.length;s++){
				var sec = $scope.sections[s];
				var sTop = sec.offset().top;
				if(sTop<scrollY || s==0){
					targetY=sTop;
				}
			}
		}

    	$("html,body").animate({"scrollTop":targetY},500);
    }

    $scope.downOne = function(){
    	var scrollY = $(window).scrollTop();
    	var wHeight = $(window).height();
    	var targetY=0;

    	for(s=$scope.sections.length-1;s>0;s--){
			var sec = $scope.sections[s];
			var sTop = sec.offset().top;
			if(sTop>(scrollY+(wHeight/2))){
				targetY=sTop;
			}
		}
		if(targetY>0){
			$("html,body").animate({"scrollTop":targetY},500);
		}
    }

    $scope.formData = {};

    $scope.submitForm = function(){
    	var url = "/contact.php";


    	var $responseContainer = $(".contact_confirm");
		$responseContainer.html("Sending...");
		$responseContainer.fadeIn();
		$("html,body").animate({scrollTop:$(document).height()},250);

		if($scope.formData.fn){
			$responseContainer.html("Your message was sent.  Thank you.");
		}
		else{
			$http({
	    		method	: "POST",
	    		url     : url,
	    		data    : $.param($scope.formData),
	    		headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
	    	}).success(function(data){
	    		var $responseContainer = $(".contact_confirm");
			        $responseContainer.html(data);
	    	})
	    	.error(function(status){
	    		var $responseContainer = $(".contact_confirm");
		        $responseContainer.html("I'm sorry there was an error sending your message.<br>Please try again or send me an email at <a href='mailto:johncreeden@hotmail.com'>johncreeden@hotmail.com</a>.");
		        console.log("Status: " + status);
	    	});
	
		}

    }


}]);



function scrollTo(sectionId){
	var $sectionTop = $(sectionId).offset().top;
	$("html,body").animate({"scrollTop":$sectionTop},500);

}

function toggleSlideOut(){
	var toggleY = $(window).height()/2;
	var scrollY = $(window).scrollTop();
	var $slide = $(".social .slide");
	var $subnav = $(".nav__btm__container");
	if(scrollY>=toggleY && !$slide.hasClass("open")){
		$slide.addClass("open");
		$slide.animate({"right":"0px"},250);
		$subnav.fadeIn();
	}
	else if(scrollY<toggleY && $slide.hasClass("open")){
		$slide.removeClass("open");
		$slide.animate({"right":"-100%"},250);
		$subnav.fadeOut();
	}
}

function toggleNav(){
	var winW = $(window).width();
	var $nav = $(".nav");
	var nWidth = $nav.width();
	if(!$nav.hasClass("open")){
		$nav.addClass("open");
		$nav.animate({"left":"0px"},250);
		if(winW>=768){
			$(".intro,.page_container").animate({"left":nWidth},250);
		}
	}
	else{
		$nav.removeClass("open");
		$nav.animate({"left":-(nWidth)},250);
		if($(".intro").css("left")!="0px"){
			$(".intro,.page_container").animate({"left":"0px"},250);
		}
		
	}

}

function setAnchors(){
	$("a[href^='#']").on("click",function(e){
		
		e.preventDefault();
		var $lnk = $(this);
		var target = $lnk.attr("href");
		var $target = $(target);
		if($target){
			var newtop=$target.offset().top;
			if(target=="#intro"){
				newtop=0;
			}
			$("html,body").animate({"scrollTop":newtop},600);
			
			if($(".nav").hasClass("open")){
				$(".hamburger").toggleClass("is-active");
				toggleNav();
			}
		}
		
	});
}