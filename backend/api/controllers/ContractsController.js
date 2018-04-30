/**
 * ContractsController
 *
 * @description :: Server-side logic for managing contracts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const moment = require('moment');
module.exports = {
    add_contract: function (req, res) {
        var contract_date_get_room = req.param('contract_date_get_room'),
            contract_room_name = req.param('contract_room_name'),
            contract_id_stu_school = req.param('contract_id_stu_school'),
            contract_id_recontract = req.param('contract_id_recontract');
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
        let redate = contract_date_get_room.split('/')[2] + "-" + contract_date_get_room.split('/')[1] + "-" + contract_date_get_room.split('/')[0];
        contract_date_get_room = moment(redate).format('YYYY-MM-DD');
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
                        Contracts.create({
                            contract_date_get_room,
                            contract_room_name,
                            contract_id_stu_school,
                            contract_id_recontract
                        }).exec(function (err, created) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (created) {
                                res.json({
                                    status: 'success',
                                    message: 'Lập hợp đồng thành công',
                                    contract: created
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
                    status: 'warning stu'
                })
                return;
            }
        })
    },
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
    update_contract: function (req, res) {
        var contract_id = req.param('contract_id'),
            contract_date_get_room = req.param('contract_date_get_room'),
            contract_room_name = req.param('contract_room_name'),
            contract_id_stu_school = req.param('contract_id_stu_school'),
            contract_id_recontract = req.param('contract_id_recontract');
        if (!contract_id || contract_id === '' || contract_id < 1) {
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
        let redate = contract_date_get_room.split('/')[2] + "-" + contract_date_get_room.split('/')[1] + "-" + contract_date_get_room.split('/')[0];
        contract_date_get_room = moment(redate).format('YYYY-MM-DD');
        Contracts.findOne({ contract_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
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
                                Contracts.update({ contract_id }, {
                                    contract_date_get_room,
                                    contract_room_name,
                                    contract_id_stu_school,
                                    contract_id_recontract
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
                                    status: 'warning room'
                                })
                                return;
                            }
                        })
                    }
                    else {
                        res.json({
                            status: 'warning stu',
                        })
                        return;
                    }
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy contract_id ' + contract_id
                })
            }
        })
    },
    list_contract: function (req, res) {
        var sql = "SELECT contracts.contract_id, contractregulations.recontract_id,DATE_FORMAT(contracts.contract_date_get_room,'%d/%m/%Y') as contract_date_get_room, DATE_FORMAT(contracts.createdAt,'%d/%m/%Y') as contract_createdAt, students.stu_id_school, students.stu_name, rooms.room_name, contractregulations.recontract_name, contractregulations.recontract_limit, contractregulations.recontract_promotion, areafloordetails.af_price FROM contracts LEFT JOIN contractregulations on contracts.contract_id_recontract = contractregulations.recontract_id LEFT JOIN rooms on contracts.contract_room_name  = rooms.room_name LEFT JOIN students on contracts.contract_id_stu_school = students.stu_id_school, areafloordetails WHERE rooms.room_id_area = areafloordetails.af_area_id and rooms.room_id_floor = areafloordetails.af_floor_id";
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
    }
};

