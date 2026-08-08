import { PaginationDto } from './../dtos/PaginationDto';
import {
  Repository,
  ObjectLiteral,
  DeepPartial,
  FindOptionsWhere,
} from 'typeorm';
import {
  IBaseRepository,
  CreateEntityInput,
} from '../interfaces/base-repository.interface';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { paginate } from '../helpers/paginate.helper';

export abstract class BaseRepository<
  T extends ObjectLiteral,
> implements IBaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: CreateEntityInput<T>): Promise<T> {
    const entity = this.repository.create(data as DeepPartial<T>);
    return await this.repository.save(entity);
  }

  async findAll(paginationDto?: PaginationDto): Promise<PaginatedResult<T>> {
    const queryBuilder = this.repository.createQueryBuilder();
    return await paginate<T>(
      queryBuilder,
      paginationDto || new PaginationDto(),
    );
  }

  async findOneById(id: string): Promise<T | null> {
    return await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const entity = await this.findOneById(id);
    if (!entity) return null;

    const updatedEntity = this.repository.merge(entity, data as DeepPartial<T>);
    return await this.repository.save(updatedEntity);
  }
  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return (result.affected ?? 0) > 0;
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore(id);
    return (result.affected ?? 0) > 0;
  }
}
