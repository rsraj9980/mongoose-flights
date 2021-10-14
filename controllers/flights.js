const Flight = require('../models/flight');
const Performer = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights });
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    const flight = new Flight(req.body);
    flight.save(function(err) {
        // one way to handle errors
        if (err) return res.render('flights/new');
        console.log(flight);
        // for now, redirect right back to new.ejs
        res.redirect('/flights');
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('flights/show', { flight });
    })
}
// function show(req, res) {
//     Flight.findById(req.params.id, function(err, flight) {
//         Ticket.find({ flight: flight._id }, function(err, tickets) {
//             // Now you can pass both the flight and tickets in the res.render call
//             res.render('flights/show', { flight, tickets });
//         });
//     });
// }