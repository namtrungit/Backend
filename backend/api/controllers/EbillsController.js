/**
 * EbillsController
 *
 * @description :: Server-side logic for managing Ebills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_ebill: function (req, res) {
        var ebill_id = req.param('ebill_id'),
            ebill_creater = req.param('ebill_creater'),
            ebill_elec_id = req.param('ebill_elec_id');
        if (!ebill_id || ebill_id === '') {
            res.json({
                status: 'error',
                message: 'ebill_id không hợp lệ'
            })
            return;
        }
        if (!ebill_creater || ebill_creater === '') {
            res.json({
                status: 'error',
                message: 'ebill_creater không hợp lệ'
            })
            return;
        }
        if (!ebill_elec_id || ebill_elec_id === '') {
            res.json({
                status: 'error',
                message: 'ebill_elec_id không hợp lệ'
            })
            return;
        }
        // console.log(1);
        Elecs.findOne({ elec_id: ebill_elec_id }).exec(function (err, find) {
            if (err) {
                console.log(err);
                return;
            }
            if (find) {
                if (find.elec_status === 'disable') {
                    res.json({
                        status: 'warning',
                        message: 'Phiếu điện ' + ebill_elec_id + ' này đã có hóa đơn rồi'
                    })
                    return;
                }
                if (find.elec_status === 'enable') {
                    Ebills.create({ ebill_id, ebill_creater, ebill_elec_id }).exec(function (err, created) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (created) {
                            res.json({
                                status: 'success',
                                message: 'Lập hóa đơn cho phiếu điện ' + ebill_elec_id + ' thành công'
                            })
                            Elecs.update({ elec_id: ebill_elec_id }, { elec_status: 'disable' }).exec(function (err, updated) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (updated) {
                                    console.log('Cập nhật trạng thái phiếu điện thành công')
                                    return;
                                }
                            })
                            return;
                        }
                    })
                }
            }
            else {
                res.json({
                    status: 'warning',
                    message: 'Không có phiếu điện ' + ebill_elec_id + ' trong cơ sở dữ liệu'
                })
                return;
            }
        })
    }
};

