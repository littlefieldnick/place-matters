const {Client} = require("@googlemaps/google-maps-services-js");

function buildGeocodingAddress(resourceInfo){
    return resourceInfo.street + ", " + resourceInfo.city + ", " + resourceInfo.state + ", " + resourceInfo.zip
}

async function geocodeResource(resource) {
    console.log(buildGeocodingAddress(resource));
    let client = new Client({})
    return await client.geocode({
        params: {
            address: buildGeocodingAddress(resource),
            key: process.env.googleMapsApi
        }
    }).then((geocoded) => geocoded.data.results[0].geometry);
}

module.exports = {
    geocodeResource
}