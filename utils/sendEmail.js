const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'moaza2298@gmail.com',
      pass: 'xigeqmnblrajmtmu'
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'moaza2298@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
