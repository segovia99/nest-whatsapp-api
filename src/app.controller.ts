import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './dto/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sendmessage')
  sendMessage(@Body() messageDto: MessageDto) {
    return this.appService.sendMessages(messageDto);
  }
}
