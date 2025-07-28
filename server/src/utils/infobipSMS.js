import pkg from 'follow-redirects';
const { https } = pkg;

export function sendInfobipSMS(to, text) {
    const options = {
        method: 'POST',
        hostname: '2m8nnz.api.infobip.com',
        path: '/sms/2/text/advanced',
        headers: {
            'Authorization': `App ${process.env.INFOBIP_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        maxRedirects: 20
    };

    const postData = JSON.stringify({
        messages: [
            {
                destinations: [{ to }],
                from: process.env.INFOBIP_FROM,
                text
            }
        ]
    });

    return new Promise((resolve, reject) => {
        const req = https.request(options, function (res) {
            let chunks = [];
            res.on("data", chunk => chunks.push(chunk));
            res.on("end", () => {
                const body = Buffer.concat(chunks).toString();
                resolve(body);
            });
            res.on("error", reject);
        });
        req.write(postData);
        req.end();
    });
}