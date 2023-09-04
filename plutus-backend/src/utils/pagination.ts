interface PaginationOptions {
    page: number,
    limit: number
}

export const getPagination = ({page, limit}: PaginationOptions) => {
    const offset = (page -1) * limit;
    return {offset, limit}
}