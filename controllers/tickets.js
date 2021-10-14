const Flight = require('../models/ticket');

module.exports = {
    create,
    new: newTicket
};

function create(req, res) {
    Ticket.findById(req.params.id, function(err, ticket) {
        ticket.flight.push(req.body);
        ticket.save(function(err) {
            res.redirect(`/flights/${req.params.id}`);
        });
    });
}

function newTicket() {

}