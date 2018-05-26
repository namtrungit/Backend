/**
 * RoomsController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_room: function (req, res) {
        var room_name = req.param('room_name'),
            room_max = req.param('room_max'),
            room_id_area = req.param('room_id_area'),
            room_floor = req.param('room_floor'),
            room_price = req.param('room_price'),
            price;
        if (!room_name || room_name === '') {
            res.json({
                status: 'error',
                message: 'room_name không hợp lệ'
            })
            return;
        }
        if (!room_max || room_max === '' || room_max < 1) {
            res.json({
                status: 'error',
                message: 'room_max không hợp lệ'
            })
            return;
        }
        if (!room_id_area || room_id_area === '' || room_id_area < 1) {
            res.json({
                status: 'error',
                message: 'room_id_area không hợp lệ'
            })
            return;
        }
        if (!room_floor || room_floor === '' || room_floor < 1) {
            res.json({
                status: 'error',
                message: 'room_floor không hợp lệ'
            })
            return;
        }
        if (!room_price || room_price === '' || room_price < 1) {
            res.json({
                status: 'error',
                message: 'room_price không hợp lệ'
            })
            return;
        }
        Rooms.findOne({ room_name }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status: 'warning',
                    message: 'Phòng ' + room_name + ' đã có trong csdl'
                })
                return;
            }
            else {
                var sql = "SELECT rooms.room_price as price FROM rooms WHERE rooms.room_id_area = " + room_id_area + " AND rooms.room_floor = " + room_floor + " LIMIT 1"
                Rooms.query(sql, function (err, results) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    if (results[0] === undefined) {
                        console.log('Chưa có phòng ở tầng này');
                        Rooms.create({ room_name, room_max, room_id_area, room_floor, room_price }).exec(function (err, created) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (created) {
                                res.json({
                                    status: 'success',
                                    message: 'Thêm phòng thành công',
                                    room: created
                                })
                                return;
                            }
                        })
                    }
                    if (results[0]) {
                        console.log('Tìm được giá phòng');
                        price = results[0].price;
                        console.log(price);
                        if (price == room_price) {
                            console.log('Hợp lệ cho tạo phòng');
                            Rooms.create({ room_name, room_max, room_id_area, room_floor, room_price }).exec(function (err, created) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (created) {
                                    res.json({
                                        status: 'success',
                                        message: 'Thêm phòng thành công',
                                        room: created
                                    })
                                    return;
                                }
                            })
                        }
                        if (price != room_price) {
                            res.json({
                                status: 'warning',
                                message: 'Giá phòng bạn nhập không hợp lệ với tầng ' + room_floor + ' ở khu này'
                            })
                            return;
                        }
                    }
                })

            }
        })
    },
    update_room: function (req, res) {
        var room_id = req.param('room_id'),
            update_room_name = req.param('update_room_name'),
            room_max = req.param('room_max');
        if (!room_id || room_id === '' || room_id < 1) {
            res.json({
                status: 'error',
                message: 'room_id không hợp lệ'
            })
            return;
        }
        if (!room_max || room_max === '' || room_max < 1) {
            res.json({
                status: 'error',
                message: 'room_max không hợp lệ'
            })
            return;
        }
        if (update_room_name) {
            console.log('Có nhập tên phòng');
            Rooms.findOne({ room_id }).exec(function (err, find) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (find) {
                    Rooms.update({ room_id }, { room_name: update_room_name, room_max }).exec(function (err, updated) {
                        if (err) {
                            res.json({
                                status: 'warning',
                                message: 'Tên phòng ' + update_room_name + ' đã có trong csdl'
                            })
                            return;
                        }
                        if (updated) {
                            res.json({
                                status: 'success',
                                message: 'Cập nhật thành công',
                            })
                            return;
                        }
                    })
                }
            })
        }
        else {
            console.log("Không nhập tên phòng");
            Rooms.findOne({ room_id }).exec(function (err, find) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (find) {
                    Rooms.update({ room_id }, { room_max }).exec(function (err, updated) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (updated) {
                            res.json({
                                status: 'success',
                                message: 'Cập nhật thành công'
                            })
                            return;
                        }
                    })
                }
            })
        }
    },
    del_room: function (req, res) {
        var room_id = req.param('room_id');
        if (!room_id || room_id === '' || room_id < 1) {
            res.json({
                status: 'error',
                message: 'room_max không hợp lệ'
            })
            return;
        }
        Rooms.findOne({ room_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Rooms.destroy({ room_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa thành công'
                    })
                    return;
                })
            }
        })
    },
    list_room: function (req, res) {
        var sql = 'SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name  AND contracts.contract_date_end >= CURRENT_DATE) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id';
        Rooms.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_room thành công',
                    Rooms: results
                })
            }
        })
    },
    find_room_s: function (req, res) {
        var room_name_s = req.param('room_name_s')
        sql = "SELECT rooms.room_id, rooms.room_name FROM rooms WHERE rooms.room_name LIKE '" + room_name_s + "%'";
        Rooms.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET danh sách theo textbox thành công',
                    Rooms: results
                })
                return;
            }
        })
    },
    update_price: function (req, res) {
        var room_id_area = req.param('room_id_area'),
            room_floor = req.param('room_floor'),
            room_price = req.param('room_price');
        if (!room_id_area || room_id_area === '' || room_id_area < 1) {
            res.json({
                status: 'error',
                message: 'room_id_area không hợp lệ'
            })
            return;
        }
        if (!room_floor || room_floor === '' || room_floor < 1) {
            res.json({
                status: 'error',
                message: 'room_floor không hợp lệ'
            })
            return;
        }
        if (!room_price || room_price === '' || room_price < 1) {
            res.json({
                status: 'error',
                message: 'room_price không hợp lệ'
            })
            return;
        }
        Rooms.findOne({ room_id_area, room_floor }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Rooms.update({ room_id_area, room_floor }, { room_price }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật giá cho phòng và khu thành công'
                        })
                        return;
                    }
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy khu và phòng bạn nhập vào'
                })
                return;
            }
        })
    },
    find_room: function (req, res) {
        var room_name = req.param('room_name'),
            room_id_area = req.param('room_id_area'),
            room_floor = req.param('room_floor');
        if (room_name && room_id_area && room_floor) {
            // console.log(1);
            sql = "SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name ) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id WHERE  o.room_name = '" + room_name + "' and o.room_id_area = " + room_id_area + " AND o.room_floor = " + room_floor + "";
        }
        if (room_name && room_id_area && !room_floor) {
            // console.log(2);
            sql = "SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name ) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id WHERE o.room_name = '" + room_name + "' and o.room_id_area = " + room_id_area + "";
        }
        if (room_name && !room_id_area && room_floor) {
            // console.log(3);
            sql = "SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name ) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id WHERE  o.room_name = '" + room_name + "' and o.room_floor = " + room_floor + "";
        }
        if (room_name && !room_id_area && !room_floor) {
            // console.log(4);
            sql = "SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name ) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id WHERE o.room_name = '" + room_name + "'";
        }
        if (!room_name && room_id_area && room_floor) {
            // console.log(5);
            sql = "SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name ) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id WHERE o.room_id_area = " + room_id_area + " AND o.room_floor = " + room_floor + "";
        }
        if (!room_name && room_id_area && !room_floor) {
            // console.log(6);
            sql = "SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name ) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id WHERE o.room_id_area = " + room_id_area + "";
        }
        if (!room_name && !room_id_area && room_floor) {
            // console.log(7);
            sql = "SELECT o.room_id, o.room_name, o.room_max, areas.area_sympol, areas.area_id, o.room_floor, o.room_price ,(SELECT COUNT(rooms.room_name) FROM contracts LEFT JOIN rooms ON rooms.room_name = contracts.contract_room_name WHERE rooms.room_name = o.room_name ) as room_currency FROM rooms o LEFT JOIN areas on o.room_id_area = areas.area_id WHERE   o.room_floor = " + room_floor + "";
        }
        if (!room_name && !room_id_area && !room_floor) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin để tìm kiếm'
            })
            return;
        }
        Rooms.query(sql, function (err, results) {
            res.json({
                status: 'success',
                message: 'Tìm kiếm thành công',
                Rooms: results
            })
            return;
        })
    }
};

