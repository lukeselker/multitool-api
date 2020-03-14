const puppeteer = require('puppeteer');


exports.checkTimes = async (restaurantCode, partySize, requestedDate, requestedTime) => {
    const browser = await puppeteer.launch();
      const page = await browser.newPage();
    
      await page.goto(`https://www.opentable.com/r/${restaurantCode}`);
      await page.setViewport({
        width: 640,
        height: 1000,
        deviceScaleFactor: 1,
      });
    
      await page.select(`[data-auto="partySizeSelectMenu"]`, partySize) // 6
        await page.click(`[data-auto="expandCalendar"]`)
        await page.click(`[aria-label="${requestedDate}"]`) // Sat, Mar 28, 2020
        await page.select(`[data-auto="timeSlotsSelectMenu"]`, requestedTime) // 2020-03-28T20:00:00
        await page.click(`[data-auto="findATableButton"]`)
        await page.waitFor('.f2cc84a2')
        const times = await page.evaluate(() => Array.from(document.querySelectorAll('[data-auto="timeslot"]'), element => element.textContent));
        
        // await page.screenshot({path: 'reservations.png'});
    
        // close brower when we are done
        await browser.close();
        return {data: times}
}