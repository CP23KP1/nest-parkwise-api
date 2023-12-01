import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import querystring from 'querystring';
import axios from 'axios';
import { LINEBody } from './types/line-body.type';

@Injectable()
export class LineService {
  constructor(private readonly configService: ConfigService) {}

  async sendLineNotification(body: LINEBody) {
    await axios({
      method: 'post',
      url: 'https://api.line.me/v2/bot/message/broadcast',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LINE_TOKEN}`,
      },
      data: JSON.stringify(body),
    });
  }
}
