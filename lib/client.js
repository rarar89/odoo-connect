'use strict';
const request = require('./request');
const response = require('./response');

class OdooClient {

	constructor(connection, opts) {
		this._connection = connection;
		this._opts = opts;
	}

	search(model, args) {
		const body = {
			model,
			method: 'search',
			args: [args],
			kwargs: {
				context: this._connection.user_context
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	searchRead(model, args, params) {
		params = params || {};

		const body = {
			model,
			method: 'search_read',
			args: [args],
			kwargs: {
				context: this._connection.user_context,
				offset: params.offset || 0,
				limit: params.limit || 5,
				order: params.order,
				fields: params.select
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	searchCount(model, args, params) {
		params = params || {};

		const body = {
			model,
			method: 'search_count',
			args: [args],
			kwargs: {
				context: this._connection.user_context
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	create(model, args) {
		const body = {
			model,
			method: 'create',
			args: [args],
			kwargs: {
				context: this._connection.user_context
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	remove(model, args) {
		const body = {
			model,
			method: 'unlink',
			args: [args],
			kwargs: {
				context: this._connection.user_context
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	update(model, args, params) {
		const body = {
			model,
			method: 'write',
			args: args,
			kwargs: Object.assign({
				context: this._connection.user_context
			}, params)
		};

		return request(this._opts, body).then(response.parse);
	}

	call(model, method, args, params) {
		const body = {
			model,
			method,
			args: [args],
			kwargs: Object.assign({
				context: this._connection.user_context
			}, params)
		};

		return request(this._opts, body).then(response.parse);
	}
}

module.exports = OdooClient;
