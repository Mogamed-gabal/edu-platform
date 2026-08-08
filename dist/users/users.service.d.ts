import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../shared/dtos/PaginationDto';
import { PaginatedResult } from "../shared/interfaces/paginated-result.interface";
import type { Cache } from 'cache-manager';
import { EntityManager } from 'typeorm';
export declare class UsersService {
    private readonly userRepository;
    private cacheManager;
    constructor(userRepository: UserRepository, cacheManager: Cache);
    create(createUserDto: CreateUserDto, manager?: EntityManager): Promise<User>;
    findAll(pagination: PaginationDto): Promise<PaginatedResult<User>>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<User | boolean>;
}
