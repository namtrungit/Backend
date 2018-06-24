/**
 * AreasController
 *
 * @description :: Server-side logic for managing areas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_area: function (req, res) {
        var area_address = req.param('area_address'),
            area_sympol = req.param('area_sympol');
        if (!area_address || area_address === '') {
            res.json({
                status: 'error',
                message: 'area_address không hợp lệ!'
            })
        }
        if (!area_sympol || area_sympol === '') {
            res.json({
                status: 'error',
                message: 'area_sympol không hợp lệ!'
            })
        }
        Areas.create({
            area_address,
            area_sympol
        }).exec(function (err, created) {
            if (err) {
                console.log(err);
                return;
            }
            if (created) {
                res.json({
                    status: 'success',
                    message: 'Thêm khu vực thành công',
                    Area: created
                })
            }
        })
    },
    del_area: function (req, res) {
        var area_id = req.param('area_id');
        if (!area_id || area_id === '' || area_id < 1) {
            res.json({
                status: 'error',
                message: 'area_id khu vực không hợp lệ!'
            })
            return;
        }
        Areas.findOne({ area_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Areas.destroy({ area_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa khu vực thành công'
                    })
                })
            } else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy khu vực ' + area_id
                })
            }
        })

    },
    get_area: function (req, res) {
        Areas.find().exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'success',
                    message: 'GET khu vực thành công',
                    Areas: find
                })
            }
        })
    },
    update_area: function (req, res) {
        var area_id = req.param('area_id'),
            area_address = req.param('area_address'),
            area_sympol = req.param('area_sympol');
        if (!area_id || area_id === '' || area_id < 1) {
            res.json({
                status: 'error',
                message: 'area_id khu vực không hợp lệ!'
            })
            return;
        }
        if (!area_address || area_address === '') {
            res.json({
                status: 'error',
                message: 'area_address không hợp lệ!'
            })
        }
        if (!area_sympol || area_sympol === '') {
            res.json({
                status: 'error',
                message: 'area_sympol không hợp lệ!'
            })
        }
        Areas.findOne({ area_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Areas.update({ area_id }, { area_address, area_sympol }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật thành công'
                        })
                        return;
                    }
                })
            } else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy area_id: ' + area_id
                })
                return;
            }
        })
    },
    quantity_area: function (req, res) {
        var sql = "SELECT COUNT(areas.area_id) as quantity_area FROM areas";
        Areas.query(sql, function (err, resullt) {
            if (err) {
                console.log(err);
                return;
            }
            if (resullt) {
                res.json({
                    status:'success',
                    message:'GET quantity_area thành công',
                    quantity: resullt
                })
                return;
            }
        })
    }
};

