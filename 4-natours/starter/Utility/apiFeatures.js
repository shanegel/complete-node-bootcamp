class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //From mongoose
    this.queryString = queryString; //path|url from express
  }

  //API QUERIES
  filter() {
    const queryObj = { ...this.queryString };
    const removeProps = ['page', 'sort', 'limit', 'feilds'];
    removeProps.forEach((props) => delete queryObj[props]);
    //console.log(queryObj);

    //BUILD ADVANCE QUERY
    let advQuery = JSON.stringify(queryObj);
    advQuery = advQuery.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    const result = JSON.parse(advQuery);

    //STORE QUERY
    this.query = this.query.find(result);
    //let query = Tour.find(result);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFeilds() {
    if (this.queryString.feilds) {
      const feilds = this.queryString.feilds.split(',').join(' ');
      //feilds = ['name', 'price','description',]
      this.query = this.query.select(feilds);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    //console.log(skip);

    this.query = this.query.skip(skip).limit(limit);

    //END OF PAGE(Functional Approach)
    // if (req.query.page) {
    //   const numDocs = await Tour.countDocuments();
    //   if (skip >= numDocs) {
    //     throw new Error('You have reached the end of the page');
    //   }
    // }
    return this;
  }
}

module.exports = APIFeatures;
