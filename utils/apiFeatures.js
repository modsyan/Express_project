
class APIFeatures {
  constructor(query, queryStr) { // taking the whole requset
    this.queryStr = reqQuery;
    this.queryStr = queryStr;
  }

  // filter() {
  //   const queryObj = { ...this.reqQuery };
  //   const excludedFields = ['page', 'sort', 'limit', 'fields'];
  //   excludedFields.forEach(el => delete queryObj[el]);

  //   // 1B) Advanced filtering
  //   let queryStr = JSON.stringify(queryObj);
  //   req = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  //   this.query = this.query.find(JSON.parse(queryStr));

  //   return this;
  // }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['fields', 'limit', 'sort', 'page'];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.queryStr = JSON.parse(
      JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );
    this.query = query.find(this.queryStr);
    return this;
  }

  sort() {
    const sortCarterias = reqQuery.sort
      ? this.queryStr.sort.split.split(',').join(' ')
      : '-createdAt';

    this.query = this.query.sort(sortCarterias);
    return this;
  }

  limitFields() {
    const FieldsSelcted = this.queryStr.field
      ? this.queryStr.field.split(',').join(' ')
      : '-__v'; // removed from the query 

    this.query = this.query.select(FieldsSelcted);
    return this;
  }

  paginate() {
    const page = (this.queryStr.page * 1) - 1 || 0;
    const limit = this.queryStr.limit * 1 || 100;
    this.query = this.query.skip(page * limit).limit(limit);
    // error handling here to avoid accessing page not exsist <---- remmberr
    return this;
  }

}

module.exports = APIFeatures;
