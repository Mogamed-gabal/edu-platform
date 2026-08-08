import { PaginationDto } from '../dtos/PaginationDto';
import { PaginatedResult } from './paginated-result.interface';
export type CreateEntityInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export interface IBaseRepository<T> {
    create(data: CreateEntityInput<T>): Promise<T>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResult<T>>;
    findOneById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    softDelete(id: string): Promise<boolean>;
    restore(id: string): Promise<boolean>;
}
