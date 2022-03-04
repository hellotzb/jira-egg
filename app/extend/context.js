module.exports = {
  get username() {
    const token = this.request.headers.token;
    const tokenCache =
      token && this.app.jwt.verify(token, this.app.config.jwt.secret);
    return tokenCache?.username;
  },
  get userId() {
    const token = this.request.headers.token;
    const tokenCache =
      token && this.app.jwt.verify(token, this.app.config.jwt.secret);
    return tokenCache?.id;
  },
};
