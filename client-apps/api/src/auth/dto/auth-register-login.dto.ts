import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: '1111' })
  @IsNotEmpty()
  nid: string;

  @ApiProperty({ example: 'institution' })
  @IsNotEmpty()
  institution: string;

  @ApiProperty({ example: 'designation' })
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ example: '0722222222' })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;
}
