// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

exports.lambdaHandler = async (event) => {

    const browser = await puppeteer.launch({
        headless: true,
        // executablePath: '/usr/bin/google-chrome-stable',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '-–disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
        ]
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1080,
        height: 2000
    });

    // await page.goto('https://weather.yahoo.co.jp/weather/');
    await page.goto('https://weather.yahoo.co.jp/weather/jp/7.html?day=1');

    const rect = await page.evaluate(() => {
        const rect = document.getElementById("map").getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
        }
    });

    buff = await page.screenshot({
        clip: rect
    });

    buff = await sharp(buff).resize(320, 240).png().toBuffer();

    base64 = buff.toString('base64');

    await browser.close();

    const response = {
        statusCode: 200,
        headers: {
            'Content-Length': Buffer.byteLength(base64),
            'Content-Type': 'image/png',
            'Content-disposition': 'attachment;filename=weather.png'
        },
        isBase64Encoded: true,
        body: base64
    };
    return response;
};
