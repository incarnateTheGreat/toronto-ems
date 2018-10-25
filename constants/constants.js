// Constants
const REFRESH_TIME = 180000;
const SERVER_PATH = 'https://www.toronto.ca/data/fire/livecad.xml';
const LIST_OF_TORONTO_CODES = {
    NY: 'North York',
    ET: 'Etobicoke',
    SC: 'Scarborough',
    TT: 'Toronto',
    YK: 'York'
};

module.exports = {
    LIST_OF_TORONTO_CODES,
    REFRESH_TIME,
    SERVER_PATH
};
