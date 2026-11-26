const axios = require('axios');

// CONFIGURATION - REPLACE THESE VALUES
const OCTANE_API_KEY = 'YOUR_OCTANE_API_KEY_HERE';
const TARGET_CREATOR_ID = 'octane'; // Official creator ID
const API_URL = 'https://api.octane.wtf/v1';

async function checkAndSnipe() {
    console.log('🔍 Checking for new items...');
    
    try {
        // 1. Fetch latest available items
        const res = await axios.get(`${API_URL}/items?status=available&limit=5`, {
            headers: { 'Authorization': `Bearer ${OCTANE_API_KEY}` }
        });

        const items = res.data;

        for (const item of items) {
            // 2. Double-Check Creator
            if (item.creatorId !== TARGET_CREATOR_ID) {
                console.log(`⏭️ Skipped ${item.name}: Not by 'octane'`);
                continue;
            }

            // 3. Auto-Buy
            console.log(`🚀 Sniping ${item.name}...`);
            const buyRes = await axios.post(`${API_URL}/items/${item.id}/buy`, {}, {
                headers: { 'Authorization': `Bearer ${OCTANE_API_KEY}` }
            });

            if (buyRes.status === 200) {
                console.log(`✅ SUCCESS! Bought ${item.name}`);
            } else {
                console.log(`❌ Failed to buy ${item.name}`);
            }
        }
    } catch (error) {
        console.error('💥 Error:', error.message);
    }
}

// Run every 30 seconds
setInterval(checkAndSnipe, 30000);

console.log('✅ Bot Started');