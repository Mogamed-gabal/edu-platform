import { PaginationDto } from '../../../shared/dtos/PaginationDto';
export declare class GetMessagesQueryDto extends PaginationDto {
    page?: number;
    limit?: number;
}
