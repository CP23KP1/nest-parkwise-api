import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Staff } from '@prisma/client';
import { APP_NAME } from 'src/shared/constants';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailVerification(staff: Staff, token: string) {
    try {
      const { email, firstname, lastname } = staff;
      await this.mailerService.sendMail({
        to: email,
        subject: 'ยืนยันอีเมลของคุณ',
        text: 'ยืนยันอีเมลของคุณ',
        template: `./confirm_email.hbs`,
        context: {
          confirmedEmailUrl: `${process.env.CLIENT_URL}/confirm-email?token=${token}`,
          companyName: APP_NAME,
          staffName: `${firstname} ${lastname}`,
        },
      });
    } catch (error) {}
  }

  async sendForgotPassword(staff: Staff, token: string) {
    try {
      const { email, firstname, lastname } = staff;
      console.log('email', email);
      console.log('firstname', firstname);
      console.log('lastname', lastname);
      await this.mailerService.sendMail({
        to: email,
        subject: 'รีเซ็ตรหัสผ่านของคุณ',
        text: 'รีเซ็ตรหัสผ่านของคุณ',
        template: `./forgot_password.hbs`,
        context: {
          resetPasswordUrl: `${process.env.CLIENT_URL}/reset-password?token=${token}`,
          companyName: APP_NAME,
          staffName: `${firstname} ${lastname}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
