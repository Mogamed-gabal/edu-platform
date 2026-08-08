import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dtos/PaginationDto';
import { PaginatedResult } from '../interfaces/paginated-result.interface';

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  paginationDto: PaginationDto,
): Promise<PaginatedResult<T>> {
  const page = paginationDto.page ?? 1;
  const limit = paginationDto.limit ?? 10;
  const skip = paginationDto.skip;

  queryBuilder.skip(skip).take(limit);

  const [data, totalItems] = await queryBuilder.getManyAndCount();

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    meta: {
      totalItems,
      itemCount: data.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    },
  };
}
