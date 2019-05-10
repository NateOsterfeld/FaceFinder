const Clarifai = require('clarifai');

// Keep 'API key' on back end so it doesn't have to be sent over the server to be seen in the body of the request in the network tab/browser tools
const app = new Clarifai.App({
    apiKey: '828b44bbf31348a89dd3244c90ce2af0'
   });

const handleApiCall = (req, res) => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}
const handleImage = (req, res, db) => {
    db('users').where({ id: req.body.id })
    .increment({entries: 1})
    .returning(['id', 'name', 'email', 'entries', 'joined'])
    .then(response => {
        res.json(response[0]);
    })
    .catch(err => res.status(400).json('entry failed'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}