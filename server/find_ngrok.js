async function findNgrokUrl() {
    try {
        const response = await fetch('http://127.0.0.1:4040/api/tunnels');
        const data = await response.json();
        const publicTunnel = data.tunnels.find(t => t.public_url.startsWith('https'));

        if (publicTunnel) {
            console.log('✅ Found Public URL:', publicTunnel.public_url);
        } else {
            console.log('❌ No HTTPS tunnel found active.');
        }
    } catch (error) {
        console.error('❌ Could not connect to ngrok dashboard (is it running?):', error.message);
    }
}

findNgrokUrl();
