import Controller from './../../interfaces/controller.interface';
import { NextFunction, Request, Response } from 'express';
const nodemailer = require('nodemailer');
const Responses = require('./../../network/responses');
const config = require('./../../../config/config');

class EmailController implements Controller {

    transporter = nodemailer.createTransport({
        service: config.email.service,
        auth: {
            user: config.email.auth.user,
            pass: config.email.auth.password
        }
    });

    sendEmail(card, member: string) {
        console.log('EMAIL');
        console.log('USER', config.email.auth.user);
        console.log('PASS', config.email.auth.password);
        if (!card || !member) {
            return console.log('NO PARAMS');
        }

        const subject = `Card "${card.name}" Deleted`;
        const mailOptions = {
            from: config.email.auth.user,
            to: 'dany84175@gmail.com',
            subject,
            html: `
                    <h1> Card Name: ${card.name}</h1>
                    <p> Description: ${card.desc}</p>
                    <p>Deleted by: ${member}
                `
        }

        this.transporter.sendMail(mailOptions, function (error, info) {
            console.log('EMAIL CALLBACK');
            
            if (error) {
                console.log(error);
            } else {
                console.log('SUCCESS');
                
                console.log('Email sent: ' + info.response);
                // Responses.success(req, res, info.response, 200);
            }
        });

    }

}

const Controller = new EmailController();

module.exports = Controller;