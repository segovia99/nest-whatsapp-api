import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  phone: string;

  @IsString()
  message: string;
}
