/**
 * ContractsController
 *
 * @description :: Server-side logic for managing contracts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const moment = require('moment');
module.exports = {
    del_contract: function (req, res) {
        var contract_id = req.param('contract_id');
        if (!contract_id || contract_id === '' || contract_id < 1) {
            res.json({
                status: 'error',
                message: 'contract_id không hợp lệ'
            })
            return;
        }
        Contracts.findOne({ contract_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Contracts.destroy({ contract_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa hợp đồng thành công'
                    })
                    return;
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy contract_id ' + contract_id
                })
                return;
            }
        })
    },
    list_contract: function (req, res) {
        var sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end >= CURRENT_DATE AND contracts.contract_status = 'enable' ORDER BY contracts.createdAt DESC";
        Contracts.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                retrun;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_contract thành công',
                    Contracts: results
                })
            }
        })
    },
    contract_end_in_month: function (req, res) {
        var month_year = req.param('month_year')
        sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end like '" + month_year + "%' ORDER BY contracts.createdAt DESC"
        Contracts.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    Contracts: results
                })
                return;
            }
        })
    },
    test_contract: function (req, res) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);
        date = '2017-06-26';
        if (today > date) {
            console.log('its true');
        } else {
            console.log('false');
        }
    },
    list_contract_old: function (req, res) {
        sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE or contracts.contract_status = 'disable' ORDER BY contracts.createdAt DESC";
        Contracts.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'Get danh sách hợp đồng hết hạn thành công',
                    list: results
                })
                return;
            }
        })
    },
    find_contract_old: function (req, res) {
        var stu_name = req.param('stu_name'),
            contract_id = req.param('contract_id');
        if (stu_name && contract_id) {
            console.log(1);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE or contracts.contract_status = 'disable' AND students.stu_name like '%" + stu_name + "%' AND contracts.contract_id = '" + contract_id + "'";
        }
        if (!stu_name && contract_id) {
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE or contracts.contract_status = 'disable' AND contracts.contract_id = '" + contract_id + "'";
        }
        if (stu_name && !contract_id) {
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE or contracts.contract_status = 'disable' AND students.stu_name like '%" + stu_name + "%'";
        }
        if (!stu_name && !contract_id) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin gì đề tìm kiếm'
            })
            return;
        }
        Contracts.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'Tìm kiếm hợp đồng hết hạn thành công',
                    list: results
                })
                return
            }
        })
    },
    find_contract: function (req, res) {
        var stu_name = req.param('stu_name'),
            contract_id = req.param('contract_id');
        if (stu_name && contract_id) {
            console.log(1);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end > CURRENT_DATE AND contracts.contract_status = 'enable' AND students.stu_name like '%" + stu_name + "%' AND contracts.contract_id = '" + contract_id + "'";
        }
        if (!stu_name && contract_id) {
            console.log(2);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end > CURRENT_DATE AND contracts.contract_status = 'enable' AND contracts.contract_id = '" + contract_id + "'";
        }
        if (stu_name && !contract_id) {
            console.log(3);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end > CURRENT_DATE AND contracts.contract_status = 'enable' AND students.stu_name like '%" + stu_name + "%'";
        }
        if (!stu_name && !contract_id) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin gì đề tìm kiếm'
            })
            return;
        }
        Contracts.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'Tìm kiếm hợp đồng hết hạn thành công',
                    list: results
                })
                return
            }
        })
    },
    add_contract: function (req, res) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        var contract_id = req.param('contract_id'),
            contract_date_get_room = req.param('contract_date_get_room'),
            contract_room_name = req.param('contract_room_name'),
            contract_id_stu_school = req.param('contract_id_stu_school'),
            contract_id_recontract = req.param('contract_id_recontract'),
            contract_create = req.param('contract_create'),
            contract_total = 0;
        if (!contract_id || contract_id === '') {
            res.json({
                status: 'error',
                message: 'contract_id không hợp lệ'
            })
            return;
        }
        if (!contract_date_get_room || contract_date_get_room === '') {
            res.json({
                status: 'error',
                message: 'contract_date_get_room không hợp lệ'
            })
            return;
        }
        if (!contract_room_name || contract_room_name === '') {
            res.json({
                status: 'error',
                message: 'contract_room_name không hợp lệ'
            })
            return;
        }
        if (!contract_id_stu_school || contract_id_stu_school === '' || contract_id_stu_school < 1) {
            res.json({
                status: 'error',
                message: 'contract_id_stu_school không hợp lệ'
            })
            return;
        }
        if (!contract_id_recontract || contract_id_recontract === '' || contract_id_recontract < 1) {
            res.json({
                status: 'error',
                message: 'contract_id_recontract không hợp lệ'
            })
            return;
        }
        if (!contract_create || contract_create === '') {
            res.json({
                status: 'error',
                message: 'contract_create không hợp lệ'
            })
            return;
        }
        let dategr = contract_date_get_room.split('/')[2] + "-" + contract_date_get_room.split('/')[1] + "-" + contract_date_get_room.split('/')[0];
        contract_date_get_room = moment(dategr).format('YYYY-MM-DD');
        if (contract_date_get_room < today) {
            res.json({
                status: 'warning',
                message: 'Ngày nhận phỏng không hợp lệ'
            })
            return;
        }
        console.log('Ngày nhận phòng hợp lệ');
        Students.findOne({ stu_id_school: contract_id_stu_school }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                console.log("Mã sinh viên hợp lệ");
                sql = "SELECT COUNT(students.stu_id_school) as slhd FROM contracts LEFT JOIN students ON contracts.contract_id_stu_school = students.stu_id_school WHERE students.stu_id_school = " + contract_id_stu_school + " AND contracts.contract_date_end >= CURRENT_DATE AND contracts.contract_status = 'enable'";
                Students.query(sql, function (err, results) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results[0].slhd === 0) {
                        console.log('SL hợp đồng của sinh viên này hợp lệ');
                        Rooms.findOne({ room_name: contract_room_name }).exec(function (err, find) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (find) {
                                console.log('Phòng hợp lệ')
                                let price = find.room_price;
                                let succhua = find.room_max;
                                var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE AND contracts.contract_status = 'enable'";
                                Rooms.query(sql, function (err, results) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (results[0].sl < succhua) {
                                        console.log('Số lượng hiện tại của phòng hợp lệ');
                                        Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                            if (err) {
                                                console.log(err)
                                                return;
                                            }
                                            if (find) {
                                                limit = find.recontract_limit;
                                                promotion = find.recontract_promotion;
                                                console.log(find.recontract_limit);
                                                sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                Contracts.query(sql, function (err, results) {
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    if (results) {
                                                        console.log(results[0].contract_date_end);
                                                        contract_date_end = results[0].contract_date_end;
                                                        console.log('price =' + price);
                                                        console.log('limit =' + limit);
                                                        console.log('promotion =' + promotion);
                                                        contract_total = (price * limit * (100 - promotion)) / 100;
                                                        Contracts.create({
                                                            contract_id,
                                                            contract_date_get_room,
                                                            contract_date_end,
                                                            contract_room_name,
                                                            contract_id_stu_school,
                                                            contract_id_recontract,
                                                            contract_create,
                                                            contract_total,
                                                            contract_status: 'enable'
                                                        }).exec(function (err, created) {
                                                            if (err) {
                                                                console.log(err);
                                                                return;
                                                            }
                                                            if (created) {
                                                                res.json({
                                                                    status: 'success',
                                                                    message: 'Thêm hợp đồng thành công',
                                                                    Contract: created
                                                                })
                                                                return;
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                            else {
                                                res.json({
                                                    status: 'warning recontract',
                                                    message: 'Loại hợp đồng không hợp lệ'
                                                })
                                                return;
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            status: 'warning',
                                            message: 'Phòng ' + contract_room_name + ' đã đầy'
                                        })
                                        return;
                                    }
                                })
                            }
                            else {
                                res.json({
                                    status: 'warning room'
                                })
                                return;
                            }
                        })
                    }
                    else {
                        res.json({
                            status: 'warning',
                            message: 'Sinh viên này hiện tại đang có hợp đồng thuê phòng vẫn còn thời hạn tại ký túc xá'
                        })
                        return;
                    }
                })
            } else {
                res.json({
                    status: 'warning stu'
                })
            }
        })
    },
    update_contract: function (req, res) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        var contract_id = req.param('contract_id'),
            update_contract_date_get_room = req.param('update_contract_date_get_room'),
            contract_room_name = req.param('contract_room_name'),
            contract_id_stu_school = req.param('contract_id_stu_school'),
            contract_id_recontract = req.param('contract_id_recontract'),
            contract_create = req.param('contract_create'),
            contract_total = 0;
        if (!contract_id || contract_id === '') {
            res.json({
                status: 'error',
                message: 'contract_id không hợp lệ'
            })
            return;
        }
        if (!contract_room_name || contract_room_name === '') {
            res.json({
                status: 'error',
                message: 'contract_room_name không hợp lệ'
            })
            return;
        }
        if (!contract_id_stu_school || contract_id_stu_school === '' || contract_id_stu_school < 1) {
            res.json({
                status: 'error',
                message: 'contract_id_stu_school không hợp lệ'
            })
            return;
        }
        if (!contract_id_recontract || contract_id_recontract === '' || contract_id_recontract < 1) {
            res.json({
                status: 'error',
                message: 'contract_id_recontract không hợp lệ'
            })
            return;
        }
        if (!contract_create || contract_create === '') {
            res.json({
                status: 'error',
                message: 'contract_create không hợp lệ'
            })
            return;
        }
        if (update_contract_date_get_room) {
            console.log('Có nhập ngày nhận phòng');
            let dategr = update_contract_date_get_room.split('/')[2] + "-" + update_contract_date_get_room.split('/')[1] + "-" + update_contract_date_get_room.split('/')[0];
            update_contract_date_get_room = moment(dategr).format('YYYY-MM-DD');
            if (update_contract_date_get_room < today) {
                res.json({
                    status: 'warning',
                    message: 'Ngày nhận phỏng không hợp lệ'
                })
                return;
            }
            console.log('Ngày nhận phòng hợp lệ');
            Contracts.findOne({ contract_id }).exec(function (err, find) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (find) {
                    current_room = find.contract_room_name;
                    current_stu = find.contract_id_stu_school;
                    console.log(current_room + ' ' + current_stu);
                    Students.findOne({ stu_id_school: contract_id_stu_school }).exec(function (err, find) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (find) {
                            if (find.stu_id_school === current_stu) {
                                console.log('Mã sinh viên không thay đổi');
                                Rooms.findOne({ room_name: contract_room_name }).exec(function (err, find) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (find.room_name === current_room) {
                                        console.log('Phòng không thay đổi');
                                        let price = find.room_price;
                                        let succhua = find.room_max;
                                        var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                        console.log(find.room_name);
                                        Rooms.query(sql, function (err, results) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            if (results[0].sl <= succhua) {
                                                // return;
                                                console.log('Số lượng hiện tại của phòng hợp lệ');
                                                Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                    if (err) {
                                                        console.log(err)
                                                        return;
                                                    }
                                                    if (find) {
                                                        limit = find.recontract_limit;
                                                        promotion = find.recontract_promotion;
                                                        console.log(find.recontract_limit);
                                                        sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                        Contracts.query(sql, function (err, results) {
                                                            if (err) {
                                                                console.log(err);
                                                                return;
                                                            }
                                                            if (results) {
                                                                console.log(results[0].contract_date_end);
                                                                contract_date_end = results[0].contract_date_end;
                                                                console.log('price =' + price);
                                                                console.log('limit =' + limit);
                                                                console.log('promotion =' + promotion);
                                                                contract_total = (price * limit * (100 - promotion)) / 100;
                                                                Contracts.findOne({ contract_id }).exec(function (err, find) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (find) {
                                                                        Contracts.update({ contract_id }, {
                                                                            contract_date_get_room: update_contract_date_get_room,
                                                                            contract_date_end,
                                                                            contract_room_name,
                                                                            contract_id_stu_school,
                                                                            contract_id_recontract,
                                                                            contract_create,
                                                                            contract_total
                                                                        }).exec(function (err, updated) {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                return;
                                                                            }
                                                                            if (updated) {
                                                                                res.json({
                                                                                    status: 'success',
                                                                                    message: 'Cập nhật hợp đồng thành công'
                                                                                })
                                                                                return;
                                                                            }
                                                                        })
                                                                    }
                                                                    else {
                                                                        res.json({
                                                                            status: 'warning',
                                                                            message: 'Không tìm thấy hợp đồng ' + contract_id
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning recontract',
                                                            message: 'Loại hợp đồng không hợp lệ'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            else {
                                                res.json({
                                                    status: 'warning',
                                                    message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                })
                                                return;
                                            }
                                        })
                                    }
                                    if (find.room_name !== current_room) {
                                        console.log('Phòng thay đổi');
                                        let price = find.room_price;
                                        let succhua = find.room_max;
                                        var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                        console.log(find.room_name);
                                        Rooms.query(sql, function (err, results) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            if (results[0].sl < succhua) {
                                                console.log('Số lượng hiện tại của phòng hợp lệ');
                                                Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                    if (err) {
                                                        console.log(err)
                                                        return;
                                                    }
                                                    if (find) {
                                                        limit = find.recontract_limit;
                                                        promotion = find.recontract_promotion;
                                                        console.log(find.recontract_limit);
                                                        sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                        Contracts.query(sql, function (err, results) {
                                                            if (err) {
                                                                console.log(err);
                                                                return;
                                                            }
                                                            if (results) {
                                                                console.log(results[0].contract_date_end);
                                                                contract_date_end = results[0].contract_date_end;
                                                                console.log('price =' + price);
                                                                console.log('limit =' + limit);
                                                                console.log('promotion =' + promotion);
                                                                contract_total = (price * limit * (100 - promotion)) / 100;
                                                                Contracts.update({ contract_id }, {
                                                                    contract_date_get_room: update_contract_date_get_room,
                                                                    contract_date_end,
                                                                    contract_room_name,
                                                                    contract_id_stu_school,
                                                                    contract_id_recontract,
                                                                    contract_create,
                                                                    contract_total
                                                                }).exec(function (err, updated) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (updated) {
                                                                        res.json({
                                                                            status: 'success',
                                                                            message: 'Cập nhật hợp đồng thành công'
                                                                        })
                                                                        return;
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning recontract',
                                                            message: 'Loại hợp đồng không hợp lệ'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            else {
                                                res.json({
                                                    status: 'warning',
                                                    message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                })
                                                return;
                                            }
                                        })
                                    }
                                    if (!find) {
                                        res.json({
                                            status: 'warning room'
                                        })
                                        return;
                                    }
                                })
                            }
                            if (find.stu_id_school != current_stu) {
                                console.log('Mã sinh viên thay đổi');
                                sql = "SELECT COUNT(students.stu_id_school) as slhd FROM contracts LEFT JOIN students ON contracts.contract_id_stu_school = students.stu_id_school WHERE students.stu_id_school = " + contract_id_stu_school + " AND contracts.contract_date_end > CURRENT_DATE";
                                Students.query(sql, function (err, results) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (results[0].slhd === 0) {
                                        console.log(results[0].slhd);
                                        console.log('SL hợp đồng của sinh viên này hợp lệ');
                                        Rooms.findOne({ room_name: contract_room_name }).exec(function (err, find) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            if (find.room_name === current_room) {
                                                console.log('Phòng không thay đổi');
                                                let price = find.room_price;
                                                let succhua = find.room_max;
                                                var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                                console.log(find.room_name);
                                                Rooms.query(sql, function (err, results) {
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    if (results[0].sl <= succhua) {
                                                        // return;
                                                        console.log('Số lượng hiện tại của phòng hợp lệ');
                                                        Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                            if (err) {
                                                                console.log(err)
                                                                return;
                                                            }
                                                            if (find) {
                                                                limit = find.recontract_limit;
                                                                promotion = find.recontract_promotion;
                                                                console.log(find.recontract_limit);
                                                                sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                                Contracts.query(sql, function (err, results) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (results) {
                                                                        console.log(results[0].contract_date_end);
                                                                        contract_date_end = results[0].contract_date_end;
                                                                        console.log('price =' + price);
                                                                        console.log('limit =' + limit);
                                                                        console.log('promotion =' + promotion);
                                                                        contract_total = (price * limit * (100 - promotion)) / 100;
                                                                        Contracts.findOne({ contract_id }).exec(function (err, find) {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                return;
                                                                            }
                                                                            if (find) {
                                                                                Contracts.update({ contract_id }, {
                                                                                    contract_date_get_room: update_contract_date_get_room,
                                                                                    contract_date_end,
                                                                                    contract_room_name,
                                                                                    contract_id_stu_school,
                                                                                    contract_id_recontract,
                                                                                    contract_create,
                                                                                    contract_total
                                                                                }).exec(function (err, updated) {
                                                                                    if (err) {
                                                                                        console.log(err);
                                                                                        return;
                                                                                    }
                                                                                    if (updated) {
                                                                                        res.json({
                                                                                            status: 'success',
                                                                                            message: 'Cập nhật hợp đồng thành công'
                                                                                        })
                                                                                        return;
                                                                                    }
                                                                                })
                                                                            }
                                                                            else {
                                                                                res.json({
                                                                                    status: 'warning',
                                                                                    message: 'Không tìm thấy hợp đồng ' + contract_id
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                res.json({
                                                                    status: 'warning recontract',
                                                                    message: 'Loại hợp đồng không hợp lệ'
                                                                })
                                                                return;
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning',
                                                            message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            if (find.room_name !== current_room) {
                                                console.log('Phòng thay đổi');
                                                let price = find.room_price;
                                                let succhua = find.room_max;
                                                var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                                console.log(find.room_name);
                                                Rooms.query(sql, function (err, results) {
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    if (results[0].sl < succhua) {
                                                        console.log('Số lượng hiện tại của phòng hợp lệ');
                                                        Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                            if (err) {
                                                                console.log(err)
                                                                return;
                                                            }
                                                            if (find) {
                                                                limit = find.recontract_limit;
                                                                promotion = find.recontract_promotion;
                                                                console.log(find.recontract_limit);
                                                                sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                                Contracts.query(sql, function (err, results) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (results) {
                                                                        console.log(results[0].contract_date_end);
                                                                        contract_date_end = results[0].contract_date_end;
                                                                        console.log('price =' + price);
                                                                        console.log('limit =' + limit);
                                                                        console.log('promotion =' + promotion);
                                                                        contract_total = (price * limit * (100 - promotion)) / 100;
                                                                        Contracts.update({ contract_id }, {
                                                                            contract_date_get_room: update_contract_date_get_room,
                                                                            contract_date_end,
                                                                            contract_room_name,
                                                                            contract_id_stu_school,
                                                                            contract_id_recontract,
                                                                            contract_create,
                                                                            contract_total
                                                                        }).exec(function (err, updated) {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                return;
                                                                            }
                                                                            if (updated) {
                                                                                res.json({
                                                                                    status: 'success',
                                                                                    message: 'Cập nhật hợp đồng thành công'
                                                                                })
                                                                                return;
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                res.json({
                                                                    status: 'warning recontract',
                                                                    message: 'Loại hợp đồng không hợp lệ'
                                                                })
                                                                return;
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning',
                                                            message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            if (!find) {
                                                res.json({
                                                    status: 'warning room'
                                                })
                                                return;
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            status: 'warning',
                                            message: 'Sinh viên này hiện tại đang có hợp đồng thuê phòng vẫn còn thời hạn tại ký túc xá'
                                        })
                                        return;
                                    }
                                })
                            }

                        }
                        else {
                            res.json({
                                status: 'warning stu'
                            })
                        }
                    })

                }
                else {
                    res.json({
                        status: 'warning',
                        message: 'Không tìm thấy hợp đồng ' + contract_id
                    })
                }
            })
        }
        else {
            console.log('Không nhập ngày nhận phòng');
            Contracts.findOne({ contract_id }).exec(function (err, find) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (find) {
                    current_room = find.contract_room_name;
                    current_stu = find.contract_id_stu_school;
                    dategr = moment(find.contract_date_get_room).format('YYYY-MM-DD');
                    console.log(current_room + '  ' + dategr);
                    Students.findOne({ stu_id_school: contract_id_stu_school }).exec(function (err, find) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (find) {
                            if (find.stu_id_school === current_stu) {
                                console.log('Mã sinh viên không thay đổi');
                                Rooms.findOne({ room_name: contract_room_name }).exec(function (err, find) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (find.room_name === current_room) {
                                        console.log(1);
                                        console.log('Phòng không thay đổi')
                                        let price = find.room_price;
                                        let succhua = find.room_max;
                                        var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                        console.log(find.room_name);
                                        Rooms.query(sql, function (err, results) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            if (results[0].sl <= succhua) {
                                                console.log(2);
                                                console.log('Số lượng hiện tại của phòng hợp lệ');
                                                Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                    if (err) {
                                                        console.log(err)
                                                        return;
                                                    }
                                                    if (find) {
                                                        console.log(3);
                                                        limit = find.recontract_limit;
                                                        promotion = find.recontract_promotion;
                                                        console.log(find.recontract_limit);
                                                        sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                        Contracts.query(sql, function (err, results) {
                                                            if (err) {
                                                                console.log(err);
                                                                return;
                                                            }
                                                            if (results) {
                                                                console.log(4);
                                                                console.log(results[0].contract_date_end);
                                                                contract_date_end = results[0].contract_date_end;
                                                                console.log('price =' + price);
                                                                console.log('limit =' + limit);
                                                                console.log('promotion =' + promotion);
                                                                contract_total = (price * limit * (100 - promotion)) / 100;
                                                                Contracts.findOne({ contract_id }).exec(function (err, find) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (find) {
                                                                        Contracts.update({ contract_id }, {
                                                                            contract_date_end,
                                                                            contract_room_name,
                                                                            contract_id_stu_school,
                                                                            contract_id_recontract,
                                                                            contract_create,
                                                                            contract_total
                                                                        }).exec(function (err, updated) {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                return;
                                                                            }
                                                                            if (updated) {
                                                                                res.json({
                                                                                    status: 'success',
                                                                                    message: 'Cập nhật hợp đồng thành công'
                                                                                })
                                                                                return;
                                                                            }
                                                                        })
                                                                    }
                                                                    else {
                                                                        res.json({
                                                                            status: 'warning',
                                                                            message: 'Không tìm thấy hợp đồng ' + contract_id
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning recontract',
                                                            message: 'Loại hợp đồng không hợp lệ'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            else {
                                                res.json({
                                                    status: 'warning',
                                                    message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                })
                                                return;
                                            }
                                        })
                                    }
                                    if (find.room_name != current_room) {
                                        console.log('Phòng thay đổi');
                                        let price = find.room_price;
                                        let succhua = find.room_max;
                                        var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                        console.log(find.room_name);
                                        Rooms.query(sql, function (err, results) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            if (results[0].sl < succhua) {
                                                console.log('Số lượng hiện tại của phòng hợp lệ');
                                                Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                    if (err) {
                                                        console.log(err)
                                                        return;
                                                    }
                                                    if (find) {
                                                        limit = find.recontract_limit;
                                                        promotion = find.recontract_promotion;
                                                        console.log(find.recontract_limit);
                                                        sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                        Contracts.query(sql, function (err, results) {
                                                            if (err) {
                                                                console.log(err);
                                                                return;
                                                            }
                                                            if (results) {
                                                                console.log(results[0].contract_date_end);
                                                                contract_date_end = results[0].contract_date_end;
                                                                console.log('price =' + price);
                                                                console.log('limit =' + limit);
                                                                console.log('promotion =' + promotion);
                                                                contract_total = (price * limit * (100 - promotion)) / 100;
                                                                Contracts.update({ contract_id }, {
                                                                    contract_date_end,
                                                                    contract_room_name,
                                                                    contract_id_stu_school,
                                                                    contract_id_recontract,
                                                                    contract_create,
                                                                    contract_total
                                                                }).exec(function (err, updated) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (updated) {
                                                                        res.json({
                                                                            status: 'success',
                                                                            message: 'Cập nhật hợp đồng thành công'
                                                                        })
                                                                        return;
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning recontract',
                                                            message: 'Loại hợp đồng không hợp lệ'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            else {
                                                res.json({
                                                    status: 'warning',
                                                    message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                })
                                                return;
                                            }
                                        })
                                    }
                                    if (!find) {
                                        res.json({
                                            status: 'warning room'
                                        })
                                        return;
                                    }
                                })
                            }
                            if (find.stu_id_school != current_stu) {
                                console.log('Mã sinh viên thay đổi');
                                sql = "SELECT COUNT(students.stu_id_school) as slhd FROM contracts LEFT JOIN students ON contracts.contract_id_stu_school = students.stu_id_school WHERE students.stu_id_school = " + contract_id_stu_school + " AND contracts.contract_date_end > CURRENT_DATE";
                                Students.query(sql, function (err, results) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (results[0].slhd === 0) {
                                        console.log(results[0].slhd);
                                        console.log('SL hợp đồng của sinh viên này hợp lệ');
                                        Rooms.findOne({ room_name: contract_room_name }).exec(function (err, find) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            if (find.room_name === current_room) {
                                                console.log(1);
                                                console.log('Phòng không thay đổi')
                                                let price = find.room_price;
                                                let succhua = find.room_max;
                                                var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                                console.log(find.room_name);
                                                Rooms.query(sql, function (err, results) {
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    if (results[0].sl <= succhua) {
                                                        console.log(2);
                                                        console.log('Số lượng hiện tại của phòng hợp lệ');
                                                        Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                            if (err) {
                                                                console.log(err)
                                                                return;
                                                            }
                                                            if (find) {
                                                                console.log(3);
                                                                limit = find.recontract_limit;
                                                                promotion = find.recontract_promotion;
                                                                console.log(find.recontract_limit);
                                                                sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                                Contracts.query(sql, function (err, results) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (results) {
                                                                        console.log(4);
                                                                        console.log(results[0].contract_date_end);
                                                                        contract_date_end = results[0].contract_date_end;
                                                                        console.log('price =' + price);
                                                                        console.log('limit =' + limit);
                                                                        console.log('promotion =' + promotion);
                                                                        contract_total = (price * limit * (100 - promotion)) / 100;
                                                                        Contracts.findOne({ contract_id }).exec(function (err, find) {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                return;
                                                                            }
                                                                            if (find) {
                                                                                Contracts.update({ contract_id }, {
                                                                                    contract_date_end,
                                                                                    contract_room_name,
                                                                                    contract_id_stu_school,
                                                                                    contract_id_recontract,
                                                                                    contract_create,
                                                                                    contract_total
                                                                                }).exec(function (err, updated) {
                                                                                    if (err) {
                                                                                        console.log(err);
                                                                                        return;
                                                                                    }
                                                                                    if (updated) {
                                                                                        res.json({
                                                                                            status: 'success',
                                                                                            message: 'Cập nhật hợp đồng thành công'
                                                                                        })
                                                                                        return;
                                                                                    }
                                                                                })
                                                                            }
                                                                            else {
                                                                                res.json({
                                                                                    status: 'warning',
                                                                                    message: 'Không tìm thấy hợp đồng ' + contract_id
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                res.json({
                                                                    status: 'warning recontract',
                                                                    message: 'Loại hợp đồng không hợp lệ'
                                                                })
                                                                return;
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning',
                                                            message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            if (find.room_name != current_room) {
                                                console.log('Phòng thay đổi');
                                                let price = find.room_price;
                                                let succhua = find.room_max;
                                                var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "' AND contracts.contract_date_end >= CURRENT_DATE";
                                                console.log(find.room_name);
                                                Rooms.query(sql, function (err, results) {
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    if (results[0].sl < succhua) {
                                                        console.log('Số lượng hiện tại của phòng hợp lệ');
                                                        Contractregulations.findOne({ recontract_id: contract_id_recontract }).exec(function (err, find) {
                                                            if (err) {
                                                                console.log(err)
                                                                return;
                                                            }
                                                            if (find) {
                                                                limit = find.recontract_limit;
                                                                promotion = find.recontract_promotion;
                                                                console.log(find.recontract_limit);
                                                                sql = "SELECT DATE_ADD('" + dategr + "', INTERVAL " + limit + " MONTH) AS contract_date_end"
                                                                Contracts.query(sql, function (err, results) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    if (results) {
                                                                        console.log(results[0].contract_date_end);
                                                                        contract_date_end = results[0].contract_date_end;
                                                                        console.log('price =' + price);
                                                                        console.log('limit =' + limit);
                                                                        console.log('promotion =' + promotion);
                                                                        contract_total = (price * limit * (100 - promotion)) / 100;
                                                                        Contracts.update({ contract_id }, {
                                                                            contract_date_end,
                                                                            contract_room_name,
                                                                            contract_id_stu_school,
                                                                            contract_id_recontract,
                                                                            contract_create,
                                                                            contract_total
                                                                        }).exec(function (err, updated) {
                                                                            if (err) {
                                                                                console.log(err);
                                                                                return;
                                                                            }
                                                                            if (updated) {
                                                                                res.json({
                                                                                    status: 'success',
                                                                                    message: 'Cập nhật hợp đồng thành công'
                                                                                })
                                                                                return;
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                res.json({
                                                                    status: 'warning recontract',
                                                                    message: 'Loại hợp đồng không hợp lệ'
                                                                })
                                                                return;
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        res.json({
                                                            status: 'warning',
                                                            message: 'Phòng ' + contract_room_name + ' đã đầy'
                                                        })
                                                        return;
                                                    }
                                                })
                                            }
                                            if (!find) {
                                                res.json({
                                                    status: 'warning room'
                                                })
                                                return;
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            status: 'warning',
                                            message: 'Sinh viên này hiện tại đang có hợp đồng thuê phòng vẫn còn thời hạn tại ký túc xá'
                                        })
                                        return;
                                    }
                                })
                            }

                        } else {
                            res.json({
                                status: 'warning stu'
                            })
                        }
                    })

                }
            })
        }
    },
    chart_contract: function (req, res) {
        var year = req.param('year');
        if (!year || year === '' || year < 1 || year.length > 4) {
            res.json({
                status: 'warning',
                message: 'Năm bạn nhập vào không hợp lệ'
            })
            return;
        }
        var sql = "SELECT  MONTH(contracts.createdAt) as label, SUM(contracts.contract_total) as value FROM contracts WHERE YEAR(contracts.createdAt) = " + year + " GROUP BY label";
        Contracts.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET chart_contract thành công',
                    list: results
                })
            }
        })
    },
    current_contract: function (req, res) {
        var sql = "SELECT COUNT(contracts.contract_id) as total FROM contracts WHERE contracts.contract_date_end >= CURRENT_DATE()"
        Contracts.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'Get current_contract thành công',
                    total: results
                })
                return;
            }
        })
    },
    disable_contract: function (req, res) {
        var contract_id = req.param('contract_id');
        if (!contract_id || contract_id === '') {
            res.json({
                status: 'error',
                message: 'contract_id không hợp lệ'
            })
            return;
        }
        // console.log(1);
        Contracts.findOne({ contract_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                // console.log(1);
                Contracts.update({ contract_id }, { contract_status: 'disable' }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status:'success',
                            message:'Hủy hợp đồng thành công',
                        });
                        return;
                    }
                })
            }
            else{
                res.json({
                    status:'warning',
                    message:'ID hợp đồng '+contract_id+' không tồn tại trong cơ sở dữ liệu'
                })
                return;
            }
        })
    }
};

