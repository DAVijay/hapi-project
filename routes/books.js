'use strict';
var BookModel = require('../models/books');
const Joy = require('joi');
exports.register = function (server, options, next) {

    //All functions are here
    //1:GET all books
    server.route({
        method: 'GET',
        path: '/books',
        handler: function (request, reply) {

            var book = BookModel.find(function (err) {

                if (err) {
                    return reply('Internal MongoDB error');
                }
            });
            return reply(book);
        }
    });

    //2:GET specific book
    server.route({
        method: 'GET',
        path: '/books/{id}',
        handler: function (request, reply) {

            BookModel.findOne({
                _id: request.params.id
            }, (err, doc) => {

                if (err) {
                    return reply('Internal MongoDB error');
                }
                if (!doc) {
                    return reply('notFound');
                }
                return reply(doc);
            });
        }
    });

    //3:Create new books
    server.route({
        method: 'POST',
        path: '/books',
        handler: function (request, reply) {
            var book = new BookModel(JSON.parse(JSON.stringify(request.payload)));
            console.log(book);
            book.save(function (err) {
                if (err) {
                    return reply('Internal MongoDB error');
                }
            });
            return reply('user saved');
        },
        config: {
            validate: {
                payload: {
                    name: Joy.string().min(2).max(40).alphanum().required(),
                    author: Joy.string().max(15).required(),
                    price: Joy.number()
                }
            }
        }
    });

    //4:Delete book specific
    server.route({
        method: 'DELETE',
        path: '/books/{id}',
        handler: function (request, reply) {

            BookModel.deleteOne({
                name: request.params.id
            }, function (err, result) {

                if (err) {
                    return reply('Internal MongoDB error');
                }

                if (result.n === 0) {
                    return reply('notFound');
                }
                return reply('Books deleted...!!');
            });
        }
    });

    //4:Update book specific
    server.route({
        method: 'PUT',
        path: '/books/{id}',
        handler: function (request, reply) {

            BookModel.findOneAndUpdate({
                name: request.params.id
            }, request.payload,
                function (err, result) {

                    if (err) {
                        return reply('Internal MongoDB error');
                    }

                    if (result === 0) {
                        return reply('notFound');
                    }
                    return reply('Books updated...!!');
                });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-books'
};