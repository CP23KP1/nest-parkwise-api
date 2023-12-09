import { PageMeta } from 'src/shared/types/page-meta.type';

export const metaDataConvert = <Type>({
  data,
  total,
  page,
  limit,
}: PageMeta<Type>) => {
  return {
    data: data,
    meta: {
      page: page,
      take: limit,
      itemCount: total,
      pageCount: Math.ceil(total / limit),
    },
  };
};
