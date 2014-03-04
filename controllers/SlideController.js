var slides = [];
var cradle = require('cradle');
var database = new(cradle.Connection)('http://localhost', 5984, {
	cache: true,
	raw: false
}).database('slides');


function SlideController() {
}

SlideController.prototype.addSlide = function(slide) {
	slides.push(slide);
};

SlideController.prototype.index = function(request, response) {
	var slides = [];
	slides['activeSlide'] = new Array();
	slides['availableSlides'] = new Array();
	database.view('slides/activeSlides', function(error, activeSlides) {
		if (error) {
			response.send(500, 'damn..');
		} else {
			activeSlides.forEach(function(activeSlide) {
				slides['activeSlides'][activeSlide.id] = activeSlide;
			});
		}
	});
	console.log(slides);
	database.view('slides/availableSlides', function(error, availableSlides) {
		if (error) {
			response.send(500, 'damn..');
		} else {
			availableSlides.forEach(function(availableSlide) {
				slides['availableSlides'][availableSlide.id] = availableSlide;
			});
		}
	});
	response.render('slide/index', {slides : slides});
/*	database.get('_design/slides/_view/activeSlides/', function (error, activeSlides) {
		if (error) {
			response.send(500, 'damn..');
		}
		var activeSlides = activeSlides;
	});
	database.get('_design/slides/_view/availableSlides/', function (error, availableSlides) {
		if (error) {
			response.send(500, 'damn..');
		}
	 	var availableSlides = availableSlides;
	});
*/
};

module.exports = SlideController;