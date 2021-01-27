// go to twilio and create your account to receive your phone number, accountSid and authToken
const puppeteer = require("puppeteer");
const accountSid = 'Enter here accountSid received from twilio';
const authToken = 'Enter here authToken received from twilio';
const client = require("twilio")(accountSid, authToken);

async function automaticChangesChecker(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "networkidle0"
    });
    let codeSource = await page.content();
    // here it's checking one word in the code source, if it's found the code will run again 
    if (codeSource.includes("Indicate here the keyword you want the script to look for inside of the code source")) {
        automaticChangesChecker('https://example.com/');
        console.log('failed');
    } else
    // here it's sending you a message when the word is not found or got removed
    {
        client.messages.create({
            to: 'Enter here th number of the receiver',
            from: 'Enter here your received phone number in twilio',
            body: 'Enter here the message'
        }).then((message) => console.log(message.sid));
    }

    browser.close();
}
automaticChangesChecker('https://example.com/');