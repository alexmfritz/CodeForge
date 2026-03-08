import type { Query, Document } from 'mongoose';

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const MAX_PAGE_SIZE = 100;

export function parsePagination(query: Record<string, unknown>): PaginationParams {
  const page = Math.max(1, Number(query.page) || 1);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(query.pageSize) || 25));
  return { page, pageSize };
}

export async function paginate<T extends Document>(
  query: Query<T[], T>,
  params: PaginationParams,
): Promise<PaginatedResult<T>> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 25;
  const skip = (page - 1) * pageSize;

  const [items, totalItems] = await Promise.all([
    query.clone().skip(skip).limit(pageSize).lean(),
    query.clone().countDocuments(),
  ]);

  return {
    items: items as T[],
    page,
    pageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
  };
}
