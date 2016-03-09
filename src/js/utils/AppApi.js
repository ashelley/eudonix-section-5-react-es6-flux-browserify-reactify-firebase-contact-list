var AppActions = require('../actions/AppActions')
var FireBase = require('firebase')
var firebaseUrl = require('../../config')

module.exports = {
	saveContact: function(contact) {
		this.firebaseRef = new FireBase(firebaseUrl)
		this.firebaseRef.push({
			contact: contact
		})
	},
	getContacts: function(contact) {
		this.firebaseRef = new FireBase(firebaseUrl)
		this.firebaseRef.once("value", function(snapshot) {
			var contacts = []
			snapshot.forEach(function(childSnapshot) {
				var contact = {
					id: childSnapshot.key(),
					name: childSnapshot.val().contact.name,
					phone: childSnapshot.val().contact.phone,
					email: childSnapshot.val().contact.email,
				}
				contacts.push(contact)
			})
			AppActions.receiveContacts(contacts)			
		})
	},
	removeContact: function(contactId) {
		this.firebaseRef = new FireBase(fireBaseUrl + "/" + contactId)		
		this.firebaseRef.remove()
	},
	updateContact: function(contact) {
		this.firebaseRef = new FireBase(fireBaseUrl + "/" + contact.id + '/contact')				
		var id = contact.id
		var updatedContact = {
			name: contact.name,
			phone: contact.phone,
			email: contact.email
		}
		this.firebaseRef.update(updatedContact)				
	}
}