const fallbackPage = "/";

export default app => {
    app.get("*", (_, res) => {
        res.redirect(fallbackPage)
    });
}
