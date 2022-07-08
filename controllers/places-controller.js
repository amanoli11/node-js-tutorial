const HttpError = require('../models/http-error')

let DUMMY_PLACES = [
    {
        id: 'p1',
        name: 'Aman Oli',
        country: "America",
        description: "Software Engineer at America"
    }
]

function getPlacesById(req, res, next) {

    const placeId = req.params.pid
    const places = DUMMY_PLACES.filter(p => {
        return p.id === placeId
    });

    if (!places || places.length === 0){
        // return res.status(404).json({message: "COULDNT FIND"})
        throw new HttpError('COULDNT FIND', 404)
    }

    console.log('GET REQUEST RUNNING');
    res.json(places);
}



const getUserByCountry = (req, res, next) => {
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.country === userId
    })

    if (!place){
        return next(
            new HttpError("COULDNT FIND", 404)
        )
    }

    res.json({place})
}


function createPlace(req, res, next) {
    const {id, country, description} = req.body;
    const createdPlace = {
        id: id,
        name: 'Aman Oli',
        country: country,
        description: description
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace})

};


function updatePlace(req, res, next) {
    const {id, description, country} = req.body;
    const placeId = req.params.pid

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId)}
    console.log(updatedPlace)
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId) 
    updatedPlace.description = description
    updatedPlace.country = country

    DUMMY_PLACES[placeIndex] = updatedPlace

    res.status(200).json({place: updatedPlace})
}


function deletePlace(req, res, next) {
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== req.params.pid)
    res.status(200).json({message: "DELETED"})
}

exports.getPlacesById = getPlacesById;
exports.getUserByCountry = getUserByCountry;
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace