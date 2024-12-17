import { Exclude, Expose } from 'class-transformer';
import { Role } from '../../roles/domain/role';
import { Status } from '../../statuses/domain/status';
import { ApiProperty } from '@nestjs/swagger';

// <database-block>
const idType = Number;
// </database-block>

export class User {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiProperty({
    type: String,
    example: '1111',
  })
  nid?: string | null;

  @ApiProperty({
    type: String,
    example: 'test',
  })
  institution?: string | null;

  @ApiProperty({
    type: String,
    example: 'test',
  })
  designation?: string | null;

  @ApiProperty({
    type: String,
    example: '07222222',
  })
  mobile?: string | null;

  @ApiProperty({
    type: Object,
    example: {},
  })
  consent?: any;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  allConsentGiven?: boolean;

  @ApiProperty({
    type: () => Role,
  })
  role?: Role | null;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
