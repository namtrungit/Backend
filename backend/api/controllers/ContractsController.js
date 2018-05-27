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
        var sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end > CURRENT_DATE";
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
    chart_contract: function (req, res) {
        var month_year = req.param('month_year')
        sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, areafloordetails.af_price FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school, areafloordetails WHERE rooms.room_id_area = areafloordetails.af_area_id and rooms.room_id_floor = areafloordetails.af_floor_id AND contracts.contract_date_end like '" + month_year + "%'";
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
    update_contract: function (req, res) {
        var contract_id = req.param('contract_id'),
            contract_date_get_room = req.param('contract_date_get_room'),
            contract_date_end = req.param('contract_date_end'),
            contract_room_name = req.param('contract_room_name'),
            contract_id_stu_school = req.param('contract_id_stu_school'),
            contract_id_recontract = req.param('contract_id_recontract'),
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
        if (!contract_date_end || contract_date_end === '') {
            res.json({
                status: 'error',
                message: 'contract_date_end không hợp lệ'
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
        let dategr = contract_date_get_room.split('/')[2] + "-" + contract_date_get_room.split('/')[1] + "-" + contract_date_get_room.split('/')[0];
        contract_date_get_room = moment(dategr).format('YYYY-MM-DD');
        let dateend = contract_date_end.split('/')[2] + "-" + contract_date_end.split('/')[1] + "-" + contract_date_end.split('/')[0];
        contract_date_end = moment(dateend).format('YYYY-MM-DD');
        Students.findOne({ stu_id_school: contract_id_stu_school }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Rooms.findOne({ room_name: contract_room_name }).exec(function (err, find) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (find) {
                        let price = find.room_price;
                        let succhua = find.room_max;
                        var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "'";
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
                                        sql = "SELECT TIMESTAMPDIFF(MONTH,'" + dategr + "','" + dateend + "') as month";
                                        Contracts.query(sql, function (err, results) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            if (results) {
                                                console.log(results[0].month);
                                                month = results[0].month;
                                                console.log('price =' + price);
                                                console.log('limit =' + limit);
                                                console.log('promotion =' + promotion);
                                                if (month === find.recontract_limit) {
                                                    contract_total = (price * limit * (100 - promotion)) / 100;
                                                    Contracts.update({ contract_id },
                                                        {
                                                            contract_date_get_room,
                                                            contract_date_end,
                                                            contract_room_name,
                                                            contract_id_stu_school,
                                                            contract_id_recontract,
                                                            contract_total
                                                        }).exec(function (err, updated) {
                                                            if (err) {
                                                                console.log(err);
                                                                return;
                                                            }
                                                            if (updated) {
                                                                res.json({
                                                                    status: 'success',
                                                                    message: 'Cập nhật hợp đồng thành công',
                                                                })
                                                                return;
                                                            }
                                                        })
                                                }
                                                else {
                                                    // console.log(1);
                                                    res.json({
                                                        status: 'warning',
                                                        message: 'Ngày kết thúc hợp đồng không hợp lệ, xin hãy kiểm tra lại'
                                                    })
                                                    return;
                                                }
                                            }
                                        })
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
            } else {
                res.json({
                    status: 'warning stu'
                })
            }
        })
    },
    add_contract: function (req, res) {
        var contract_id = req.param('contract_id'),
            contract_date_get_room = req.param('contract_date_get_room'),
            contract_date_end = req.param('contract_date_end'),
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
        if (!contract_date_end || contract_date_end === '') {
            res.json({
                status: 'error',
                message: 'contract_date_end không hợp lệ'
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
        let dateend = contract_date_end.split('/')[2] + "-" + contract_date_end.split('/')[1] + "-" + contract_date_end.split('/')[0];
        contract_date_end = moment(dateend).format('YYYY-MM-DD');
        Students.findOne({ stu_id_school: contract_id_stu_school }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                sql = "SELECT COUNT(students.stu_id_school) as slhd FROM contracts LEFT JOIN students ON contracts.contract_id_stu_school = students.stu_id_school WHERE students.stu_id_school = " + contract_id_stu_school + " AND contracts.contract_date_end > CURRENT_DATE";
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
                                let price = find.room_price;
                                let succhua = find.room_max;
                                var sql = "SELECT COUNT(rooms.room_name) AS sl FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = '" + contract_room_name + "'";
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
                                                sql = "SELECT TIMESTAMPDIFF(MONTH,'" + dategr + "','" + dateend + "') as month";
                                                Contracts.query(sql, function (err, results) {
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    if (results) {
                                                        console.log(results[0].month);
                                                        month = results[0].month;
                                                        console.log('price =' + price);
                                                        console.log('limit =' + limit);
                                                        console.log('promotion =' + promotion);
                                                        if (month === find.recontract_limit) {
                                                            contract_total = (price * limit * (100 - promotion)) / 100;
                                                            Contracts.create({
                                                                contract_id,
                                                                contract_date_get_room,
                                                                contract_date_end,
                                                                contract_room_name,
                                                                contract_id_stu_school,
                                                                contract_id_recontract,
                                                                contract_create,
                                                                contract_total
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
                                                        else {
                                                            // console.log(1);
                                                            res.json({
                                                                status: 'warning',
                                                                message: 'Ngày kết thúc hợp đồng không hợp lệ, xin hãy kiểm tra lại'
                                                            })
                                                            return;
                                                        }
                                                    }
                                                })
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
    list_contract_old: function (req, res) {
        sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE";
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
        var stu_id = req.param('stu_id'),
            contract_id = req.param('contract_id');
        if (stu_id && contract_id) {
            console.log(1);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE AND students.stu_id_school = " + stu_id + " AND contracts.contract_id = '" + contract_id + "'";
        }
        if (!stu_id && contract_id) {
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE AND contracts.contract_id = '" + contract_id + "'";
        }
        if (stu_id && !contract_id) {
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end < CURRENT_DATE AND students.stu_id_school = " + stu_id + "";
        }
        if (!stu_id && !contract_id) {
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
        var stu_id = req.param('stu_id'),
            contract_id = req.param('contract_id');
        if (stu_id && contract_id) {
            console.log(1);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end > CURRENT_DATE AND students.stu_id_school = " + stu_id + " AND contracts.contract_id = '" + contract_id + "'";
        }
        if (!stu_id && contract_id) {
            console.log(2);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end > CURRENT_DATE AND contracts.contract_id = '" + contract_id + "'";
        }
        if (stu_id && !contract_id) {
            console.log(3);
            sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room,DATE_FORMAT(contracts.contract_date_end,'%d/%m/%Y') as contract_date_end, contracts.contract_create, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, rooms.room_price, contracts.contract_total FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school WHERE contracts.contract_date_end > CURRENT_DATE AND students.stu_id_school = " + stu_id + "";
        }
        if (!stu_id && !contract_id) {
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
    }
};

