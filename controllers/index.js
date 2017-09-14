const request = require('superagent');

/**
 * GET /
 * Home page.
 */
exports.getIndex = (req, res) => {
  
  res.render('index', { title: 'Welcom\' Home' });
};

/**
 * POST /
 * Add members
 */
exports.addMembers = (req, res) => {
  const mailchimpInstance = process.env.MAILCHIMP_INSTANCE;
  const listUniqueId = process.env.MAILCHIMP_LIST_ID;
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;

  request
    .post(`https://${mailchimpInstance}.api.mailchimp.com/3.0/lists/${listUniqueId}/members/`)
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', `Basic ${new Buffer(`any:${mailchimpApiKey}`).toString('base64')}`)
    .send({
      email_address: req.body.email.toLowerCase(),
      status: 'subscribed'
    })
    .end((err, response) => {
      if (response.body.title === 'Member Exists') {
        req.flash('info', { msg: 'Your email is already in our newsletter list.' });
        res.redirect('/');
      } else if (err !== undefined && err != null) {
        req.flash('errors', { msg: `An error occurred. Unable to add your email in our newsletter. ${err.response.body.detail}` });
        res.redirect('/');
      } else if (response.status < 300 || (response.status === 400)) {
        req.flash('info', { msg: 'Thanks you. Your email has been added to our newsletter list.' });
        res.redirect('/');
      } else {
        res.redirect('/');
      }
    });
};
