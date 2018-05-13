/**
 * BillsController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_bill: function (req, res) {
        var bill_id = req.param('bill_id'),
            bill_stu_id = req.param('bill_stu_id'),
            bill_create_name = req.param('bill_create_name');
        if (!bill_id || bill_id === '') {
            res.json({
                status: 'error',
                message: 'bill_id không hợp lệ'
            })
            return;
        }
        if (!bill_stu_id || bill_stu_id === '' || bill_stu_id < 1) {
            res.json({
                status: 'error',
                message: 'bill_stu_id không hợp lệ'
            })
            return;
        }
        if (!bill_create_name || bill_create_name === '') {
            res.json({
                status: 'error',
                message: 'bill_create_name không hợp lệ'
            })
            return;
        }
        Students.findOne({ stu_id_school: bill_stu_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Bills.create({ bill_id, bill_stu_id, bill_create_name }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: 'Lập hóa đơn thành công',
                            bill: created
                        })
                    }
                })
            }
            else {
                res.json({
                    status: 'warning stu',
                    message: 'Mã số sinh viên ' + bill_stu_id + ' không có trong cơ sở dữ liệu'
                })
                return;
            }
        })
    },
    update_bill: function (req, res) {
        var bill_id = req.param('bill_id'),
            bill_stu_id = req.param('bill_stu_id');
        if (!bill_id || bill_id === '' || bill_id < 1) {
            res.json({
                status: 'error',
                message: 'bill_id không hợp lệ'
            })
            return;
        }
        if (!bill_stu_id || bill_stu_id === '' || bill_stu_id < 1) {
            res.json({
                status: 'error',
                message: 'bill_stu_id không hợp lệ'
            })
            return;
        }
        Students.findOne({ stu_id_school: bill_stu_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Bills.findOne({ bill_id }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        Bills.update({ bill_id }, { bill_stu_id }).exec(function (err, updated) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (updated) {
                                res.json({
                                    status: 'success',
                                    message: 'Cập nhật hóa đơn thành công'
                                })
                            }
                        })
                    }
                })
            }
            else {
                res.json({
                    status: 'warning stu',
                    message: 'Mã số sinh viên ' + bill_stu_id + ' không có trong cơ sở dữ liệu'
                })
                return;
            }
        })
    },
    del_bill: function (req, res) {
        var bill_id = req.param('bill_id');
        if (!bill_id || bill_id === '' || bill_id < 1) {
            res.json({
                status: 'error',
                message: 'bill_id không hợp lệ'
            })
            return;
        }
        Billservicedetails.find({ bs_bill_id: bill_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Billservicedetails.destroy({ bs_bill_id: bill_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    Bills.findOne({ bill_id }).exec(function (err, find) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (find) {
                            Bills.destroy({ bill_id }).exec(function (err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                res.json({
                                    status: 'success',
                                    message: 'Xóa hóa đơn thành công'
                                })
                            })
                        }
                        else {
                            res.json({
                                status: 'warning',
                                message: 'Không tìm thấy id trong csdl'
                            })
                        }
                    })
                })
            }
            else {
                Bills.findOne({ bill_id }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        Bills.destroy({ bill_id }).exec(function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            res.json({
                                status: 'success',
                                message: 'Xóa hóa đơn thành công'
                            })
                        })
                    }
                    else {
                        res.json({
                            status: 'warning',
                            message: 'Không tìm thấy id trong csdl'
                        })
                    }
                })
            }
        })
    },
    list_bill: function (req, res) {
        sql = "SELECT bills.bill_id, bills.bill_stu_id, students.stu_name, DATE_FORMAT(bills.createdAt,'%d/%m/%Y') as bill_createAt, bills.bill_create_name FROM bills LEFT JOIN students on bills.bill_stu_id = students.stu_id_school ORDER BY bill_createAt DESC";
        Bills.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_bill thành công',
                    Bills: results
                })
                return;
            }
        })
    },
    bill_new: function (req, res) {
        var bill_id = req.param('bill_id');
        sql = "SELECT bills.bill_id, bills.bill_stu_id, students.stu_name, DATE_FORMAT(bills.createdAt,'%d/%m/%Y') as bill_createAt, bills.bill_create_name FROM bills LEFT JOIN students on bills.bill_stu_id = students.stu_id_school WHERE bills.bill_id = '" + bill_id + "'";
        Bills.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_bill thành công',
                    Bills: results
                })
                return;
            }
        })
    },
};
