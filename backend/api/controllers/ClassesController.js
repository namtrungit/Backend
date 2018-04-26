/**
 * ClassesController
 *
 * @description :: Server-side logic for managing classes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_class: function (req, res) {
        var class_name = req.param('class_name'),
            class_id_faculty = req.param('class_id_faculty');
        if (!class_name || class_name === '') {
            res.json({
                status: 'error',
                message: 'class_name không hợp lệ'
            })
            return;
        }
        if (!class_id_faculty || class_id_faculty === '' || class_id_faculty < 1) {
            res.json({
                status: 'error',
                message: 'class_id_faculty không hợp lệ'
            })
            return;
        }
        Classes.findOne({ class_name }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'warning',
                    message: 'Lớp ' + class_name + ' đã có trong cơ sở dữ liệu',
                })
                return;
            }
            else {
                Classes.create({ class_name, class_id_faculty }).exec(function (err, created) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (created) {
                        res.json({
                            status: 'success',
                            message: 'Thêm lớp thành công',
                            class: created
                        })
                    }
                })
            }
        })
    },
    del_class: function (req, res) {
        var class_id = req.param('class_id');
        if (!class_id || class_id === '' || class_id < 1) {
            res.json({
                status: 'error',
                message: 'class_id không hợp lệ'
            })
        }
        Classes.findOne({ class_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Classes.destroy({ class_id }).exec(function (err) {
                    res.json({
                        status: 'success',
                        message: 'Xóa lớp thành công'
                    })
                })
                return;
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy class_id =' + class_id
                })
                return;
            }
        })
    },
    update_class: function (req, res) {
        var class_id = req.param('class_id'),
            class_name = req.param('class_name'),
            class_id_faculty = req.param('class_id_faculty');
        if (!class_id || class_id === '' || class_id < 1) {
            res.json({
                status: 'error',
                message: 'class_id không hợp lệ'
            })
            return;
        }
        if (!class_name || class_name === '') {
            res.json({
                status: 'error',
                message: 'class_name không hợp lệ'
            })
            return;
        }
        if (!class_id_faculty || class_id_faculty === '' || class_id_faculty < 1) {
            res.json({
                status: 'error',
                message: 'class_id_faculty không hợp lệ'
            })
            return;
        }
        Classes.findOne({ class_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Classes.update({ class_id }, { class_name, class_id_faculty }).exec(function (err, updated) {
                    if (err) {
                        res.json({
                            status: 'warning',
                            message: 'Đã có lớp ' + class_name+' trong cơ sở dữ liệu'
                        })
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật lớp thành công',
                            class: updated
                        })
                    }
                })
            } else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy class_id =' + class_id
                })
                return;
            }
        })
    },
    list_class: function (req, res) {
        var sql = 'SELECT class_id, class_name, faculties.fal_id, faculties.fal_name FROM classes LEFT JOIN faculties on classes.class_id_faculty = faculties.fal_id';
        Classes.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if(results){
                res.json({
                    status:'success',
                    message:'GET danh sách lớp thành công',
                    Classes: results
                })
                return;
            }
        })
    }
};

