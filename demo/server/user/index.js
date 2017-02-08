/*
 * GET home page.
 */
exports.index = function (req, res) {
    res.send('hello ... user');
};

exports.upload = function (req, res) {
    console.log(req.body, req.files);
    res.send({"success": true});
};

exports.uploadDelete = function (req, res) {
    console.log(req.body, req.files);
    
};