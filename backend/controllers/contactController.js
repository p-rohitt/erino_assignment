const Contact = require('../models/contact');

// Create
const createContact = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  
  // Validate
  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ message: 'First Name, Last Name, Email, and Phone Number are required.' });
  }

  try {
    const newContact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact', error: err.message });
  }
};

// Get
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ lastName: 1 });  // Sort by lastName
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error: err.message });
  }
};

// Update 
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, {
      firstName, lastName, email, phoneNumber, company, jobTitle
    }, { new: true });
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact', error: err.message });
  }
};

// Delete 
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contact', error: err.message });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
