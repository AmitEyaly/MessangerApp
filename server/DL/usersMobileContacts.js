const jsonfile = require('jsonfile');

const getData = async () => {
    try {
        const data = await jsonfile.readFile('C:\\Users\\Offix\\Documents\\fullstack\\JS\\whatsappProj\\usersContacts.JSON');
        return data;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

module.exports = { getData };
