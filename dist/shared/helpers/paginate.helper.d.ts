import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dtos/PaginationDto';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
export declare function paginate<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>, paginationDto: PaginationDto): Promise<PaginatedResult<T>>;
