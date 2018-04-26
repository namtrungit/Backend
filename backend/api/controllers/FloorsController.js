/**
 * FloorsController
 *
 * @description :: Server-side logic for managing floors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_floor: function (req, res) {
        var floor_id = req.param('floor_id');
        if (!floor_id || floor_id === '' || floor_id<1) {
            res.json({
                status: 'error',
                message: 'floor_id không hợp lệ'
            })
            return;
        }
        Floors.findOne({ floor_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'warning',
                    message: 'Dãy ' + floor_id + ' đã có trong danh sách'
                })
                return;;
            } else {
                Floors.create({ floor_id }).exec(function (err, created) {
                    if (err) {
                        res.json({
                            status: 'warning',
                            message: 'Dãy ' + floor_id + ' đã có'
                        })
                        return;;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: 'Tạo dãy ' + floor_id + ' thành công'
                        })
                        return;
                    }
                })
            }
        })

    },
    del_floor: function (req, res) {
        var floor_id = req.param('floor_id');
        if (!floor_id || floor_id === '' || floor_id<1) {
            res.json({
                status: 'error',
                message: 'floor_id không hợp lệ'
            })
            return;
        }
        Floors.findOne({ floor_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Floors.destroy({ floor_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa dãy '+floor_id+' thành công'
                    })
                    return;
                })
            } else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy floor_id= ' + floor_id
                })
                return;
            }
        })
    },
    list_floor: function (req, res) {
        Floors.find().exec(function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_floor thành công',
                    Floors: results
                })
            }
        })
    }
};

