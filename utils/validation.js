module.exports = {
  validEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  validPassword(password) {
    const re = /^\S{8,16}$/;
    return re.test(password);
  },

  isEmptyOrWhiteSpace(value) {
    const re = /^\s*$/;
    return re.test(value);
  },
  validYearMonth(value) {
    const re = /^([1-9]|1[0-2])\/?([0-9]{4})$/;
    return re.test(value);
  },
  validTelephone(value) {
    const re = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    return re.test(value);
  },
};
