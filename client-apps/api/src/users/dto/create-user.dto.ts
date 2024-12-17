import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  lastName: string | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  @ApiPropertyOptional({ example: '1111' })
  @IsOptional()
  @IsNotEmpty()
  nid?: string | null;

  @ApiPropertyOptional({ example: 'institution' })
  @IsOptional()
  @IsNotEmpty()
  institution?: string | null;

  @ApiPropertyOptional({ example: 'designation' })
  @IsOptional()
  @IsNotEmpty()
  designation?: string | null;

  @ApiPropertyOptional({ example: '0722222222' })
  @IsOptional()
  @IsNotEmpty()
  mobile?: string | null;

  @ApiPropertyOptional({ example: {} })
  @IsOptional()
  @IsNotEmpty()
  consent?: any;
}
