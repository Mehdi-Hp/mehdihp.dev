const { default: axios } = require('axios');

module.exports = async () => {
    try {
        const { data } = await axios.get('https://mehdihp-cms.herokuapp.com/articles');
        console.log(`Found ${data.length} articles`);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
};
