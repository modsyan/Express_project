class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // filtering the query.params first in a new object then
    const queryObj = { ...this.queryString };
    const excludedFields = ['fields', 'limit', 'sort', 'page'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const queryFiltered = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      )
    );

    //  then get the query upon last filtration
    this.query = this.query.find(queryFiltered);

    return this;
  }

  sort() {
    const sortFields = this.queryString.sort
      ? this.queryString.sort.split.split(',').join(' ')
      : '-createdAt';

    this.query = this.query.sort(sortCarterias);
    return this;
  }

  limitFields() {
    const FieldsSelected = this.queryString.field
      ? this.queryString.field.split(',').join(' ')
      : '-__v'; // removed from the query
    this.query = this.query.select(FieldsSelected);
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 - 1 || 0;
    const limit = this.queryString.limit * 1 || 100;
    this.query = this.query.skip(page * limit).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
