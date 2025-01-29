import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'stoboltovbot@gmail.com', 
      pass: 'drxg pauv dyak nghj', 
    },
  });

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Заказ" stoboltovbot@gmail.com',
      to,
      subject,
      text,
    });
  }
}
