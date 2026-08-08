import { SelectQueryBuilder } from 'typeorm';
import { paginate } from './paginate.helper';
import { PaginationDto } from '../dtos/PaginationDto';

describe('paginate Helper', () => {
  let mockQueryBuilder: jest.Mocked<SelectQueryBuilder<unknown>>;

  beforeEach(() => {
    mockQueryBuilder = {
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
    } as unknown as jest.Mocked<SelectQueryBuilder<unknown>>;
  });

  it('should paginate items correctly with default options', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    const totalItems = 25;

    mockQueryBuilder.getManyAndCount.mockResolvedValue([mockData, totalItems]);

    const paginationDto: PaginationDto = {
      page: 1,
      limit: 10,
      skip: 0,
    };

    const result = await paginate(mockQueryBuilder, paginationDto);

    // استخدام jest.spyOn لتفادي unbound-method warning
    expect(jest.spyOn(mockQueryBuilder, 'skip')).toHaveBeenCalledWith(0);
    expect(jest.spyOn(mockQueryBuilder, 'take')).toHaveBeenCalledWith(10);

    expect(result).toEqual({
      data: mockData,
      meta: {
        totalItems: 25,
        itemCount: 2,
        itemsPerPage: 10,
        totalPages: 3,
        currentPage: 1,
      },
    });
  });

  it('should use fallback values when page and limit are missing', async () => {
    const mockData = [{ id: 1 }];
    const totalItems = 5;

    mockQueryBuilder.getManyAndCount.mockResolvedValue([mockData, totalItems]);

    const paginationDto = {} as PaginationDto;

    const result = await paginate(mockQueryBuilder, paginationDto);

    expect(jest.spyOn(mockQueryBuilder, 'take')).toHaveBeenCalledWith(10);
    expect(result.meta.currentPage).toBe(1);
    expect(result.meta.itemsPerPage).toBe(10);
    expect(result.meta.totalPages).toBe(1);
  });

  it('should calculate totalPages correctly when items divide evenly', async () => {
    mockQueryBuilder.getManyAndCount.mockResolvedValue([[], 30]);

    const paginationDto: PaginationDto = {
      page: 2,
      limit: 10,
      skip: 10,
    };

    const result = await paginate(mockQueryBuilder, paginationDto);

    expect(result.meta.totalPages).toBe(3);
  });
});
