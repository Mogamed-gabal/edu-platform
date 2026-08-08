import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/PaginationDto';

export class GetMessagesQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of messages per page',
    default: 10,
  })
  limit?: number = 10;
}
