$(document).ready(function(){
	$(window).on("scroll",function(){
		toggleSlideOut();
	});

	var $hamburger = $(".hamburger");
	  $hamburger.on("click", function(e) {
	    $hamburger.toggleClass("is-active");
	    toggleNav();
	  });
	 
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

	angular.element(document).ready(function () {
        setAnchors();
    });

}]);




function scrollTo(sectionId){
	var $sectionTop = $(sectionId).offset().top;
	$("html,body").animate({"scrollTop":$sectionTop},500);

}

function toggleSlideOut(){
	var toggleY = $(window).height()/2;
	var scrollY = $(window).scrollTop();
	var $slide = $(".social .slide");
	if(scrollY>=toggleY && !$slide.hasClass("open")){
		$slide.addClass("open");
		$slide.animate({"right":"0px"},250);
	}
	else if(scrollY<toggleY && $slide.hasClass("open")){
		$slide.removeClass("open");
		$slide.animate({"right":"-100%"},250);
	}
}

function toggleNav(){
	var $nav = $(".nav");
	var nWidth = $nav.width();
	if(!$nav.hasClass("open")){
		$nav.addClass("open");
		$nav.animate({"left":"0px"},250);
		$(".intro,.page_container").animate({"left":nWidth},250);
	}
	else{
		$nav.removeClass("open");
		$nav.animate({"left":-(nWidth)},250);
		$(".intro,.page_container").animate({"left":"0px"},250);
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
				toggleNav();
			}
		}
		
	});
}