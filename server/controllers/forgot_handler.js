const mailer = require('../services/mailer');

exports.forgotPassword = function(req, res, next) {
  const { email } = req.body;

  // before submitting we want to send a request to the database, getting the user e-mail
  // if there's an invalid e-mail, we stop
  mailer.sendMail(email, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};