const config = require('../config/');

module.exports = (curPg, total) => {
  const limit = config['paginate'].default;
  let nPages = Math.floor(total / limit);
  if (total % limit > 0)
    nPages++;

  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrentPage: i === curPg
    });
  }

  const hasPrevPage = curPg > 1;
  const hasNextPage = curPg < nPages;

  return {
    total,
    nPages, page_numbers,
    hasPrevPage,
    prevPage: curPg - 1,
    hasNextPage,
    nextPage: curPg + 1
  }
}
