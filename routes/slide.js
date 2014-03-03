
/*
 * GET home page.
 */

exports.list = function(req, res){
  res.render('slide/list', { title: 'Express' });
};