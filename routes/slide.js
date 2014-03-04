
/*
 * GET home page.
 */

exports.list = function(req, res){
	res.assign('slides', 'slides');
	res.render('slide/list', { title: 'Express' });
};