var express = require('express');
var router = express.Router();
var request = require('request');
var processResponse = require('../service');

router.get('/gigs', function (req, res) {
    let artistNames = JSON.parse(req.query.artists);

    Promise.all((artistNames.map(getData))).then(function (gigsGroups) {
        let gigs = [];
        gigsGroups.forEach(function (gigsGroup) {
            if (gigsGroup) {
                gigs = [...gigs, ...gigsGroup];
            }
        });
        res.send(gigs);
    });
});

router.get('/favicon.ico', function (req, res) {
    res.send({});
});

function getUrl(artistName) {
    artistName = encodeURIComponent(artistName);

    return 'http://api.bandsintown.com/artists/' + artistName + '/events.json?api_version=2.0&app_id=hund';
}

function getData(artistName) {
    const url = getUrl(artistName);
    return new Promise(function (resolve, reject) {
        request(url, function(err, response, body) {
            let gigs = processResponse(response, body);
            resolve(gigs);
        });
    });
}

module.exports = router;
