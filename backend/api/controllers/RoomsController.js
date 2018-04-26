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
        Rooms.create({ room_name, room_max, room_empty,room_id_area, room_id_floor }).exec(function (err, created) {
            if (err) {
                res.json({
                    status: 'warning',
                    message: 'Đã có phòng '+room_name+' trong danh sách',
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
            if(err){
                console.log(err);
                return;
            }
            if(find){
                Rooms.destroy({room_id}).exec(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    res.json({
                        status:'success',
                        message:'Xóa thành công'
                    })
                    return;
                })
            }
        })
    },
    list_room: function(req,res){
        var sql = 'SELECT rooms.room_id, rooms.room_name, rooms.room_max,rooms.room_empty,areas.area_sympol, areas.area_id,floors.floor_id, areafloordetails.af_price as price FROM rooms LEFT JOIN areas on rooms.room_id_area = areas.area_id LEFT JOIN floors on rooms.room_id_floor = floors.floor_id, areafloordetails WHERE areafloordetails.af_area_id = areas.area_id and areafloordetails.af_floor_id = floors.floor_id';
        Rooms.query(sql,function(err,results){
            if(err){
                console.log(err);
                return;
            }
            if(results)
            {
                res.json({
                    status:'success',
                    message:'GET list_room thành công',
                    Rooms: results
                })
            }
        })
    },
    find_room: function (req, res) {
        var room_id = req.param('room_id'),
            room_id_area = req.param('room_id_area'),
            room_id_price = req.param('room_id_price'),
            room_quantity = req.param('room_quantity');
        if (room_id === undefined) {
            res.json({
                status: 'error',
                message: 'Mã phòng ' + room_id + ' không hợp lệ'
            })
            return;
        }
        if (room_id_area === undefined) {
            res.json({
                status: 'error',
                message: 'Mã khu ' + room_id_area + ' không hợp lệ'
            })
            return;
        }
        if (room_id_price === undefined) {
            res.json({
                status: 'error',
                message: 'Giá tiền ' + price_value + ' không hợp lệ'
            })
            return;
        }
        if (room_quantity === undefined) {
            res.json({
                status: 'error',
                message: 'Sức chứa ' + room_quantity + ' không hợp lệ'
            })
            return;
        }
        //Tìm theo tên phòng
        if (room_id_price === '' && room_quantity === '' && room_id_area === '' && room_id) {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_id ="' + room_id + '"';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo khu thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        //Tìm theo khu
        if (room_id_price === '' && room_quantity === '' && room_id_area && room_id === '') {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_id_area ="' + room_id_area + '"';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo khu thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        //Tìm theo giá
        if (room_id_price && room_quantity === '' && room_id_area === '' && room_id === '') {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_id_price =' + room_id_price + '';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo giá thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        //Tìm theo sức chứa
        if (room_id_price === '' && room_quantity && room_id_area === '' && room_id === '') {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_quantity =' + room_quantity + '';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo sức chứa thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        //Tìm theo khu và giá
        if (room_id_price && room_quantity === '' && room_id_area && room_id === '') {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_id_price=' + room_id_price + ' and rooms.room_id_area = "' + room_id_area + '"';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo khu và giá thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        //Tìm theo khu và sức chứa
        if (room_id_price === '' && room_quantity && room_id_area && room_id === '') {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_quantity=' + room_quantity + ' and rooms.room_id_area = "' + room_id_area + '"';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo khu và sức chứa thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        //Tìm theo giá và sức chứa
        if (room_id_price && room_quantity && room_id_area === '' && room_id === '') {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_quantity=' + room_quantity + ' and rooms.room_id_price =' + room_id_price + '';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo giá  và sức chứa thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        //Tìm theo giá, sức chứa, khu
        if (room_id_price && room_quantity && room_id_area && room_id === '') {
            var sql = 'SELECT rooms.room_id, rooms.room_quantity, rooms.room_id_price, prices.price_value, rooms.room_id_area, areas.area_address FROM rooms, areas, prices WHERE rooms.room_id_price = prices.price_id and rooms.room_id_area = areas.area_id and rooms.room_quantity=' + room_quantity + ' and rooms.room_id_price =' + room_id_price + ' and rooms.room_id_area ="' + room_id_area + '"';
            Rooms.query(sql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (results) {
                    res.json({
                        status: 'success',
                        message: 'GET room theo giá  và sức chứa thành công',
                        Rooms: results
                    })
                    return;
                }
            })
        }
        if (room_id_price === '' && room_quantity === '' && room_id_area === '' && room_id === '') {
            return res.json({
                status: 'warning',
                message: 'Bạn chưa nhập thông tin để tìm kiếm'
            })
        }
    }
};

