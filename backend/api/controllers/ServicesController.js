/**
 * ServicesController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const moment = require('moment');
module.exports = {
    add_service: function (req, res) {
        var service_name = req.param('service_name'),
            service_price = req.param('service_price'),
            service_date = req.param('service_date'),
            service_content = req.param('service_content');
        if (!service_name || service_name === '') {
            res.json({
                status: 'error',
                message: 'service_name không hợp lệ'
            })
            return;
        }
        if (!service_price || service_price === '' || service_price < 1) {
            res.json({
                status: 'error',
                message: 'service_price không hợp lệ'
            })
            return;
        }
        if (!service_date || service_date === '') {
            res.json({
                status: 'error',
                message: 'service_date không hợp lệ'
            })
            return;
        }
        if (!service_content || service_content === '') {
            res.json({
                status: 'error',
                message: 'service_content không hợp lệ'
            })
            return;
        }
        var redate = service_date.split('/')[2] + "-" + service_date.split('/')[1] + "-" + service_date.split('/')[0];
        service_date = moment(redate).format('YYYY-MM-DD');
        Services.create({ service_name, service_price, service_date, service_content, service_status: 'disable' }).exec(function (err, created) {
            if (err) {
                console.log(err);
                return;
            }
            if (created) {
                res.json({
                    status: 'success',
                    message: 'Thêm dịch vụ thành công',
                    service: created
                })
            }
        })
    },
    del_service: function (req, res) {
        var service_id = req.param('service_id');
        if (!service_id || service_id === '' || service_id < 1) {
            res.json({
                status: 'error',
                message: 'service_id không hợp lệ'
            })
            return;
        }
        Services.findOne({ service_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Services.destroy({ service_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa dịch vụ thành công'
                    })
                    return;
                })
            }
        })
    },
    list_service: function (req, res) {
        var sql = "SELECT services.service_id, services.service_name,services.service_price,DATE_FORMAT(services.service_date,'%d/%m/%Y') AS service_date,services.service_content, DATE_FORMAT(services.createdAt,'%d/%m/%Y') AS createdAt, services.service_status FROM services";
        Services.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_service thành công',
                    Services: results
                })
                return;
            }
        })
    },
    list_service_enable: function (req, res) {
        var sql = "SELECT services.service_id, services.service_name,services.service_price,DATE_FORMAT(services.service_date,'%d/%m/%Y') AS service_date,services.service_content, DATE_FORMAT(services.createdAt,'%d/%m/%Y') AS createdAt, services.service_status FROM services WHERE services.service_status = 'enable'";
        Services.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET list_service thành công',
                    Services: results
                })
                return;
            }
        })
    },
    get_new: function (req, res) {
        var sql = "SELECT services.service_id, services.service_name,services.service_price,DATE_FORMAT(services.service_date,'%d/%m/%Y') AS service_date,services.service_content, DATE_FORMAT(services.createdAt,'%d/%m/%Y') AS createdAt FROM services ORDER BY services.service_id DESC LIMIT 1";
        Services.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                res.json({
                    status: 'success',
                    message: 'GET new thành công',
                    Services: results
                })
                return;
            }
        })
    },
    update_service: function (req, res) {
        var service_id = req.param('service_id'),
            service_name = req.param('service_name'),
            service_price = req.param('service_price'),
            service_date = req.param('service_date'),
            service_content = req.param('service_content'),
            service_status = req.param('service_status');
        if (!service_id || service_id === '' || service_id < 1) {
            res.json({
                status: 'error',
                message: 'service_id không hợp lệ'
            })
            return;
        }
        if (!service_name || service_name === '') {
            res.json({
                status: 'error',
                message: 'service_name không hợp lệ'
            })
            return;
        }
        if (!service_price || service_price === '' || service_price < 1) {
            res.json({
                status: 'error',
                message: 'service_price không hợp lệ'
            })
            return;
        }
        if (!service_date || service_date === '') {
            res.json({
                status: 'error',
                message: 'service_date không hợp lệ'
            })
            return;
        }
        if (!service_content || service_content === '') {
            res.json({
                status: 'error',
                message: 'service_content không hợp lệ'
            })
            return;
        }
        if (!service_status || service_status === '') {
            res.json({
                status: 'error',
                message: 'service_status không hợp lệ'
            })
            return;
        }
        var redate = service_date.split('/')[2] + "-" + service_date.split('/')[1] + "-" + service_date.split('/')[0];
        service_date = moment(redate).format('YYYY-MM-DD');
        Services.findOne({ service_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                Services.update({ service_id }, { service_name, service_price, service_date, service_content, service_status }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật dịch vụ thành công'
                        })
                        return;
                    }
                })
            }
        })
    }
};

