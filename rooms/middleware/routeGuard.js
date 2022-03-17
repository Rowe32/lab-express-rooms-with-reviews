const requireLogin = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect("/login");
        return;
    }
    
    // if we don't call next, no other middleware is called, notihing happens until timeout
    next();
};

module.exports = requireLogin;
