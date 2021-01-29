const User = require('../models/user');

module.exports.registerIndex = (req, res) => {
    res.render('users/register');
};

module.exports.createUser = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        let newUser = new User({email, username});
        newUser = await User.register(newUser, password)
        req.login(newUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
};

module.exports.loginIndex = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
};