/**
 * RegistersController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const moment = require('moment');
const nodemailer = require('nodemailer');
module.exports = {
    add_register: function (req, res) {
        var register_id_school = req.param('register_id_school'),
            register_content = req.param('register_content');
        if (!register_id_school || register_id_school === '' || register_id_school < 1) {
            res.json({
                status: 'error',
                message: 'Mã số sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_content || register_content === '') {
            res.json({
                status: 'error',
                message: 'Nội dung nhập phiếu đăng ký không hợp lệ'
            })
            return;
        }
        Students.findOne({ stu_id_school: register_id_school }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Registers.create({ register_id_school, register_content, register_status: 'enable' }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: 'Gửi phiếu đăng ký thành công',
                            register: created
                        })
                    }
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Mã số sinh viên bạn nhập vào không hợp lệ'
                })
                return;
            }
        })

    },
    disable_register: function (req, res) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'namtrung18101996@gmail.com',
                pass: 'ntrung1996'
            }
        });
        var register_id = req.param('register_id');
        if (!register_id || register_id === '' || register_id < 1) {
            res.json({
                status: 'error',
                message: 'register_id không hợp lệ'
            })
        }
        Registers.findOne({ register_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Students.findOne({ stu_id_school: find.register_id_school }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        var email = find.stu_email;
                        var name = find.stu_name;
                        console.log(email);
                        console.log(name);
                        Registers.update({ register_id }, { register_status: 'disable' }).exec(function (err, updated) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (updated) {
                                res.json({
                                    status: 'success',
                                    message: 'Đã duyệt',
                                })
                                // console.log(find.register_mail);
                                // console.log(updated.register_name);
                                // return;
                                var mailOptions = {
                                    from: 'namtrung18101996@gmail.com',
                                    to: email,
                                    subject: 'Đăng ký phòng ký túc xá Hutech',
                                    html: '<h2>Chào bạn ' + name + ' <h2></br><h2>Chúng tôi đã nhận được về nhu cầu đăng ký phòng ký túc xá Hutech</h2></br><h4>Bạn hãy đến văn phòng ký túc xá để làm thủ thục trước 10 ngày kể từ ngày nhận mail bạn nhé!<h4></br><h2>Người gửi: Nam Trung<h2>'
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Gửi mail cho sinh viên thành công');
                                    }
                                });
                            }
                        })
                    }
                })
            }
        })
    },
    del_register: function (req, res) {
        var register_id = req.param('register_id');
        if (!register_id || register_id === '' || register_id < 1) {
            res.json({
                status: 'error',
                message: 'register_id không hợp lệ'
            })
        }
        Registers.findOne({ register_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Registers.destroy({ register_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa phiếu đăng ký thành công'
                    })
                    return;
                })
            }
        })
    },
    del_all: function (req, res) {
        Registers.destroy({ register_status: disable }).exec(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({
                status: 'success',
                message: 'Đã xóa tất cả phiếu đăng ký'
            })
        })
    },
    list_disable: function (req, res) {
        sql = "SELECT registers.register_id,registers.register_id_school, registers.register_content, registers.register_status, students.stu_id_school, students.stu_name, students.stu_sex, students.stu_phone, DATE_FORMAT(students.stu_birthday,'%d/%m/%Y') as stu_birthday, classes.class_name, faculties.fal_name, students.stu_email, students.stu_phone,DATE_FORMAT(registers.createdAt,'%d/%m/%Y') as createdAt FROM students, classes, faculties, registers WHERE registers.register_id_school = students.stu_id_school AND students.stu_id_class = classes.class_id AND faculties.fal_id = classes.class_id_faculty AND registers.register_status = 'disable'";
        Registers.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status:'success',
                    message:'GET danh sách phiếu chưa xem thành công',
                    list: results
                })
            }
        })
    },
    list_enable: function (req, res) {
        sql = "SELECT registers.register_id,registers.register_id_school, registers.register_content, registers.register_status, students.stu_id_school, students.stu_name, students.stu_sex, students.stu_phone, DATE_FORMAT(students.stu_birthday,'%d/%m/%Y') as stu_birthday, classes.class_name, faculties.fal_name, students.stu_email, students.stu_phone,DATE_FORMAT(registers.createdAt,'%d/%m/%Y') as createdAt FROM students, classes, faculties, registers WHERE registers.register_id_school = students.stu_id_school AND students.stu_id_class = classes.class_id AND faculties.fal_id = classes.class_id_faculty AND registers.register_status = 'enable'";
        Registers.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status:'success',
                    message:'GET danh sách phiếu chưa xem thành công',
                    list: results
                })
            }
        })
    }
};

