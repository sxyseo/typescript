/*
 * GET home page.
 */
exports.index = function (req, res) {
    res.send('hello ... user');
};

exports.upload = function (req, res) {
    res.send({"success": true});
};