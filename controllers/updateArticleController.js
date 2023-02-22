const { patchArticle } = require('../models/patchArticleModel.js')

const updateArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    patchArticle(article_id, inc_votes)
        .then((article) => {
            res.status(200).send({ article });
        })
        .catch((err) => {
            next(err);
        });
}



module.exports = { updateArticle }