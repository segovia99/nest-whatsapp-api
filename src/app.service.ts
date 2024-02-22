import { BadRequestException, Injectable } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class AppService extends Client {
  private status = false;
  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process', // <- this one doesn't works in Windows
          '--disable-gpu',
        ],
      },
    });
    try {
      console.log('Starting....');

      this.initialize();

      this.on('ready', () => {
        this.status = true;
        console.log('LOGIN_SUCCESS');
      });

      this.on('auth_failure', () => {
        this.status = false;
        console.log('LOGIN_FAIL');
      });

      this.on('qr', (qr) => {
        console.log('scan qr');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('qrcode-terminal').generate(qr, { small: true });
      });

      this.on('disconnected', async () => {
        this.status = false;
        console.log('disconnected');
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendMessages(messageDto: MessageDto) {
    if (!this.status) throw new BadRequestException('WAIT_LOGIN');

    try {
      const { message, phone } = messageDto;
      await this.sendMessage(`${phone}@c.us`, message);
      return { message: 'sent', phone };
    } catch (e) {
      throw new BadRequestException('SEND_MESSAGE_FAIL');
    }
  }
}
