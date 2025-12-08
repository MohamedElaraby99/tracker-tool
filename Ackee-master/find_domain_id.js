const mongoose = require('mongoose');

// Connection URL from .env (defaulting if not found)
const url = 'mongodb://localhost:27017/ackee';

async function listDomains() {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');

        // Ackee stores domains in a collection (usually 'domains')
        // We can define a minimal schema or just access the collection directly
        const db = mongoose.connection.db;
        const domains = await db.collection('domains').find({}).toArray();

        if (domains.length === 0) {
            console.log('No domains found! You need to create one in the Dashboard (http://localhost:3000) first.');
        } else {
            console.log('\n--- AVAILABLE DOMAINS ---');
            domains.forEach(d => {
                console.log(`Name: ${d.title}`);
                console.log(`ID:   ${d._id}`); // mongo usually uses _id, but Ackee might map it. Let's inspect.
                console.log('-------------------------');
            });
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

listDomains();
