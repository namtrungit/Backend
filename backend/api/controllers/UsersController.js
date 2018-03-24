/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('../services/jsonwebtoken');
var bcrypt = require('bcryptjs');
module.exports = {
    user_create: function (req, res) {
        var user_email = req.param('user_email');
        var user_password = req.param('user_password');
        if (!user_email || user_email === null) {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập email'
            })
        }
        if (!user_password || user_password === "") {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập mật khẩu'
            })
        }
        Users.findOne({ user_email: user_email }).exec(function (err, find) {
            if (err) {
                console.log(err);
            }
            if (find) {
                return res.json({
                    status: 'error',
                    message: 'Email đã tồn tại'
                })
            }
            else {
                Users.create({ user_email: user_email, user_password: user_password }).exec(function (err, created) {
                    if (err) {
                        return console.log(err);
                    }
                    if (created) {
                        return res.json({
                            status: 'Success',
                            message: 'Tạo tài khoản thành công',
                            user: created
                        })
                    }
                })
            }
        })
    },
    login: function (req, res) {
        var user_email = req.param('user_email'),
            user_password = req.param('user_password')
        if (!user_email || user_email === "") {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập email'
            })
        }
        if (!user_password || user_password === "") {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập mật khẩu'
            })
        }
        Users.findOne({ user_email: user_email }).exec(function (err, find) {
            if (err) {
                return console.log(err);
            }
            if (find) {
                Users.comparePassword(user_password, find, function (err, valid) {
                    if (err) {
                        return console.log(err)
                    }
                    if (valid) {
                        res.json({
                            status: 'success',
                            message: 'Đăng nhập thành công',
                            token: jwt.encode(find.user_id)
                        })
                    }
                    else {
                        return res.json({
                            status: 'error',
                            message: 'Sai mật khẩu'
                        })
                    }
                })
            } else {
                return res.json({
                    status: 'error',
                    message: 'Email không đúng'
                })
            }
        })
    },
    user_profile: function (req, res) {
        var user_id = req.headers.authID;
        if (!user_id || user_id === "") {
            return res.json({
                status: 'error',
                message: 'ID không hợp lệ'
            })
        }
        Users.findOne({ user_id: user_id }).exec(function (err, find) {
            if (err) {
                return console.log(err);
            }
            if (find) {
                return res.json({
                    status: 'success',
                    message: 'Tìm thấy, get profile thành công',
                    user: find
                })
            }
            else {
                return res.json({
                    status: 'error',
                    message: 'Không tìm thấy id ' + user_id
                })
            }
        })
    },
    user_update: function (req, res) {
        var user_id = req.param('user_id'),
            update_email = req.param('update_email'),
            user_name = req.param('user_name'),
            user_birthday = req.param('user_birthday'),
            user_address = req.param('user_address'),
            user_sex = req.param('user_sex'),
            user_position = req.param('user_position')
        if (!user_id || user_id === "") {
            return res.json({
                status: 'error',
                message: 'ID không hợp lệ'
            })
        }
        if (update_email && update_email != "") {
            Users.findOne({ user_email: update_email, user_id: user_id }).exec(function (err, find) {
                if (err) {
                    return console.log(err);
                }
                if (find) {
                    Users.update({ user_id: user_id }, {
                        user_name: user_name,
                        user_birthday: user_birthday,
                        user_address: user_address,
                        user_sex: user_sex,
                        user_position: user_position
                    }).exec(function (err, updated) {
                        if (err) {
                            console.log('here');
                            return console.log(err)
                        }
                        if (updated) {
                            return res.json({
                                status: 'success',
                                message: 'Cập nhật thành công'
                            })
                        }
                    })
                } else {
                    //Không tìm thấy email thì cho phép cập nhật
                    Users.update({ user_id: user_id }, {
                        user_name: user_name,
                        user_email: update_email,
                        user_birthday: user_birthday,
                        user_address: user_address,
                        user_sex: user_sex,
                        user_position: user_position
                    }).exec(function (err, updated) {
                        if (err) {
                            return res.json({
                                status: 'error',
                                message: 'Email ' + update_email + ' đã tồn tại!'
                            })
                        }
                        if (updated) {
                            return res.json({
                                status: 'success',
                                message: 'Cập nhật thành công'
                            })
                        }
                    })
                }
            })
        } else {
            Users.findOne({ user_id: user_id }).exec(function (err, find) {
                if (err) {
                    return console.log(err)
                }
                if (find) {
                    Users.update({ user_id: user_id }, {
                        user_name: user_name,
                        user_birthday: user_birthday,
                        user_address: user_address,
                        user_sex: user_sex,
                        user_position: user_position
                    }).exec(function (err, updated) {
                        if (err) {
                            return console.log(err)
                        }
                        if (updated) {
                            return res.json({
                                status: 'success',
                                message: 'Cập nhật thành công'
                            })
                        }
                    })
                }
            })
        }
    },
    user_delete: function (req, res) {
        var user_id = req.param('user_id');
        if (!user_id || user_id === '' || user_id === 0) {
            return res.json({
                status: 'error',
                message: 'ID khong hop le'
            });
        }
        Users.findOne({ user_id: user_id }).exec(function (err, find) {
            if (err) { return console.log(err) }
            if (find) {
                //Dieu kien xoa
                Users.destroy({ user_id: user_id }).exec(function (err) {
                    if (err) { return console.log(err) }
                    return res.json({
                        status: 'success',
                        message: 'Xoa user thanh cong'
                    })
                });
            } else {
                return res.json({
                    status: 'error',
                    message: 'Khong tim thay user voi ID: ' + user_id
                })
            }
        })
    },
};

