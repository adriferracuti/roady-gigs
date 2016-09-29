function processResponse(response, body) {
    let gigs;

    switch (response.statusCode) {
        case 200:
            gigs = process200(JSON.parse(body));
            break;

        case 404:
            gigs = process404();
            //TODO
            break;

        default:
            return null;
    }

    return gigs;
}

function process200(rawGigs) {
    if (rawGigs.length === 0) {
        return null;
    }

    return rawGigs.map(function(rawGig) {
        return {
            artists: getArtists(rawGig.artists),
            dateTime: rawGig.datetime,
            place: rawGig.venue.place,
            country: rawGig.venue.country,
            city: rawGig.venue.city,
            latitude: rawGig.venue.latitude,
            longitude: rawGig.venue.longitude,
            ticketUrl: rawGig.ticket_url
        };
    });
}

function process404() {
    return null;
}

function getArtists(rawArtists) {
    return rawArtists.map(function (rawArtist) {
         return {
            name: rawArtist.name,
            imgUrl: rawArtist.image_url
         };
    });
}

module.exports = processResponse;
