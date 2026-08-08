import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../shared/dtos/PaginationDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<import("./entities/user.entity").User>>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User | null>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<boolean | import("./entities/user.entity").User>;
}
