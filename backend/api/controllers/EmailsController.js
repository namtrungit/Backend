/**
 * EmailsController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');
module.exports = {
	create: function(req, res) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'namtrung18101996@gmail.com',
              pass: 'ntrung1996'
            }
          });
          
          var mailOptions = {
            from: 'namtrung18101996@gmail.com',
            to: 'vinhkyha1235@outlook.com.vn',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
};

