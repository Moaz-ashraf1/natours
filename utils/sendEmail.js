const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.from = `moaz ashraf <hello@moaz.com>`;
    this.url = url;
  }

  newTransport() {
    //Create a transporter
    if (process.env.NODE_ENV === 'production') {
      returnnodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
    }
    return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    //Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.convert(html),

      html
    };
    //Actually send the email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcomMessage() {
    await this.send('welcome', 'Welcom to Natours Family!');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (vaild for only 10 minutes) '
    );
  }
};

// const sendEmail = async options => {
//   // 1) Create a transporter
//   // 2) Define the email options
//   // 3) Actually send the email
// };
