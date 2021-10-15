const Flight = require('../models/flight');
const Ticket = require('../models/ticket');


module.exports = {
    create,
    new: newTicket
};

function create(req, res) {
    const ticket = new Ticket(req.body);
    ticket.flight = req.params.id;
    ticket.save(function(err) {
        res.redirect(`/flights/${flight._id}`);
    });
}


// function create(req, res) {
//     Flight.findById(req.params.id, function(err, flight) {
//         Ticket.find({ flight: req.params.id }, function(err, tickets) {
//             res.redirect(`/flights/${req.params.id}`, {
//                 seat,
//                 price
//             });
//         });
//     });
// }

function newTicket(req, res) {
    res.render('tickets/new', { flightId: req.params.id });
}