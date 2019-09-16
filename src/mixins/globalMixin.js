const common = {
  created() {

  },
  methods: {
    gf_isEmpty(value) {
      console.log('isEmpty 진입!');
      if (value === '' || value === null || value === undefined
                || (value != null && typeof value === 'object' && !Object.keys(value).length)) {
        return true;
      }
      return false;
    },
    parseRtnData(pageSet, rstSet, pageYn) {
      if (pageYn === 'Y') {
        // eslint-disable-next-line
                pageSet.pageCount = rstSet.totalPages;
        // eslint-disable-next-line
                pageSet.pageNo = rstSet.pageable.pageNumber + 1;
        console.log(pageSet);
      }

      return rstSet.content;
    },
  },
};

export default common;
