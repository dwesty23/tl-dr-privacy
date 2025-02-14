const axios = require('axios');
const readline = require('readline');
require('dotenv').config();
console.log('API Key:', process.env.BRAVE_API_KEY); // Debugging line


const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const BRAVE_SEARCH_URL = 'https://api.search.brave.com/res/v1/web/search';

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Fetches the top 3 search results from Brave Search API
 * @param {string} query - The search query
 */
async function searchBrave(query) {
    try {
        const response = await axios.get(BRAVE_SEARCH_URL, {
            headers: {
                'Accept': 'application/json',
                'X-Subscription-Token': BRAVE_API_KEY
            },
            params: {
                q: query,
                count: 3
            }
        });

        const results = response.data.web.results;
        if (results && results.length > 0) {
            console.log('\n🔎 Top 3 search results:');
            results.forEach((result, index) => {
                console.log(`\n${index + 1}. ${result.title}`);
                console.log(`   🌐 ${result.url}`);
                console.log(`   📝 ${result.description}`);
            });
        } else {
            console.log('No results found.');
        }
    } catch (error) {
        console.error('❌ Error fetching search results:', error.response ? error.response.data : error.message);
    }
}

// Prompt user for input
rl.question('🔍 Enter your search query: ', (query) => {
    if (query.trim()) {
        searchBrave(query).finally(() => rl.close());
    } else {
        console.log('⚠️ Please enter a valid search term.');
        rl.close();
    }
});
