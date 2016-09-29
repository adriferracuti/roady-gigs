var express = require('express');
var router = express.Router();
var request = require('request');

function getUrl(artistName) {
    artistName = encodeURIComponent(artistName);

    return 'http://api.bandsintown.com/artists/' + artistName + '/events.json?api_version=2.0&app_id=hund';
}

router.get('/gigs/:artistName', function (req, res, next) {
    let artistName = req.params.artistName,
        url = getUrl(artistName);

    request.get(url).on('response', (response) => {
        switch (response.statusCode) {
            case 200:
                break;
            case 404:
                //TODO
                break;
            default:
                throw 'Not handled status code';
        }
        response.
        console.log('resp');
        res.send({title: artistName, reqUrl: url});
    });

});

module.exports = router;
