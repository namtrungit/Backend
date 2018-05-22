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
            room_id_floor = req.param('room_id_floor')
        room_empty = room_max;
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
        if (!room_id_floor || room_id_floor === '' || room_id_floor < 1) {
            res.json({
                status: 'error',
                message: 'room_id_floor không hợp lệ'
            })
            return;
        }
        Rooms.create({ room_name, room_max, room_empty, room_id_area, room_id_floor }).exec(function (err, created) {
            if (err) {
                res.json({
                    status: 'warning',
                    message: 'Đã có phòng ' + room_name + ' trong danh sách',
                })
            }
            if (created) {
                res.json({
                    status: 'success',
                    message: 'Tạo phòng thành công',
                    room: created
                })
                return;
            }
        })
    },
    update_room: function (req, res) {
        var room_id = req.param('room_id'),
            room_name = req.param('room_name'),
            room_max = req.param('room_max'),
            room_id_area = req.param('room_id_area'),
            room_id_floor = req.param('room_id_floor');
        if (!room_id || room_id === '' || room_id < 1) {
            res.json({
                status: 'error',
                message: 'room_max không hợp lệ'
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
        if (!room_id_floor || room_id_floor === '' || room_id_floor < 1) {
            res.json({
                status: 'error',
                message: 'room_id_floor không hợp lệ'
            })
            return;
        }
        Rooms.findOne({ room_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Rooms.update({ room_id }, { room_name, room_max, room_id_area, room_id_floor }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật phòng thành công'
                        })
                        return;
                    }
                })
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không tìm thấy id=' + room_id
                })
            }
        })
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
        var sql = 'SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id';
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
    find_room: function (req, res) {
        var room = req.param('room'),
            area = req.param('area'),
            empty = req.param('empty');
        if (room && area && empty) {
            sql = "SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id AND rooms.room_name = '" + room + "' AND rooms.room_id_area = " + area + "  AND rooms.room_empty > 0";
            // console.log(1);
        }
        if (room && area && !empty) {
            sql = "SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id AND rooms.room_name = '" + room + "' AND rooms.room_id_area = " + area + "";
            // console.log(2);
        }
        if (room && !area && empty) {
            sql = "SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id AND rooms.room_name = '" + room + "'  AND rooms.room_empty > 0";
            // console.log(3);
        }
        if (room && !area && !empty) {
            sql = "SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id AND rooms.room_name = '" + room + "'";
            // console.log(4);
        }
        if (!room && area && empty) {
            sql = "SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id  AND rooms.room_id_area = " + area + "  AND rooms.room_empty > 0";
            // console.log(5);
        }
        if (!room && area && !empty) {
            sql = "SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id  AND rooms.room_id_area = " + area + "";
            // console.log(6);
        }
        if (!room && !area && empty) {
            sql = "SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id AND rooms.room_empty > 0";
            // console.log(7);
        }
        if (!room && !area && !empty) {
            res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin để tìm kiếm'
            })
            return;
        }
        Rooms.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status:'success',
                    message:'Tìm kiếm thành công',
                    list: results
                })
                return;
            }
        })
    }
};

