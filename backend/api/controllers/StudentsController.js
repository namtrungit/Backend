/**
 * StudentsController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const moment = require('moment');
module.exports = {
    stu_create: function (req, res) {
        var stu_id_school = req.param('stu_id_school'),
            stu_name = req.param('stu_name'),
            stu_email = req.param('stu_email'),
            stu_sex = req.param('stu_sex'),
            stu_birthday = req.param('stu_birthday'),
            stu_address = req.param('stu_address'),
            stu_phone = req.param('stu_phone'),
            stu_dad_name = req.param('stu_dad_name'),
            stu_dad_phone = req.param('stu_dad_phone'),
            stu_mom_name = req.param('stu_mom_name'),
            stu_mom_phone = req.param('stu_mom_phone'),
            stu_id_class = req.param('stu_id_class'),
            stu_avatar = req.param('stu_avatar');
        if (!stu_id_school || stu_id_school === '') {
            return res.json({
                status: 'error',
                message: 'stu_id_school không hợp lệ'
            })
        }

        if (!stu_name || stu_name === '') {
            return res.json({
                status: 'error',
                message: 'stu_name không hợp lệ'
            })
        }
        if (!stu_email || stu_email === '') {
            return res.json({
                status: 'error',
                message: 'stu_email không hợp lệ'
            })
        }
        if (!stu_sex || stu_sex === '') {
            return res.json({
                status: 'error',
                message: 'stu_sex không hợp lệ'
            })
        }
        if (!stu_birthday || stu_birthday === '') {
            return res.json({
                status: 'error',
                message: 'stu_birthday không hợp lệ'
            })
        }
        if (!stu_address || stu_address === '') {
            return res.json({
                status: 'error',
                message: 'stu_address không hợp lệ'
            })
        }
        if (!stu_phone || stu_phone === '') {
            return res.json({
                status: 'error',
                message: 'stu_phone không hợp lệ'
            })
        }
        if (!stu_dad_name || stu_dad_name === '') {
            return res.json({
                status: 'error',
                message: 'stu_dad_name không hợp lệ'
            })
        }
        if (!stu_dad_phone || stu_dad_phone === '') {
            return res.json({
                status: 'error',
                message: 'stu_dad_phone không hợp lệ'
            })
        }
        if (!stu_mom_name || stu_mom_name === '') {
            return res.json({
                status: 'error',
                message: 'stu_mom_name không hợp lệ'
            })
        }
        if (!stu_mom_phone || stu_mom_phone === '') {
            return res.json({
                status: 'error',
                message: 'stu_mom_phone không hợp lệ'
            })
        }
        if (!stu_id_class || stu_id_class === '' || stu_id_class < 1) {
            return res.json({
                status: 'error',
                message: 'stu_class_id không hợp lệ'
            })
        }
        if (!stu_avatar || stu_avatar === '') {
            return res.json({
                status: 'error',
                message: 'stu_avatar không hợp lệ'
            })
        }
        let bd = stu_birthday.split('/')[2] + "-" + stu_birthday.split('/')[1] + "-" + stu_birthday.split('/')[0]; // ['dd','mm','yyyy'] hàm cắt
        //console.log('Đã format'+moment(bd).format('YYYY-MM-DD'));
        stu_birthday = moment(bd).format('YYYY-MM-DD');
        Students.findOne({ stu_id_school }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'warning',
                    message: 'Mã sinh viên ' + stu_id_school + ' đã có trong csdl'
                })
                return;
            }
            else {
                Students.create({
                    stu_id_school,
                    stu_name,
                    stu_email,
                    stu_sex,
                    stu_birthday,
                    stu_address,
                    stu_phone,
                    stu_dad_name,
                    stu_dad_phone,
                    stu_mom_name,
                    stu_mom_phone,
                    stu_id_class,
                    stu_avatar,
                    stu_room_name: ''
                }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        return res.json({
                            status: 'success',
                            message: 'Thêm sinh viên thành công',
                            student: created
                        })
                    }
                })
            }
        })
    },
    stu_update: function (req, res) {
        var stu_id = req.param('stu_id'),
            update_id_school = req.param('update_id_school'),
            stu_name = req.param('stu_name'),
            stu_email = req.param('stu_email'),
            stu_sex = req.param('stu_sex'),
            stu_birthday = req.param('stu_birthday'),
            stu_address = req.param('stu_address'),
            stu_phone = req.param('stu_phone'),
            stu_dad_name = req.param('stu_dad_name'),
            stu_dad_phone = req.param('stu_dad_phone'),
            stu_mom_name = req.param('stu_mom_name'),
            stu_mom_phone = req.param('stu_mom_phone'),
            stu_id_class = req.param('stu_id_class'),
            stu_avatar = req.param('stu_avatar');
        if (!stu_id || stu_id === '' || stu_id < 1) {
            return res.json({
                status: 'error',
                message: 'stu_id không hợp lệ'
            })
        }
        if (!update_id_school || update_id_school === '') {
            return res.json({
                status: 'error',
                message: 'update_id_school không hợp lệ'
            })
        }
        if (!stu_name || stu_name === '') {
            return res.json({
                status: 'error',
                message: 'stu_name không hợp lệ'
            })
        }
        if (!stu_email || stu_email === '') {
            return res.json({
                status: 'error',
                message: 'stu_email không hợp lệ'
            })
        }
        if (!stu_sex || stu_sex === '') {
            return res.json({
                status: 'error',
                message: 'stu_sex không hợp lệ'
            })
        }
        if (!stu_birthday || stu_birthday === '') {
            return res.json({
                status: 'error',
                message: 'stu_birthday không hợp lệ'
            })
        }
        if (!stu_address || stu_address === '') {
            return res.json({
                status: 'error',
                message: 'stu_address không hợp lệ'
            })
        }
        if (!stu_phone || stu_phone === '') {
            return res.json({
                status: 'error',
                message: 'stu_phone không hợp lệ'
            })
        }
        if (!stu_dad_name || stu_dad_name === '') {
            return res.json({
                status: 'error',
                message: 'stu_dad_name không hợp lệ'
            })
        }
        if (!stu_dad_phone || stu_dad_phone === '') {
            return res.json({
                status: 'error',
                message: 'stu_dad_phone không hợp lệ'
            })
        }
        if (!stu_mom_name || stu_mom_name === '') {
            return res.json({
                status: 'error',
                message: 'stu_mom_name không hợp lệ'
            })
        }
        if (!stu_mom_phone || stu_mom_phone === '') {
            return res.json({
                status: 'error',
                message: 'stu_mom_phone không hợp lệ'
            })
        }
        if (!stu_id_class || stu_id_class === '' || stu_id_class < 1) {
            return res.json({
                status: 'error',
                message: 'stu_class_id không hợp lệ'
            })
        }
        if (!stu_avatar || stu_avatar === '') {
            return res.json({
                status: 'error',
                message: 'stu_avatar không hợp lệ'
            })
        }
        console.log(1);
        let bd = stu_birthday.split('/')[2] + "-" + stu_birthday.split('/')[1] + "-" + stu_birthday.split('/')[0]; // ['dd','mm','yyyy'] hàm cắt
        //console.log('Đã format'+moment(bd).format('YYYY-MM-DD'));
        stu_birthday = moment(bd).format('YYYY-MM-DD');
        if (update_id_school || update_id_school != '') {
            //có nhập id_school
            Students.findOne({ stu_id_school: update_id_school }).exec(function (err, find) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (find) {
                    // console.log('Có trong csdl');
                    Students.update({ stu_id }, {
                        stu_name,
                        stu_email,
                        stu_sex,
                        stu_birthday,
                        stu_address,
                        stu_phone,
                        stu_dad_name,
                        stu_dad_phone,
                        stu_mom_name,
                        stu_mom_phone,
                        stu_id_class,
                        stu_avatar,
                    }).exec(function (err, updated) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (updated) {
                            res.json({
                                status: 'warning',
                                message: 'Mã sinh viên' + update_id_school + ' đã tồn tại'
                            })
                        }
                    })
                } else {
                    // console.log('Không có trong csdl');
                    Students.update({ stu_id }, {
                        stu_id_school: update_id_school,
                        stu_name,
                        stu_email,
                        stu_sex,
                        stu_birthday,
                        stu_address,
                        stu_phone,
                        stu_dad_name,
                        stu_dad_phone,
                        stu_mom_name,
                        stu_mom_phone,
                        stu_id_class,
                        stu_avatar,
                    }).exec(function (err, updated) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (updated) {
                            res.json({
                                status: 'success',
                                message: 'Cập nhật sinh viên thành công'
                            })
                        }
                    })
                }
            })
        }
    },
    stu_del: function (req, res) {
        var stu_id = req.param('stu_id'),
            room_name = req.param('room_name'), room_empty;
        if (!stu_id || stu_id === "" || stu_id < 1) {
            return res.json({
                status: 'error',
                message: 'stu_id không hợp lệ'
            })
        }
        if (room_name === '') {
            // Không có room_id
            console.log('Không có room_id')
            // return;
            Students.findOne({ stu_id }).exec(function (err, find) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (find) {
                    Students.destroy({ stu_id }).exec(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        res.json({
                            status: 'success',
                            message: 'Xóa sinh viên thành công'
                        })
                    })
                }
            })
        }
        else {
            // Có room_id
            console.log('Có room_id');
            console.log(room_name);
            // return;
            Rooms.findOne({ room_name }).exec(function (err, find) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (find) {
                    room_empty = find.room_empty;
                    room_empty++;
                    console.log(room_empty);
                    Students.findOne({ stu_id }).exec(function (err, find) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (find) {
                            Students.destroy({ stu_id }).exec(function (err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                res.json({
                                    status: 'success',
                                    message: 'Xóa sinh viên thành công'
                                })
                                Rooms.update({ room_name }, { room_empty }).exec(function (err, updated) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (updated) {
                                        console.log('Cập nhật sl phòng thành công')
                                    }
                                })
                            })
                        }
                    })
                }
            })
        }

    },
    stu_list: function (req, res) {
        var sql = "SELECT students.stu_id, students.stu_id_school,students.stu_name,students.stu_email,students.stu_sex,DATE_FORMAT(stu_birthday,'%d/%m/%Y') as stu_birthday,students.stu_id_class, students.stu_address,students.stu_phone,students.stu_dad_name,students.stu_dad_phone,students.stu_mom_name,students.stu_mom_phone,students.stu_avatar,faculties.fal_name,classes.class_name FROM students LEFT JOIN classes on students.stu_id_class = classes.class_id , faculties WHERE faculties.fal_id = classes.class_id_faculty"
        Students.query(sql, function (err, results) {
            if (err) {
                return console.log(err);
            }
            if (results) {
                return res.json({
                    status: 'success',
                    message: 'GET danh sách sinh viên thành công',
                    list: results
                })
            }
        })
    },
    stu_list_in_room: function (req, res) {
        var room_name = req.param('room_name')
        var sql = "SELECT students.stu_id_school, students.stu_name, students.stu_phone, students.stu_sex, DATE_FORMAT(students.stu_birthday, '%d/%m/%Y') as stu_birthday FROM contracts LEFT JOIN students ON contracts.contract_id_stu_school = students.stu_id_school LEFT JOIN rooms ON contracts.contract_room_name = rooms.room_name WHERE rooms.room_name = '" + room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
        Students.query(sql, function (err, results) {
            if (err) {
                return console.log(err);
            }
            if (results) {
                return res.json({
                    status: 'success',
                    message: 'GET danh sách sinh viên theo phòng thành công',
                    list: results
                })
            }
        })
    },
    stu_upload_avatar: function (req, res) {
        req.file('avatar').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/students')
        }, function (err, uploadedFiles) {
            if (err) return console.log(err);
            if (uploadedFiles.length > 0) {
                var avatar = require('path').basename(uploadedFiles[0].fd);
                return res.json({
                    status: 'success',
                    message: 'Upload avatar thành công',
                    avatar: avatar
                });
            }
        });
    },
    pick_room: function (req, res) {
        var stu_id = req.param('stu_id'),
            room_name = req.param('room_name'),
            room_empty,
            area_sex;
        if (!stu_id || stu_id === '' || stu_id < 1) {
            res.json({
                status: 'error',
                message: 'stu_id không hợp lệ'
            })
            return;
        }
        if (!room_name || room_name === '') {
            res.json({
                status: 'error',
                message: 'room_name không hợp lệ'
            })
            return;
        }
        Rooms.findOne({ room_name }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                if (find.room_empty === 0) {
                    res.json({
                        status: 'warning',
                        message: 'Phòng này không còn chỗ trống'
                    })
                    return;
                }
                else if (find.room_empty !== 0) {
                    room_empty = find.room_empty;
                    room_empty--;
                    // console.log(room_empty);
                    sql = 'SELECT areas.area_sex FROM rooms LEFT JOIN areas ON rooms.room_id_area = areas.area_id WHERE room_name = "' + room_name + '"';
                    Rooms.query(sql, function (err, results) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (results) {
                            area_sex = results[0].area_sex;
                            // console.log(area_sex);
                            Students.findOne({ stu_id }).exec(function (err, find) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (!find) {
                                    res.json({
                                        status: 'warning stu_id undefined',
                                        message: 'Không tìm thấy ID của sinh viên bạn nhập vào'
                                    })
                                    return;
                                }
                                if (find.stu_sex != area_sex) {
                                    res.json({
                                        status: 'warning sex',
                                        message: 'Sai giới tính khu'
                                    })
                                    return;
                                }
                                if (find.stu_room_name !== '') {
                                    res.json({
                                        status: 'warning',
                                        message: 'Sinh viên này đã có phòng rồi'
                                    })
                                    return;
                                }
                                else {
                                    Students.update({ stu_id }, { stu_room_name: room_name }).exec(function (err, updated) {
                                        if (err) {
                                            console.log(err);
                                            return;
                                        }
                                        if (updated) {
                                            res.json({
                                                status: 'success',
                                                message: 'Chọn phòng cho sinh viên thành công'
                                            })
                                            Rooms.update({ room_name }, { room_empty }).exec(function (err, updated) {
                                                if (err) {
                                                    console.log(err);
                                                    return;
                                                }
                                                if (updated) {
                                                    console.log(updated)
                                                    return;
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else {
                res.json({
                    status: 'warning find room',
                    message: 'Ký túc xá hiện không có phòng ' + room_name
                })
            }
        })
    },
    swap_room: function (req, res) {
        var stu_id = req.param('stu_id'),
            old_room_name = req.param('old_room_name'),
            new_room_name = req.param('new_room_name'),
            old_room_empty, new_room_empty,
            area_sex;
        if (new_room_name === old_room_name) {
            res.json({
                status: 'same',
                message: 'Sinh viên này hiện đang ở phòng ' + new_room_name
            })
            return;
        }
        if (!stu_id || stu_id === '' || stu_id < 1) {
            res.json({
                status: 'error',
                message: 'stu_id không hợp lệ'
            })
            return;
        }
        if (!old_room_name || old_room_name === '') {
            res.json({
                status: 'warning stu cant swap',
                message: 'Sinh viên này chưa có phòng không thể sử dụng chức năng này'
            })
            return;
        }
        if (!new_room_name || new_room_name === '') {
            res.json({
                status: 'error',
                message: 'new_room_name không hợp lệ'
            })
            return;
        }
        Rooms.findOne({ room_name: old_room_name }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                // console.log(find);
                old_room_empty = find.room_empty;
                old_room_empty++;
                // console.log(old_room_empty);
            }
        })
        Rooms.findOne({ room_name: new_room_name }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                // console.log(find);
                new_room_empty = find.room_empty;
                new_room_empty--;
                if (find.room_empty === 0) {
                    res.json({
                        status: 'warning',
                        message: 'Phòng này không còn chỗ trống'
                    })
                    return;
                }
                // console.log(new_room_empty);  
                //Kiểm tra giới tính
                sql = 'SELECT areas.area_sex FROM rooms LEFT JOIN areas ON rooms.room_id_area = areas.area_id WHERE room_name = "' + new_room_name + '"';
                Rooms.query(sql, function (err, results) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results) {
                        area_sex = results[0].area_sex;
                        // console.log(area_sex);
                        Students.findOne({ stu_id }).exec(function (err, find) {

                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (!find) {
                                res.json({
                                    status: 'warning stu_id undefined',
                                    message: 'Không tìm thấy ID của sinh viên bạn nhập vào'
                                })
                                return;
                            }
                            if (find) {
                                // Thiếu kiểm tra khu đó có cùng giới tính vs sinh viên hay không
                                if (find.stu_sex != area_sex) {
                                    res.json({
                                        status: 'warning sex',
                                        message: 'Sai giới tính khu'
                                    })
                                    return;
                                }
                                else {
                                    Students.update({ stu_id }, { stu_room_name: new_room_name }).exec(function (err, updated) {
                                        if (err) {
                                            console.log(err);
                                            return;
                                        }
                                        if (updated) {
                                            res.json({
                                                status: 'success',
                                                message: 'Thay đổi phòng cho sinh viên thành công'
                                            })
                                            Rooms.update({ room_name: old_room_name }, { room_empty: old_room_empty }).exec(function (err, updated) {
                                                if (err) {
                                                    console.log(err);
                                                    return;
                                                }
                                                if (updated) {
                                                    return console.log(updated);
                                                }
                                            })
                                            Rooms.update({ room_name: new_room_name }, { room_empty: new_room_empty }).exec(function (err, updated) {
                                                if (err) {
                                                    console.log(err);
                                                    return;
                                                }
                                                if (updated) {
                                                    return console.log(updated);
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
            else {
                res.json({
                    status: 'warning find room',
                    message: 'Ký túc xá hiện không có phòng ' + new_room_name
                })
                return;
            }
        })
    },
    end_room: function (req, res) {
        var stu_id = req.param('stu_id'),
            room_name = req.param('room_name'), room_empty;
        if (!stu_id || stu_id === '') {
            res.json({
                status: 'error',
                message: 'stu_id không hợp lệ'
            })
            return;
        }
        if (!room_name || room_name === '') {
            res.json({
                status: 'error',
                message: 'room_name không hợp lệ'
            })
            return;
        }
        Rooms.findOne({ room_name }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                room_empty = find.room_empty;
                room_empty++;
                console.log(room_empty);
                Students.findOne({ stu_id }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        Students.update({ stu_id }, { stu_room_name: '' }).exec(function (err, updated) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (updated) {
                                res.json({
                                    status: 'success',
                                    message: 'Xóa sinh viên khỏi phòng thành công'
                                })
                                Rooms.update({ room_name }, { room_empty }).exec(function (err, updated) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (updated) {
                                        console.log(updated);
                                        return;
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    search_stu: function (req, res) {
        var stu_id_school = req.param('stu_id_school'),
            stu_name = req.param('stu_name'),
            sql;
        if (!stu_id_school && stu_name) {
            // console.log(1);
            sql = "SELECT students.stu_id, students.stu_id_school,students.stu_name,students.stu_email,students.stu_sex,DATE_FORMAT(stu_birthday,'%d/%m/%Y') as stu_birthday,students.stu_room_name,students.stu_id_class, students.stu_address,students.stu_phone,students.stu_dad_name,students.stu_dad_phone,students.stu_mom_name,students.stu_mom_phone,students.stu_avatar,faculties.fal_name,classes.class_name,rooms.room_name FROM students LEFT JOIN classes on students.stu_id_class = classes.class_id LEFT JOIN rooms on students.stu_room_name = rooms.room_name, faculties WHERE faculties.fal_id = classes.class_id_faculty AND students.stu_name LIKE '%" + stu_name + "%'";
        }
        else if (!stu_name && stu_id_school) {
            // console.log(2);
            sql = "SELECT students.stu_id, students.stu_id_school,students.stu_name,students.stu_email,students.stu_sex,DATE_FORMAT(stu_birthday,'%d/%m/%Y') as stu_birthday,students.stu_room_name,students.stu_id_class, students.stu_address,students.stu_phone,students.stu_dad_name,students.stu_dad_phone,students.stu_mom_name,students.stu_mom_phone,students.stu_avatar,faculties.fal_name,classes.class_name,rooms.room_name FROM students LEFT JOIN classes on students.stu_id_class = classes.class_id LEFT JOIN rooms on students.stu_room_name = rooms.room_name, faculties WHERE faculties.fal_id = classes.class_id_faculty AND students.stu_id_school = " + stu_id_school + "";
        }
        else if (!stu_id_school && !stu_name) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa điền thông tin để tìm kiếm'
            })
            // console.log(3);
            return;
        }
        else {
            // console.log(4);
            sql = "SELECT students.stu_id, students.stu_id_school,students.stu_name,students.stu_email,students.stu_sex,DATE_FORMAT(stu_birthday,'%d/%m/%Y') as stu_birthday,students.stu_room_name,students.stu_id_class, students.stu_address,students.stu_phone,students.stu_dad_name,students.stu_dad_phone,students.stu_mom_name,students.stu_mom_phone,students.stu_avatar,faculties.fal_name,classes.class_name,rooms.room_name FROM students LEFT JOIN classes on students.stu_id_class = classes.class_id LEFT JOIN rooms on students.stu_room_name = rooms.room_name, faculties WHERE faculties.fal_id = classes.class_id_faculty AND students.stu_name LIKE '%" + stu_name + "%' and students.stu_id_school = " + stu_id_school + "";
        }
        Students.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_stu tìm kiếm thành công',
                    list: results
                })
                return;
            }
        })
    },
    textcheck_stu: function (req, res) {
        var stu_id_school = req.param('stu_id_school');
        console.log(stu_id_school);
        sql = "SELECT students.stu_id_school FROM students WHERE students.stu_id_school like '" + stu_id_school + "%'";
        Students.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET mã số sinh viên trên textbox thành công',
                    id: results
                })
            }
        })
    },
    list_id_stu: function (req, res) {
        sql = "SELECT students.stu_id_school FROM students";
        Students.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list id_stu thành công',
                    list_id: results
                })
                return;
            }
        })
    }
};

