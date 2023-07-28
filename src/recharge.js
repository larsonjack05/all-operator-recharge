const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/:operator/:circle', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.freecharge.in/mobile-recharge/' + req.params.operator + '-prepaid/' + req.params.circle);

    // Wait for the necessary elements to be rendered on the page
    await page.waitForSelector('.plans-card');
    await page.waitForSelector('.tab-option');
    await page.waitForTimeout(1000); // Wait for 2 seconds before extracting data

    // Extract the data from '.tab-option' div
    const typeElements = await page.$$eval('.tab-option', elements => elements.map(element => element.innerText));

    // Extract the data using Puppeteer
    const jsonData = await page.evaluate((typeElements) => {
      const elements = document.querySelectorAll('.plans-card');
      const data = [];
      let typeIndex = -1;
      const allTypes = []; // Array to store all types

      elements.forEach(element => {
        const innerClassElements = element.querySelectorAll('.heading');
		// Move to the next type when 'plans-card' has class 'first-card'
          if (element.classList.contains('first-card')) {
            typeIndex++;
          }

        if (innerClassElements.length === 3) {
          const jsonItem = {
            type: typeElements[typeIndex],
            price: innerClassElements[0].innerText,
            validity: innerClassElements[1].innerText,
            data: innerClassElements[2].innerText
          };

          data.push(jsonItem);

          
        }
      });

      // Add all types to the array
      for (let i = 0; i <= typeIndex; i++) {
        allTypes.push(typeElements[i]);
      }

      return { allTypes, plans: data };
    }, typeElements); // Pass typeElements to page.evaluate()

    await browser.close();
    res.setHeader('Content-Type', 'application/json');

    // Send the JSON response
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
