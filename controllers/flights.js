const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

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

function getDefaultDate() {
    let dt = new Flight().departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
    departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;
    return departsDate;
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: req.params.id }, function(err, tickets) {
            res.render("flights/show", {
                flight,
                title: "Details",
                destDate: getDefaultDate(),
                tickets
            });
        });
    });
}