/**
 * ReportdetailsController
 *
 * @description :: Server-side logic for managing Reportdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_rd: function (req, res) {
        var rd_report_id = req.param('rd_report_id'),
            rd_rule_id = req.param('rd_rule_id'),
            rd_content = req.param('rd_content');
        if (!rd_report_id || rd_report_id === '' || rd_report_id < 1) {
            res.json({
                status: 'error',
                message: 'rd_report_id không hợp lệ'
            })
            return;
        }
        if (!rd_rule_id || rd_rule_id === '' || rd_rule_id < 1) {
            res.json({
                status: 'error',
                message: 'rd_report_id không hợp lệ'
            })
            return;
        }
        if (!rd_content || rd_content === '') {
            res.json({
                status: 'error',
                message: 'rd_content không hợp lệ'
            })
            return;
        }
        Reportdetails.findOne({ rd_report_id, rd_rule_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'warning',
                    message: 'Quy định này đã có trong biên bản rồi'
                })
                return;
            }
            else {
                Reportdetails.create({ rd_report_id, rd_rule_id, rd_content }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: "Thêm quy định vào biên bản thành công"
                        })
                        return;
                    }
                })
            }
        })
    },
    del_rd: function (req, res) {
        var rd_id = req.param('rd_id');
        if (!rd_id || rd_id === '' || rd_id < 1) {
            res.json({
                status: 'error',
                message: 'rd_id không hợp lệ'
            })
            return;
        }
        Reportdetails.findOne({ rd_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Reportdetails.destroy({ rd_id }).exec(function (err) {
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
    list_rd: function (req, res) {
        var rd_report_id = req.param('rd_report_id');
        if (!rd_report_id || rd_report_id === '' || rd_report_id < 1) {
            res.json({
                status: 'error',
                message: 'rd_report_id không hợp lệ'
            })
            return;
        }
        Reportdetails.find({ rd_report_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status:'success',
                    message:'GET list_rd theo id biên bản thành công',
                    list_rd: find
                })
            }
        })
    }
};

