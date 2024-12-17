import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

// <database-block>
const idType = Number;
// </database-block>

export class Status {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'active',
  })
  name?: string;
}
