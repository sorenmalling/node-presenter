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
	database.get('_design/list/_view/list/', function (error, slides) {
		if (error) {
			response.send(500, 'damn..');
		}
		response.render('slide/index', {slides : slides});
	});
};

module.exports = SlideController;