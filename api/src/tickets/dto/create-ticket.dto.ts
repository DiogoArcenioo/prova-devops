import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'CH-002' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Problema na impressora' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'A impressora nao esta funcionando.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'alta', enum: ['baixa', 'media', 'alta'] })
  @IsIn(['baixa', 'media', 'alta'])
  priority: string;
}
