"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
async function paginate(queryBuilder, paginationDto) {
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
//# sourceMappingURL=paginate.helper.js.map