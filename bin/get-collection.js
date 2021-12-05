const fs = require('fs').promises;
const {join} = require('path');
const axios = require('axios').default;

require('dotenv').config();

console.log('Getting collection');

(async () => {
    const apiBase = 'https://rebrickable.com/api/v3';
    const apiToken = process.env.REBRICABLE_API_TOKEN;
    const userName = process.env.REBRICABLE_USER;
    const userPassword = process.env.REBRICABLE_PASSWORD;

    if (!userName || !userPassword || !apiToken) {
        console.error('Failed to load rebricable.com credentials');
        process.exit(1);
    }

    try {
        // get user token
        const userTokeParams = new URLSearchParams();
        userTokeParams.append('username', userName);
        userTokeParams.append('password', userPassword);
        const tokenResponse = await axios.post(
            `${apiBase}/users/_token/`,
            userTokeParams,
            {
                headers: {
                    'Authorization': `key ${apiToken}`,
                }
            }
        );
        const token = tokenResponse.data.user_token;

        // get all sets
        const setsUrl = `${apiBase}/users/${token}/sets/`;
        const setResponse = await axios.get(setsUrl, {
            headers: {
                'Authorization': `key ${apiToken}`,
            }
        });

        const resultDb = {};

        setResponse.data.results.forEach((setItem) => {
            const { set } = setItem;

            resultDb[set.set_num] = {
                name: set.name,
                img: set.set_img_url,
            }
        });

        // write DB file
        await fs.writeFile(
            join(__dirname, '..', 'public', 'db.json'),
            JSON.stringify(resultDb),
            {encoding: 'utf-8'}
        );
    } catch (e) {
        console.error(e.message);
        if (e.config && e.config.url) {
            console.error('URL', e.config.url);
            console.error(e);
        }

        process.exit(1);
    }
})()
