module.exports = {
  get username() {
    const token = this.request.headers.token;
    return token && this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
};
