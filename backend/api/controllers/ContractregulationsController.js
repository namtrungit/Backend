/**
 * ContractregulationsController
 *
 * @description :: Server-side logic for managing contractregulations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const moment = require('moment');
module.exports = {
    add_recontract: function (req, res) {
        var recontract_name = req.param('recontract_name'),
            recontract_date = req.param('recontract_date'),
            recontract_content = req.param('recontract_content'),
            recontract_promotion = req.param('recontract_promotion'),
            recontract_limit = req.param('recontract_limit');
        if (!recontract_name || recontract_name === '') {
            res.json({
                status: 'error',
                message: 'recontract_name không hợp lệ'
            })
            return;
        }
        if (!recontract_date || recontract_date === '') {
            res.json({
                status: 'error',
                message: 'recontract_date không hợp lệ'
            })
            return;
        }
        if (!recontract_content || recontract_content === '') {
            res.json({
                status: 'error',
                message: 'recontract_content không hợp lệ'
            })
            return;
        }
        if ( recontract_promotion < 0) {
            res.json({
                status: 'error',
                message: 'recontract_promotion không hợp lệ'
            })
            return;
        }
        if (!recontract_limit || recontract_limit === '' || recontract_limit < 1) {
            res.json({
                status: 'error',
                message: 'recontract_limit không hợp lệ'
            })
            return;
        }
        let redate = recontract_date.split('/')[2] + "-" + recontract_date.split('/')[1] + "-" + recontract_date.split('/')[0];
        recontract_date = moment(redate).format('YYYY-MM-DD');
        Contractregulations.create({ recontract_name, recontract_date, recontract_content, recontract_status: 'disable', recontract_promotion, recontract_limit }).exec(function (err, created) {
            if (err) {
                console.log(err);
                return;
            }
            if (created) {
                res.json({
                    status: 'success',
                    message: 'Thêm quy định hợp đồng thành công',
                    recontract: created
                })
            }
        })
    },
    del_recontract: function (req, res) {
        var recontract_id = req.param('recontract_id');
        if (!recontract_id || recontract_id === '' || recontract_id < 1) {
            res.json({
                status: 'error',
                message: 'recontract_id không hợp lệ'
            })
            return;
        }
        Contractregulations.findOne({ recontract_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Contractregulations.destroy({ recontract_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa qui định thành công'
                    })
                    return;
                })
            }
            else {
                res.json({
                    status: 'error',
                    message: 'Không tìm thấy recontract_id ' + recontract_id,
                })
                return
            }
        })
    },
    list_recontract: function (req, res) {
        var sql = "SELECT contractregulations.recontract_id, contractregulations.recontract_name ,DATE_FORMAT(contractregulations.recontract_date,'%d/%m/%Y') AS recontract_date, contractregulations.recontract_content, contractregulations.recontract_status,contractregulations.recontract_promotion, contractregulations.recontract_limit, DATE_FORMAT(contractregulations.createdAt,'%d/%m/%Y') AS recontract_created FROM contractregulations";
        Contractregulations.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_recontract thành công',
                    list: results
                })
            }
        })
    },
    list_recontract_enable: function (req, res) {
        var sql = "SELECT contractregulations.recontract_id, contractregulations.recontract_name ,DATE_FORMAT(contractregulations.recontract_date,'%d/%m/%Y') AS recontract_date, contractregulations.recontract_content, contractregulations.recontract_status,contractregulations.recontract_promotion, contractregulations.recontract_limit, DATE_FORMAT(contractregulations.createdAt,'%d/%m/%Y') AS recontract_created FROM contractregulations WHERE contractregulations.recontract_status = 'enable'";
        Contractregulations.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_recontract_enable thành công',
                    list: results
                })
            }
        })
    },
    update_recontract: function (req, res) {
        var recontract_id = req.param('recontract_id'),
            recontract_name = req.param('recontract_name'),
            recontract_date = req.param('recontract_date'),
            recontract_content = req.param('recontract_content'),
            recontract_status = req.param('recontract_status'),
            recontract_promotion = req.param('recontract_promotion'),
            recontract_limit = req.param('recontract_limit');
        if (!recontract_id || recontract_id === '' || recontract_id < 1) {
            res.json({
                status: 'error',
                message: 'recontract_id không hợp lệ'
            })
            return;
        }
        if (!recontract_name || recontract_name === '') {
            res.json({
                status: 'error',
                message: 'recontract_name không hợp lệ'
            })
            return;
        }
        if (!recontract_date || recontract_date === '') {
            res.json({
                status: 'error',
                message: 'recontract_date không hợp lệ'
            })
            return;
        }
        if (!recontract_content || recontract_content === '') {
            res.json({
                status: 'error',
                message: 'recontract_date không hợp lệ'
            })
            return;
        }
        if (!recontract_status || recontract_status === '') {
            res.json({
                status: 'error',
                message: 'recontract_date không hợp lệ'
            })
            return;
        }
        if ( recontract_promotion < 0) {
            res.json({
                status: 'error',
                message: 'recontract_promotion không hợp lệ'
            })
            return;
        }
        if (!recontract_limit || recontract_limit === '') {
            res.json({
                status: 'error',
                message: 'recontract_limit không hợp lệ'
            })
            return;
        }
        let redate = recontract_date.split('/')[2] + "-" + recontract_date.split('/')[1] + "-" + recontract_date.split('/')[0];
        recontract_date = moment(redate).format('YYYY-MM-DD');
        Contractregulations.findOne({ recontract_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Contractregulations.update({ recontract_id }, { recontract_name, recontract_date, recontract_content, recontract_status, recontract_promotion, recontract_limit }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật qui định thành công'
                        })
                    }
                })
            }
            else {
                res.json({
                    status: 'error',
                    message: 'Không tìm thấy recontract_id ' + recontract_id,
                })
                return
            }
        })
    }
};

