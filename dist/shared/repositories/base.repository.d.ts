import { PaginationDto } from './../dtos/PaginationDto';
import { Repository, ObjectLiteral } from 'typeorm';
import { IBaseRepository, CreateEntityInput } from '../interfaces/base-repository.interface';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
export declare abstract class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    create(data: CreateEntityInput<T>): Promise<T>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResult<T>>;
    findOneById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    softDelete(id: string): Promise<boolean>;
    restore(id: string): Promise<boolean>;
}
