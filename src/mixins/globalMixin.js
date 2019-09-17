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
    dateToString(format, offset) {
      const offRtnDate = new Date();

      if (offset != null && offset !== '') {
        const lastChar = offset.charAt(offset.length - 1);
        const offsetValue = offset.slice(0, -1);

        switch (lastChar) {
          case 'd':
            offRtnDate.setDate(format.getDate() + parseInt(offsetValue, 10));
            break;

          case 'm':
            offRtnDate.setMonth(format.getMonth() + parseInt(offsetValue, 10));
            break;

          case 'y':
            offRtnDate.setYear(format.getFullYear() + parseInt(offsetValue, 10));
            break;
        }
      }

      const year = offRtnDate.getFullYear();
      let month = offRtnDate.getMonth() + 1;
      let date = offRtnDate.getDate();
      let hour = offRtnDate.getHours();
      let min = offRtnDate.getMinutes();
      let sec = offRtnDate.getSeconds();


      if (month < 10) month = `0${month}`;
      if (date < 10) date = `0${date}`;
      if (hour < 10) hour = `0${hour}`;
      if (min < 10) min = `0${min}`;
      if (sec < 10) sec = `0${sec}`;


      return year + month + date;
    },
    stringToDate(str, ylen) {
      // default value setting : 4 length
      if (ylen == null || ylen === 0) {
        ylen = 4;
      }
      if (ylen !== 2 && ylen !== 4) {
        return new Date();
      }

      str = str.replace(/\-/g, '');

      const year = str.substr(0, ylen);
      const month = str.substr(ylen, 2);
      const date = str.substr(ylen + 2, 2);

      return new Date(year, month, date);
    },
  },
};

export default common;
