/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  login: function(req, res) {
    User.findOneByEmail(req.body.email).done(function(err, user) {
      if (err) return res.json({ error: 'DB error' }, 500);
      if (!user) return res.json({ error: 'User not found'}, 404);
      if (user.password === req.body.password) {
        req.session.user = user.id;
        return res.json(user);
      }
      if (req.session.user) {
        req.session.user = 'invalid';
      }
      return res.json({ error: 'Invalid password'}, 400);
    });
  },

  stats: function(req, res) {
    return res.json({
      user: req.session.user,
      pid: process.pid
    });
  },
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
