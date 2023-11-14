export const metaDataConvert = ({
  data,
  total,
  page,
  limit,
}: {
  data: any;
  total: number;
  page: number;
  limit: number;
}) => {
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
