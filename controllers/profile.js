
const handleProfile = (req, res) => {
    db('users').where('id', req.params.id)
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('no user found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
}

module.exports = {
    handleProfile: handleProfile
}