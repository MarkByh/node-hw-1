
const { listContacts, getContactById, removeContact, addContact } = require('./contacts')
const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <number>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const ContactList = await listContacts();
            return console.log(ContactList);

        case 'get':
            const contact = await getContactById(id);
            return console.log(contact);

        case 'add':
            const addedContact = await addContact(name, email, phone)
            return console.log(addedContact);

        case 'remove':
            const removedContact = await removeContact(id)
            return console.log(removedContact);

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);