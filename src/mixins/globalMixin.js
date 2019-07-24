const common = {
  //   created() {
  //     console.log('common.js mix Created!');
  //   },
  methods: {
    gf_isEmpty(value) {
      console.log('isEmpty 진입!');
      if (value === '' || value === null || value === undefined
                || (value != null && typeof value === 'object' && !Object.keys(value).length)) {
        return true;
      }
      return false;
    },
  },
};

export default common;
