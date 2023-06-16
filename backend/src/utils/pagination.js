const getPagination = ({ page = 1, size = 10 }) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 1;
  return { limit, offset };
};

const getPagingData = (initData, page, limit) => {
  const { count, rows } = initData;
  const currentPage = page ? page : 1;
  const pages = Math.ceil(count / limit);
  return { rows, count, pages, currentPage };
};

module.exports = { getPagination, getPagingData };
