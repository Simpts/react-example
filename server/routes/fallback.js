const FALLBACK_PAGE = "/";

export default app => {
  app.get("*", (_, res) => {
    res.redirect(FALLBACK_PAGE);
  });
};
