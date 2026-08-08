import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../shared/dtos/PaginationDto';
import { BcryptHelper } from '../shared/helpers/hash.helper';
import { PaginatedResult } from 'src/shared/interfaces/paginated-result.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { DeepPartial, EntityManager } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    manager?: EntityManager,
  ): Promise<User> {
    const existEmail = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existEmail) {
      throw new ConflictException('This user with this email already exist');
    }

    if (createUserDto.phoneNumber) {
      const existPhone = await this.userRepository.findByPhone(
        createUserDto.phoneNumber,
      );
      if (existPhone) {
        throw new ConflictException(
          'This user with this phoneNumber already exist',
        );
      }
    }

    const hashedPassword = await BcryptHelper.hash(createUserDto.password);

    const userData: DeepPartial<User> = {
      ...createUserDto,
      password: hashedPassword,
    };

    if (manager) {
      const repo = manager.getRepository(User);
      const userInstance = repo.create(userData);
      return await repo.save(userInstance);
    }

    return await this.userRepository.create(userData as any);
  }
  async findAll(pagination: PaginationDto): Promise<PaginatedResult<User>> {
    return this.userRepository.findAll(pagination);
  }

  async findOne(id: string): Promise<User> {
    const cachkey = `user_${id}`;
    const cachedUser = await this.cacheManager.get<User>(cachkey);
    if (cachedUser) {
      return cachedUser;
    }
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('There is no user with this id ');
    }
    await this.cacheManager.set(cachkey, user, 6000);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('There is no user with this id ');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await BcryptHelper.hash(updateUserDto.password);
    }
    await this.cacheManager.del(`user_${id}`);
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('There is no user with this id');
    }
    await this.cacheManager.del(`user_${id}`);
    await this.userRepository.softDelete(id);
  }
  async restore(id: string): Promise<User | boolean> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('There is no user with this id to restore');
    }
    await this.cacheManager.del(`user_${id}`);
    return await this.userRepository.restore(id);
  }
}
