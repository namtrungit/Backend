/**
 * RulesController
 *
 * @description :: Server-side logic for managing rules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_rule: function (req, res) {
        var rule_name = req.param('rule_name'),
            rule_content = req.param('rule_content');
        if (!rule_name || rule_name === '') {
            res.json({
                status: 'error',
                message: 'rule_name không hợp lệ'
            })
            return
        }
        if (!rule_content || rule_content === '') {
            res.json({
                status: 'error',
                message: 'rule_content không hợp lệ'
            })
            return
        }
        Rules.create({ rule_name, rule_content }).exec(function (err, created) {
            if (err) {
                console.log(err);
                return;
            }
            if (created) {
                res.json({
                    status: 'success',
                    message: 'Thêm điều lệ thành công',
                    rule: created
                })
                return;
            }
        })
    },
    del_rule: function (req, res) {
        var rule_id = req.param('rule_id');
        if (!rule_id || rule_id === '' || rule_id < 1) {
            res.json({
                status: 'error',
                message: 'rule_id không hợp lệ'
            })
            return
        }
        Rules.findOne({ rule_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return
            }
            if (find) {
                Rules.destroy({ rule_id }).exec(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({
                        status: 'success',
                        message: 'Xóa điều lệ thành công'
                    })
                    return;
                })
            }
        })
    },
    update_rule: function (req, res) {
        var rule_id = req.param('rule_id'),
            rule_name = req.param('rule_name'),
            rule_content = req.param('rule_content');
        if (!rule_id || rule_id === '' || rule_id < 1) {
            res.json({
                status: 'error',
                message: 'rule_id không hợp lệ'
            })
            return
        }
        if (!rule_name || rule_name === '') {
            res.json({
                status: 'error',
                message: 'rule_name không hợp lệ'
            })
            return
        }
        if (!rule_content || rule_content === '') {
            res.json({
                status: 'error',
                message: 'rule_content không hợp lệ'
            })
            return
        }
        Rules.findOne({ rule_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return
            }
            if (find) {
                Rules.update({ rule_id }, { rule_name, rule_content }).exec(function (err, updated) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (updated) {
                        res.json({
                            status: 'success',
                            message: 'Cập nhật điều lệ thành công'
                        })
                        return;
                    }
                })
            }
        })
    },
    list_rule: function (req, res) {
        Rules.find().exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                res.json({
                    status:'success',
                    message:'GET list_rule thành công',
                    Rules: find
                })
            }
        })
    }
};

