const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  //console.log(req.session.user);
  if(req.session.user) return res.render('login-logado');
  return res.render('login');
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        res.redirect('/login/index');
        return;
      });
      return;
    } else {
      req.flash('success', 'Seu usuário foi criado com sucesso!');
      req.session.save(function () {
        res.redirect('/login/index');
        return;
      });
      return;
    }
   } catch (e) {
    console.log(e);
    this.errors.push('Erro ao registrar usuário');
    res.render('404');
    return;
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        res.redirect('/login/index');
        return;
      });
      return;
    } else {
      req.flash('success', 'Você acesso o sistema!');
      req.session.user = login.user;
      req.session.save(function () {
        res.redirect('/login/index');
        return;
      });
      return;
    }
   } catch (e) {
    console.log(e);
    this.errors.push('Erro ao registrar usuário');
    res.render('404');
    return;
  }
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
}
