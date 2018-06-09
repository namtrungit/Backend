/**
 * ReportsController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_report: function (req, res) {
        var report_id = req.param('report_id'),
            report_stu_id = req.param('report_stu_id'),
            report_content = req.param('report_content'),
            report_creater = req.param('report_creater');
        if (!report_id || report_id === '') {
            res.json({
                status: 'error',
                message: 'report_id không hợp lệ'
            })
            return;
        }
        if (!report_stu_id || report_stu_id === '' || report_stu_id < 1) {
            res.json({
                status: 'error',
                message: 'report_stu_id không hợp lệ'
            })
            return;
        }
        if (!report_content || report_content === '') {
            res.json({
                status: 'error',
                message: 'report_content không hợp lệ'
            })
            return;
        }
        if (!report_creater || report_creater === '') {
            res.json({
                status: 'error',
                message: 'report_creater không hợp lệ'
            })
            return;
        }
        Students.findOne({ stu_id_school: report_stu_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Reports.create({ report_id, report_stu_id, report_content, report_creater }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: 'Thêm biên bản thành công',
                            Report: created
                        })
                    }
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không sinh viên với mã số ' + report_stu_id + ' trong csdl'
                })
                return;
            }
        })

    },
    del_report: function (req, res) {
        var report_id = req.param('report_id');
        if (!report_id || report_id === '') {
            res.json({
                status: 'error',
                message: 'report_id không hợp lệ'
            })
            return;
        }
        Reportdetails.findOne({ rd_report_id: report_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                console.log('Biên bản này có chi tiết');
                Reportdetails.destroy({ rd_report_id: report_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    Reports.findOne({ report_id }).exec(function (err, find) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (find) {
                            Reports.destroy({ report_id }).exec(function (err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                res.json({
                                    status: 'success',
                                    message: 'Xóa biên bản thành công'
                                })
                                return;
                            })
                        }
                    })
                })
            }
            else {
                console.log('Biên bản này ko có chi tiết');
                Reports.findOne({ report_id }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        Reports.destroy({ report_id }).exec(function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            res.json({
                                status: 'success',
                                message: 'Xóa biên bản thành công'
                            })
                            return;
                        })
                    }
                })
            }
        })
    },
    update_report: function (req, res) {
        var report_id = req.param('report_id'),
            report_stu_id = req.param('report_stu_id'),
            report_content = req.param('report_content');
        if (!report_id || report_id === '') {
            res.json({
                status: 'error',
                message: 'report_id không hợp lệ'
            })
            return;
        }
        if (!report_stu_id || report_stu_id === '' || report_stu_id < 1) {
            res.json({
                status: 'error',
                message: 'report_stu_id không hợp lệ'
            })
            return;
        }
        if (!report_content || report_content === '') {
            res.json({
                status: 'error',
                message: 'report_id không hợp lệ'
            })
            return;
        }
        Reports.findOne({ report_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Students.findOne({ stu_id_school: report_stu_id }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        Reports.update({ report_id }, { report_stu_id, report_content }).exec(function (err, updated) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (updated) {
                                res.json({
                                    status: 'success',
                                    message: 'Cập nhật biên bản thành công'
                                })
                            }
                        })
                    }
                    else {
                        res.json({
                            status: 'warning',
                            message: 'Không sinh viên với mã số :' + report_stu_id + ' trong csdl'
                        })
                        return;
                    }
                })
            }
        })
    },
    list_report: function (req, res) {
        sql = "SELECT students.stu_id_school,students.stu_name, students.stu_sex, classes.class_name, faculties.fal_name, reports.report_id, reports.report_content, reports.createdAt, reports.report_creater FROM reports LEFT JOIN students ON reports.report_stu_id = students.stu_id_school, faculties, classes WHERE classes.class_id = students.stu_id_class AND faculties.fal_id = classes.class_id_faculty ORDER BY reports.createdAt DESC";
        Reports.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_report thành công',
                    list: results
                })
                return;
            }
        })
    },
    find_report: function (req, res) {
        var report = req.param('report'),
            stu = req.param('stu');
        if (report && stu) {
            // console.log(1);
            sql = "SELECT students.stu_id_school,students.stu_name, students.stu_sex, classes.class_name, faculties.fal_name, reports.report_id, reports.report_content, reports.createdAt, reports.report_creater FROM reports LEFT JOIN students ON reports.report_stu_id = students.stu_id_school, faculties, classes WHERE classes.class_id = students.stu_id_class AND faculties.fal_id = classes.class_id_faculty  AND  reports.report_id = '" + report + "' AND  reports.report_stu_id = " + stu + "";
        }
        if (report && !stu) {
            // console.log(2);
            sql = "SELECT students.stu_id_school,students.stu_name, students.stu_sex, classes.class_name, faculties.fal_name, reports.report_id, reports.report_content, reports.createdAt, reports.report_creater FROM reports LEFT JOIN students ON reports.report_stu_id = students.stu_id_school, faculties, classes WHERE classes.class_id = students.stu_id_class AND faculties.fal_id = classes.class_id_faculty  AND  reports.report_id = '" + report + "' ";
        }
        if (!report && stu) {
            // console.log(3);
            sql = "SELECT students.stu_id_school,students.stu_name, students.stu_sex, classes.class_name, faculties.fal_name, reports.report_id, reports.report_content, reports.createdAt, reports.report_creater FROM reports LEFT JOIN students ON reports.report_stu_id = students.stu_id_school, faculties, classes WHERE classes.class_id = students.stu_id_class AND faculties.fal_id = classes.class_id_faculty  AND  reports.report_stu_id = " + stu + "";
        }
        if (!report && !stu) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin để tìm kiếm'
            })
            return;
        }
        Reports.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status:'success',
                    message:'GET thành công',
                    list: results
                })
                return;
            }
        })
    }
};

