const { readFile, writeFile } = require('fs').promises;
const { log } = require('console');
const { nanoid } = require('nanoid');
const path = require('path');
const contactsPath = path.join('db', 'contacts.json')

async function listContacts() {
    const ReadResult = await readFile(contactsPath)
    return JSON.parse(ReadResult)

}
async function getContactById(contactId) {
    const all = await listContacts()
    const searcedContact = await all.find(item => item.id === contactId)
    return searcedContact || null
}

async function removeContact(contactId) {
    const all = await listContacts()
    const index = await all.findIndex(item => item.id === contactId)

    if (index === -1) { return null }

    const [result] = all.splice(index, 1)

    await writeFile(contactsPath, JSON.stringify(all, null, 2))

    return result

}
async function addContact(name, email, phone) {
    const all = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    all.push(newContact)
    await writeFile(contactsPath, JSON.stringify(all, null, 2))
    return all
}

module.exports = { listContacts, getContactById, removeContact, addContact }