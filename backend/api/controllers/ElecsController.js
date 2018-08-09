/**
 * ElecsController
 *
 * @description :: Server-side logic for managing Elecs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_elec: function (req, res) {
        var elec_id = req.param('elec_id'),
            elec_room = req.param('elec_room'),
            elec_month = req.param('elec_month'),
            elec_amount = req.param('elec_amount'),
            elec_total = req.param('elec_total'),
            elec_creater = req.param('elec_creater');
        if (!elec_id || elec_id === '') {
            res.json({
                status: 'error',
                message: 'elec_id không hợp lệ'
            })
            return;
        }
        if (!elec_room || elec_room === '') {
            res.json({
                status: 'error',
                message: 'elec_room không hợp lệ'
            })
            return;
        }
        if (!elec_month || elec_month === '') {
            res.json({
                status: 'error',
                message: 'elec_month không hợp lệ'
            })
            return;
        }
        if (!elec_amount || elec_amount === '' || elec_amount < 1) {
            res.json({
                status: 'error',
                message: 'elec_amount không hợp lệ'
            })
            return;
        }
        if (!elec_total || elec_total === '' || elec_total < 1) {
            res.json({
                status: 'error',
                message: 'elec_total không hợp lệ'
            })
            return;
        }
        if (!elec_creater || elec_creater === '') {
            res.json({
                status: 'error',
                message: 'elec_creater không hợp lệ'
            })
            return;
        }
        let bd = elec_month.split('-')[1] + "-" + elec_month.split('-')[0];
        elec_month = bd;
        Rooms.findOne({ room_name: elec_room }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Elecs.findOne({ elec_room, elec_month }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        res.json({
                            status: 'warning',
                            message: 'Phòng ' + elec_room + ' đã có phiếu điện cho tháng này rồi.'
                        })
                        return;
                    }
                    else {
                        Elecs.create({ elec_id, elec_room, elec_month, elec_amount, elec_total, elec_status: 'enable', elec_creater }).exec(function (err, created) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (created) {
                                res.json({
                                    status: 'success',
                                    message: 'Thêm phiếu điện thành công',
                                    elec: created
                                })
                                return;
                            }
                        })
                    }
                })
            } else {
                res.json({
                    status: 'warning',
                    message: 'Không có phòng ' + elec_room + ' trong csdl'
                })
                return;
            }
        })
    },
    del_elec: function (req, res) {
        var elec_id = req.param('elec_id');
        if (!elec_id || elec_id === '') {
            res.json({
                status: 'error',
                message: 'elec_id không hợp lệ'
            })
            return;
        }
        Elecs.findOne({ elec_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Elecs.destroy({ elec_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa phiếu điện thành công'
                    })
                    return;
                })
            }
        })
    },
    update_elec: function (req, res) {
        var elec_id = req.param('elec_id'),
            elec_amount = req.param('elec_amount'),
            elec_total = req.param('elec_total');
        if (!elec_id || elec_id === '') {
            res.json({
                status: 'error',
                message: 'elec_id không hợp lệ'
            })
            return;
        }
        if (!elec_amount || elec_amount === '' || elec_amount < 1) {
            res.json({
                status: 'error',
                message: 'elec_amount không hợp lệ'
            })
            return;
        }
        if (!elec_total || elec_total === '' || elec_total < 1) {
            res.json({
                status: 'error',
                message: 'elec_total không hợp lệ'
            })
            return;
        }
        Elecs.findOne({ elec_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Elecs.update({ elec_id }, { elec_amount, elec_total }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật phiếu điện thành công'
                        })
                        return;
                    }
                })
            }
        })
    },
    get_elec_enable: function (req, res) {
        sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable' ORDER by elecs.createdAt DESC";
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET get_elec_emable thành công',
                    list: results
                })
                return;
            }
        })
    },
    get_elec_disable: function (req, res) {
        sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable' ORDER by elecs.createdAt DESC";
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET get_elec_disable thành công',
                    list: results
                })
                return;
            }
        })
    },
    get_list_elec_home: function (req, res) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (mm < 10) {
            month = "0" + mm + '-' + yyyy;
        }
        else {
            month = mm + '-' + yyyy;
        }
        // console.log(month);
        var area_id = req.param('area_id');
        if (!area_id || area_id === '' || area_id < 1) {
            res.json({
                status: 'warning',
                message: 'Ban chưa chọn khu để tìm kiếm'
            })
            return;
        }
        sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt, areas.area_sympol as createdAt FROM elecs, rooms, areas WHERE elecs.elec_month = '" + month + "' AND elecs.elec_room = rooms.room_name AND rooms.room_id_area = areas.area_id AND areas.area_id = " + area_id + " ORDER by elecs.elec_room ASC";
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_elec thành công',
                    list: results
                })
                console.log(results);
                return;
            }
        })
    },
    get_elec_month: function (req, res) {
        var month = req.param('month');
        // console.log(month);
        let bd = month.split('-')[1] + "-" + month.split('-')[0];
        month = bd;
        // console.log(a_month);
        // return;
        sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable' and elecs.elec_month  = '" + month + "' ORDER by elecs.createdAt DESC";
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET get_elec_emable thành công',
                    list: results
                })
                return;
            }
        })
    },
    get_elec_month_diable: function (req, res) {
        var month = req.param('month');
        // console.log(month);
        let bd = month.split('-')[1] + "-" + month.split('-')[0];
        month = bd;
        // console.log(a_month);
        // return;
        sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable' and elecs.elec_month  = '" + month + "' ORDER by elecs.createdAt DESC";
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET get_elec_emable thành công',
                    list: results
                })
                return;
            }
        })
    },
    check_disable: function (req, res) {
        var elec_id = req.param('elec_id');
        if (!elec_id || elec_id === '') {
            res.json({
                status: 'error',
                message: 'elec_id không hợp lệ'
            })
            return;
        }
        Elecs.findOne({ elec_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Elecs.update({ elec_id }, { elec_status: 'disable' }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Thanh toán phiếu điện thành công'
                        })
                        return;
                    }
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy ' + elec_id + ' trong cơ sở dữ liệu'
                })
                return;
            }
        })
    },
    check_enable: function (req, res) {
        var elec_id = req.param('elec_id');
        if (!elec_id || elec_id === '') {
            res.json({
                status: 'error',
                message: 'elec_id không hợp lệ'
            })
            return;
        }
        Elecs.findOne({ elec_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Elecs.update({ elec_id }, { elec_status: 'enable' }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Hoàn tác thành công'
                        })
                        return;
                    }
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy ' + elec_id + ' trong cơ sở dữ liệu'
                })
                return;
            }
        })
    },
    find_elec_disable: function (req, res) {
        var month = req.param('month'),
            elec_id = req.param('elec_id'),
            elec_room = req.param('elec_room');
        if (month && elec_id && elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable' and elecs.elec_month  = '" + month + "' AND elecs.elec_room = '" + elec_room + "' AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(1);
        }
        if (month && elec_id && !elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable' and elecs.elec_month  = '" + month + "'  AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(2);
        }
        if (month && !elec_id && elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable' and elecs.elec_month  = '" + month + "' AND elecs.elec_room = '" + elec_room + "'  ORDER by elecs.createdAt DESC";
            console.log(3);
        }
        if (month && !elec_id && !elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable' and elecs.elec_month  = '" + month + "'  ORDER by elecs.createdAt DESC";
            console.log(4);
        }
        if (!month && elec_id && elec_room) {
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable'  AND elecs.elec_room = '" + elec_room + "' AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(5);
        }
        if (!month && elec_id && !elec_room) {
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable'  AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(6);
        }
        if (!month && !elec_id && elec_room) {
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'disable'  AND elecs.elec_room = '" + elec_room + "' ORDER by elecs.createdAt DESC";
            console.log(7);
        }
        if (!month && !elec_id && !elec_room) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin đề tìm kiếm'
            })
            return;
        }
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'Tìm kiếm thành công',
                    list: results
                })
            }
        })
    },
    find_elec_enable: function (req, res) {
        var month = req.param('month'),
            elec_id = req.param('elec_id'),
            elec_room = req.param('elec_room');
        if (month && elec_id && elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable' and elecs.elec_month  = '" + month + "' AND elecs.elec_room = '" + elec_room + "' AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(1);
        }
        if (month && elec_id && !elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable' and elecs.elec_month  = '" + month + "'  AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(2);
        }
        if (month && !elec_id && elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable' and elecs.elec_month  = '" + month + "' AND elecs.elec_room = '" + elec_room + "'  ORDER by elecs.createdAt DESC";
            console.log(3);
        }
        if (month && !elec_id && !elec_room) {
            let bd = month.split('-')[1] + "-" + month.split('-')[0];
            month = bd;
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable' and elecs.elec_month  = '" + month + "'  ORDER by elecs.createdAt DESC";
            console.log(4);
        }
        if (!month && elec_id && elec_room) {
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable'  AND elecs.elec_room = '" + elec_room + "' AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(5);
        }
        if (!month && elec_id && !elec_room) {
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable'  AND elecs.elec_id = '" + elec_id + "' ORDER by elecs.createdAt DESC";
            console.log(6);
        }
        if (!month && !elec_id && elec_room) {
            sql = "SELECT elecs.elec_id, elecs.elec_room, elecs.elec_month, elecs.elec_amount, elecs.elec_total, elecs.elec_creater, elecs.elec_status, DATE_FORMAT(elecs.createdAt, '%d/%m/%Y') as createdAt FROM elecs WHERE elecs.elec_status = 'enable'  AND elecs.elec_room = '" + elec_room + "' ORDER by elecs.createdAt DESC";
            console.log(7);
        }
        if (!month && !elec_id && !elec_room) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin đề tìm kiếm'
            })
            return;
        }
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'Tìm kiếm thành công',
                    list: results
                })
            }
        })
    },
    chart_elec: function (req, res) {
        var year = req.param('year');
        if (!year || year === '' || year < 1 || year.length > 4) {
            res.json({
                status: 'warning',
                message: 'Năm bạn nhập vào không hợp lệ'
            })
            return;
        }
        var sql = "SELECT  MONTH(elecs.createdAt) as label, SUM(elecs.elec_total) as value FROM elecs WHERE YEAR(elecs.createdAt) = " + year + " AND elecs.elec_status = 'disable' GROUP BY label";
        Elecs.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET chart_elec thành công',
                    list: results
                })
            }
        })
    }
};

