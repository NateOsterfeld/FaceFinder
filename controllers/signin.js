
// const handleSignin = (req, res, db, bcrypt) => {
const handleSignin = (db, bcrypt) => (req, res) => { // Optional syntax, debatedly
    // const { email, name } = req.body; Optional destructuring syntax
    if (!req.body.email || !req.body.password) {
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
      .where({email: req.body.email})
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                db.select('*').from('users').where({email: req.body.email})
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('unable to get user'));
            } else {
                res.status(400).json('invalid password or email');
            }
        })
        .catch(err => res.status(400).json('invalid password or email'));
    }

module.exports = {
    handleSignin: handleSignin // could just write handleSignin only if wanted
}