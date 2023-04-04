import nodemailer from 'nodemailer';

export const sendMessage = async (email, message) => {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email", // process.env.MAILER_HOST
        port: 587, // process.env.MAILER_PORT
        secure: false,
        auth: {
            user: testAccount.user, // process.env.MAILER_USER
            pass: testAccount.pass, // process.env.MAILER_PASS
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "oprokidnev@gmail.com", // list of receivers  email
      subject: "Hello ✔", // Subject line
      text: message, // plain text body
    });
    // @todo comment
    const preview = nodemailer.getTestMessageUrl(info)
    return preview;
}