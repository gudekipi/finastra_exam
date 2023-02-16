import axios from 'axios';


const API_KEY = '42fd226f25a1d4aa3999e076'

export const getCurrencies = async () => {
    try {
        const response = await axios.get('https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json')
        const currencies = response.data;
        return currencies;
    } catch (error) {
        throw new Error('Unable to fetch currencies');
    }
};


export const getConversion = async (from, to) => {
    let response;
    try {
        response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`)
        const conversion = response.data;
        return conversion;
    } catch (error) {
        throw new Error('Unsupported currency type');
    }
};

