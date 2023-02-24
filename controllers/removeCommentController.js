const { deleteComment } = require('../models/deleteCommentModel.js')

const { getCommentByCommentId } = require('../models/getCommentByCommentIdModel.js')


const removeComment = (req, res, next) => {
    const { comment_id } = req.params;

    getCommentByCommentId(comment_id)
        .then(() => {
            return deleteComment(comment_id)
        }).then(() => {
            res.sendStatus(204);
        })
        .catch(next);

}


module.exports = { removeComment }