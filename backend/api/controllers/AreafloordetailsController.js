/**
 * AreafloordetailsController
 *
 * @description :: Server-side logic for managing areafloordetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_afd: function (req, res) {
        var af_area_id = req.param('af_area_id'),
            af_floor_id = req.param('af_floor_id'),
            af_price = req.param('af_price');
        if (!af_area_id || af_area_id === '' || af_area_id < 1) {
            res.json({
                status: 'error',
                message: 'af_area_id không hợp lệ'
            })
            return;
        }
        if (!af_floor_id || af_floor_id === '' || af_floor_id < 1) {
            res.json({
                status: 'error',
                message: 'af_floor_id không hợp lệ'
            })
            return;
        }
        if (!af_price || af_price === '' || af_price < 1) {
            res.json({
                status: 'error',
                message: 'af_area_id không hợp lệ'
            })
            return;
        }
        Areafloordetails.findOne({ af_area_id, af_floor_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'warning',
                    message: 'Khu với dãy này đã được thêm giá rồi!'
                })
                return;
            }
            else {
                Areafloordetails.create({ af_area_id, af_floor_id, af_price }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: 'Thêm giá cho khu và dãy thành công',
                            afd: created
                        })
                        return;
                    }
                })
            }
        })
    },
    del_afd: function (req, res) {
        var af_id = req.param('af_id');
        // return console.log(af_id);
        if (!af_id || af_id === '' || af_id < 1) {
            res.json({
                status: 'error',
                message: 'af_id không hợp lệ'
            })
            return;
        }
        Areafloordetails.findOne({ af_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Areafloordetails.destroy({ af_id }).exec(function (err) {
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
            else {
                res.json({
                    status: 'success',
                    message: 'Không tìm thấy ID'
                })
                return;
            }
        })
    },
    update_afd: function (req, res) {
        var af_id = req.param('af_id'),
            af_area_id = req.param('af_area_id'),
            af_floor_id = req.param('af_floor_id'),
            af_price = req.param('af_price');
        if (!af_id || af_id === '' || af_id < 1) {
            res.json({
                status: 'error',
                message: 'af_id không hợp lệ'
            })
            return;
        }
        if (!af_area_id || af_area_id === '' || af_area_id < 1) {
            res.json({
                status: 'error',
                message: 'af_area_id không hợp lệ'
            })
            return;
        }
        if (!af_floor_id || af_floor_id === '' || af_floor_id < 1) {
            res.json({
                status: 'error',
                message: 'af_floor_id không hợp lệ'
            })
            return;
        }
        if (!af_price || af_price === '' || af_price < 1) {
            res.json({
                status: 'error',
                message: 'af_price không hợp lệ'
            })
            return;
        }
        Areafloordetails.findOne({ af_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Areafloordetails.update({ af_id }, { af_area_id, af_floor_id, af_price }).exec(function (err, updated) {
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
            }
            else {
                res.json({
                    status: 'success',
                    message: 'Không tìm thấy ID'
                })
                return;
            }
        })
    },
    list_afd: function (req, res) {
        var sql = 'SELECT areafloordetails.af_id, areas.area_sympol, floors.floor_id,areafloordetails.af_price FROM areafloordetails LEFT JOIN areas on areafloordetails.af_area_id = areas.area_id LEFT JOIN floors on areafloordetails.af_floor_id = floors.floor_id';
        Areafloordetails.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            else{
                res.json({
                    status:'success',
                    message:'GET list_afd thành công',
                    list_afd: results
                })
                return;
            }
        })
    },
    list_afdByAreaId (req, res){
        var af_area_id = req.param('af_area_id');
        var sql = 'SELECT areafloordetails.af_id, areas.area_sympol, floors.floor_id,areafloordetails.af_price FROM areafloordetails LEFT JOIN areas on areafloordetails.af_area_id = areas.area_id LEFT JOIN floors on areafloordetails.af_floor_id = floors.floor_id WHERE areafloordetails.af_area_id = "'+af_area_id+'"';
        Areafloordetails.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            else{
                res.json({
                    status:'success',
                    message:'GET list_afd by area_id thành công',
                    list_afd: results
                })
                return;
            }
        })
    }
};

