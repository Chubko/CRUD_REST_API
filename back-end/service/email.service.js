const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../configs/config');
const { statusCodes } = require('../constant');
const templatesInfo = require('../email-templates');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendEmail = async (userEmail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(
                statusCodes.BAD_REQUEST,
                errorMessages.WRONG_ACTION.customCode,
                errorMessages.WRONG_ACTION.message
            );
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: 'No reply',
            to: userEmail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendEmail
};
