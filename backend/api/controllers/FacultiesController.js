/**
 * FacultyController
 *
 * @description :: Server-side logic for managing faculties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    fal_create: function (req, res) {
        var fal_id = req.param('fal_id'),
            fal_name = req.param('fal_name')
        if (!fal_name || fal_name === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập tên khoa'
            })
        }
        Faculties.create({ fal_name }).exec(function (err, created) {
            if (err) {
                return res.json({
                    status: 'error',
                    message: 'Khoa ' + fal_name + ' đã có trong cơ sở dữ liệu rồi'
                });
            }
            if (created) {
                return res.json({
                    status: 'success',
                    message: 'Thêm khoa thành công'
                })
            }
        })
    },
    fal_get: function (req, res) {
        Faculties.find().exec(function (err, find) {
            if (err) {
                return console.log(err);
            }
            if (find) {
                return res.json({
                    status: 'success',
                    message: 'GET khoa thành công',
                    Faculties: find
                })
            }
        })
    },
    fal_del: function (req, res) {
        var fal_id = req.param('fal_id')
        if (!fal_id || fal_id === "" || fal_id < 1) {
            return res.json({
                status: 'error',
                message: 'ID ' + fal_id + ' không hợp lệ'
            })
        }
        Faculties.findOne({ fal_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Faculties.destroy({ fal_id }).exec(function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    else {
                        return res.json({
                            status: 'success',
                            message: 'Xóa thành công'
                        })
                    }
                })
            }else{
                return res.json({
                    status: 'warning',
                    message: 'Không tìm thấy '+fal_id
                })
            }
        })

    },
};

