/**
 * GET /
 * Learn more page
 */
exports.getLearnMore = (req, res) => {
  res.render('learnmore', { title: 'Learn more' });
};
