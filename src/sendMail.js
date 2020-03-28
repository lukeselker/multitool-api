const sgMail = require('@sendgrid/mail');

exports.send = async () => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'luke.selker@gmail.com',
        from: 'noreply@openTableChecker.com',
        subject: `You've got mail from the MultiTool API!`,
        text: `Check it out, we sendin' now`,
        html: `<strong>Check it out, we sendin' now</strong>`,
      };
    try {
        await sgMail.send(msg)
    } catch (err) {
        console.error(err.toString());
    }
}