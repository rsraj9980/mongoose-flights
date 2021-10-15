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
        res.redirect(`/flights/${req.params.id}`);
    });
}

function newTicket(req, res) {
    res.render('tickets/new', { flightId: req.params.id });
}