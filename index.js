// Install these in Axios Code before running:
// npm install bplist-parser plist

const fs = require('fs');
const bplist = require('bplist-parser');
const plist = require('plist');
const path = require('path');

// Path to the MobileGestalt binary plist
const srcPath = '/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.mobilegestaltcache/Library/Caches/com.apple.MobileGestalt.plist';

// Destination in your Documents directory
const destPath = path.join(process.env.HOME || '/var/mobile', 'Documents', 'com.apple.MobileGestalt.plist');

(async () => {
    try {
        console.log(`Reading binary plist from: ${srcPath}`);
        const data = fs.readFileSync(srcPath);

        console.log('Parsing binary plist...');
        const parsed = await bplist.parseBuffer(data);

        console.log('Converting to XML format...');
        const xmlData = plist.build(parsed[0]);

        console.log(`Saving XML plist to: ${destPath}`);
        fs.writeFileSync(destPath, xmlData, 'utf8');

        console.log('✅ Done! File saved successfully.');
    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error(err);
    }
})();
