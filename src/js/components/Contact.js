var React = require('react')
var AppActions = require('../actions/AppActions')
var AppStore = require('../stores/AppStore')
var Contact = require('./Contact')

var Contact = React.createClass({
	handleRemove(i, j) {
		AppActions.removeContact(i)
	},	

	handleEdit(i, j) {
		AppActions.editContact(i)
	},

	render: function() {
		return (
			<tr>
				<td>{this.props.contact.name}</td>
				<td>{this.props.contact.phone}</td>
				<td>{this.props.email}</td>
				<td>
					<a href="#" className="btn btn-default" onClick={this.handleEdit.bind(this, this.props.contact)}>Edit</a>
					<a href="#" className="btn btn-danger" onClick={this.handleRemove.bind(this, this.props.contact.id)}>Remove</a>
				</td>

			</tr>
		)
	}
}) 

module.exports = Contact