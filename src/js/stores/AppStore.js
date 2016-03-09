var AppDispatcher = require('../dispatcher/AppDispatcher')
var AppConstants = require('../constants/AppConstants')
var EventEmitter = require('events').EventEmitter
var assign = require('object-assign')
var AppApi = require('../utils/appApi')

var CHANGE_EVENT = 'change'

var _contacts = []
var _contactToEdit = ''

var AppStore = assign({}, EventEmitter.prototype, {
	getContacts: function() {
		return _contacts
	},
	saveContact: function(contact) {
		_contacts.push(contact)
	},
	setContacts: function(contacts) {
		_contacts = contacts
	},	
	removeContact: function(contactId) {
		var index = _contacts.findIndex(x => x.id == contactId)
		_contacts.splice(index, 1)
	},
	setContactToEdit: function(contact) {
		_contactToEdit = contact
	},
	updateContact: function(contact) {
		for(var i = 0; i < _contacts.length; i++) {
			if(_contacts[i].id == contact.id) {
				_contacts.splice(i , 1)
				_contacts.push(contact)
			}
		}
	},
	getContactToEdit: function(contact) {
		return _contactToEdit
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT)
	},
	addChangeListener: function(done) {
		this.on(CHANGE_EVENT, done)
	},
	removeChangeListener: function(done) {
		this.removeListener(CHANGE_EVENT, done)
	}
})

AppDispatcher.register(function(payload) {
	var action = payload.action
	switch(action.actionType) {
		case AppConstants.SAVE_CONTACT:
			console.log('Saving Contact...')
			AppStore.saveContact(action.contact)
			AppApi.saveContact(action.contact)
			AppStore.emit(CHANGE_EVENT)
			break
		case AppConstants.RECEIVE_CONTACTS:
			console.log('RECEIVE_CONTACTS...')
			AppStore.setContacts(action.contacts)
			AppStore.emit(CHANGE_EVENT)
			break
		case AppConstants.REMOVE_CONTACT:
			console.log('REMOVE_CONTACTS...')
			AppStore.removeContact(action.contactId)
			AppApi.removeContact(action.contactId)
			AppStore.emit(CHANGE_EVENT)
			break
		case AppConstants.EDIT_CONTACT:
			console.log('EDIT_CONTACT...')
			AppStore.setContactToEdit(action.contact)
			AppStore.emit(CHANGE_EVENT)
			break	
		case AppConstants.UPDATE_CONTACT:
			console.log('UPDATE_CONTACT...')
			AppStore.updateContact(action.contact)
			AppApi.updateContact(action.contact)
			AppStore.emit(CHANGE_EVENT)
			break														
	}
	return true
})

module.exports = AppStore