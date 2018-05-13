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
            register_name = req.param('register_name'),
            register_sex = req.param('register_sex'),
            register_birthday = req.param('register_birthday'),
            register_class = req.param('register_class'),
            register_faculty = req.param('register_faculty'),
            register_phone = req.param('register_phone'),
            register_mail = req.param('register_mail');
        if (!register_id_school || register_id_school === '' || register_id_school < 1) {
            res.json({
                status: 'error',
                message: 'Mã số sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_name || register_name === '') {
            res.json({
                status: 'error',
                message: 'Tên sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_sex || register_sex === '') {
            res.json({
                status: 'error',
                message: 'Giới tính sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_birthday || register_birthday === '') {
            res.json({
                status: 'error',
                message: 'Ngày của sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_class || register_class === '') {
            res.json({
                status: 'error',
                message: 'Lớp của sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_faculty || register_faculty === '') {
            res.json({
                status: 'error',
                message: 'Khoa của sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_phone || register_phone === '' || register_phone.length > 12) {
            res.json({
                status: 'error',
                message: 'SDT của sinh viên không hợp lệ'
            })
            return;
        }
        if (!register_mail || register_mail === '') {
            res.json({
                status: 'error',
                message: 'Email của sinh viên không hợp lệ'
            })
            return;
        }
        let bd = register_birthday.split('/')[2] + "-" + register_birthday.split('/')[1] + "-" + register_birthday.split('/')[0]; // ['dd','mm','yyyy'] hàm cắt
        //console.log('Đã format'+moment(bd).format('YYYY-MM-DD'));
        register_birthday = moment(bd).format('YYYY-MM-DD');
        Registers.create({
            register_id_school,
            register_name,
            register_sex,
            register_birthday,
            register_class,
            register_faculty,
            register_phone,
            register_mail,
            register_status: 'enable'
        }).exec(function (err, created) {
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
                // console.log(find.register_mail);
                // return;
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
                            to: find.register_mail,
                            subject: 'Đăng ký phòng ký túc xá Hutech',
                            html: '<h2>Chào bạn ' + find.register_name + ' <h2></br><h2>Chúng tôi đã nhận được về nhu cầu đăng ký phòng ký túc xá Hutech</h2></br><h4>Bạn hãy đến văn phòng ký túc xá để làm thủ thục trước 10 ngày kể từ ngày nhận mail bạn nhé!<h4></br><h2>Người gửi: Nam Trung<h2>'
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
        Registers.find({ register_status: 'disable' }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status:'success',
                    message:'GET list disable thành công',
                    Registers: find
                })
            }
        })
    },
    list_enable: function (req, res) {
        Registers.find({ register_status: 'enable' }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status:'success',
                    message:'GET list enable thành công',
                    Registers: find
                })
            }
        })
    }
};

