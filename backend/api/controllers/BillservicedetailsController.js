/**
 * BillservicedetailsController
 *
 * @description :: Server-side logic for managing Billservicedetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_bs: function (req, res) {
        var bs_bill_id = req.param('bs_bill_id'),
            bs_service_id = req.param('bs_service_id'),
            bs_count = req.param('bs_count'),
            bs_service_price = req.param('bs_service_price'),
            bs_total = req.param('bs_total');
        if (!bs_bill_id || bs_bill_id === '') {
            res.json({
                status: 'error',
                message: 'bs_bill_id không hợp lệ'
            })
            return;
        }
        if (!bs_service_id || bs_service_id === '' || bs_service_id < 1) {
            res.json({
                status: 'error',
                message: 'bs_service_id không hợp lệ'
            })
            return;
        }
        if (!bs_count || bs_count === '' || bs_count < 1) {
            res.json({
                status: 'error',
                message: 'bs_count không hợp lệ'
            })
            return;
        }
        if (!bs_service_price || bs_service_price === '' || bs_service_price < 1) {
            res.json({
                status: 'error',
                message: 'bs_service_price không hợp lệ'
            })
            return;
        }
        if (!bs_total || bs_total === '' || bs_total < 1) {
            res.json({
                status: 'error',
                message: 'bs_total không hợp lệ'
            })
            return;
        }
        Billservicedetails.findOne({ bs_bill_id, bs_service_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'warning',
                    message: 'Dịch vụ này đã có trong hóa đơn rồi'
                })
            } else {
                Billservicedetails.create({ bs_bill_id, bs_service_id, bs_count, bs_service_price, bs_total }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: 'Thêm dịch vụ cho hóa đơn thành công',
                            bs: created
                        })
                    }
                })
            }
        })
    },
    del_bs: function (req, res) {
        var bs_id = req.param('bs_id');
        if (!bs_id || bs_id === '' || bs_id < 1) {
            res.json({
                status: 'error',
                message: 'bs_id không hợp lệ'
            })
            return;
        }
        Billservicedetails.findOne({ bs_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Billservicedetails.destroy({ bs_id }).exec(function (err) {
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
    list_bs: function (req, res) {
        sql = "SELECT billservicedetails.bs_id, billservicedetails.bs_bill_id, billservicedetails.bs_service_id, services.service_name, services.service_price FROM billservicedetails LEFT JOIN bills on billservicedetails.bs_bill_id = bills.bill_id LEFT JOIN services ON billservicedetails.bs_service_id = services.service_id";
        Billservicedetails.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_bs thành công',
                    list_bs: results
                })
            }
        })
    },
    list_bsById: function (req, res) {
        var bs_bill_id = req.param('bs_bill_id');
        if (!bs_bill_id || bs_bill_id === '' || bs_bill_id < 1) {
            res.json({
                status: 'error',
                message: 'bs_bill_id không hợp lệ'
            })
            return;
        }
        sql = "SELECT billservicedetails.bs_id, billservicedetails.bs_bill_id, billservicedetails.bs_service_id, services.service_name, billservicedetails.bs_count, billservicedetails.bs_service_price, billservicedetails.bs_total FROM billservicedetails LEFT JOIN bills on billservicedetails.bs_bill_id = bills.bill_id LEFT JOIN services ON billservicedetails.bs_service_id = services.service_id WHERE billservicedetails.bs_bill_id= '" + bs_bill_id + "'";
        Billservicedetails.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_BillByID thành công',
                    list_bs: results
                })
                return;
            }
        })
    }
};

