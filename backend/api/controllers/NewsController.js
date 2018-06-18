/**
 * NewsController
 *
 * @description :: Server-side logic for managing News
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_news: function (req, res) {
        var new_title = req.param('new_title'),
            new_content = req.param('new_content'),
            new_picture = req.param('new_picture'),
            new_creater = req.param('new_creater');
        if (!new_title || new_title === '') {
            res.json({
                status: 'error',
                message: 'new_title không hợp lệ'
            })
            return;
        }
        if (!new_content || new_content === '') {
            res.json({
                status: 'error',
                message: 'new_content không hợp lệ'
            })
            return;
        }
        if (!new_creater || new_creater === '') {
            res.json({
                status: 'error',
                message: 'new_creater không hợp lệ'
            })
            return;
        }
        News.create({ new_title, new_content, new_picture, new_creater }).exec(function (err, created) {
            if (err) {
                console.log(err);
                return;
            }
            if (created) {
                res.json({
                    status: 'success',
                    message: 'Thêm tin tức thành công',
                    news: created
                })
                return;
            }
        })
    },
    news_upload_picture: function (req, res) {
        req.file('picture').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/news')
        }, function (err, uploadedFiles) {
            if (err) return console.log(err);
            if (uploadedFiles.length > 0) {
                var picture = require('path').basename(uploadedFiles[0].fd);
                return res.json({
                    status: 'success',
                    message: 'Upload picture thành công',
                    picture: picture
                });
            }
        });
    },
    update_news: function (req, res) {
        var new_id = req.param('new_id'),
            new_title = req.param('new_title'),
            new_content = req.param('new_content'),
            new_picture = req.param('new_picture');
        if (!new_id || new_id === '' || new_id < 1) {
            res.json({
                status: 'error',
                message: 'new_id không hợp lệ'
            })
            return;
        }
        if (!new_title || new_title === '') {
            res.json({
                status: 'error',
                message: 'new_title không hợp lệ'
            })
            return;
        }
        if (!new_content || new_content === '') {
            res.json({
                status: 'error',
                message: 'new_content không hợp lệ'
            })
            return;
        }
        News.findOne({ new_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                News.update({ new_id }, { new_title, new_content, new_picture }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật thành công'
                        })
                        return
                    }
                })
            }
        })
    },
    del_news: function (req, res) {
        var new_id = req.param('new_id');
        if (!new_id || new_id === '' || new_id < 1) {
            res.json({
                status: 'error',
                message: 'new_id không hợp lệ'
            })
            return;
        }
        News.findOne({ new_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                News.destroy({ new_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa thành công'
                    })
                    return;
                })
            }
        })
    },
    list_news: function (req, res) {
        sql = "SELECT news.new_id, news.new_title, news.new_content, news.new_picture, DATE_FORMAT(news.createdAt, '%d/%m/%Y') as createdAt, news.new_creater FROM news ORDER BY createdAt DESC";
        News.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_news thành công',
                    list: results
                })
                return;
            }
        })
    },
    get_news: function (req, res) {
        var id = req.param('id');
        News.findOne({ new_id: id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'success',
                    message: 'GET news thành công',
                    news: find
                })
                return;
            }
        })
    },
    get_news_index: function (req, res) {
        sql = "SELECT news.new_id, news.new_title, news.new_content, news.new_picture, news.createdAt, news.new_creater FROM news ORDER BY createdAt DESC LIMIT 4";
        News.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_news thành công',
                    list: results
                })
                return;
            }
        })
    }
};

