const puppeteer = require('puppeteer');


exports.checkTimes = async (restaurantURL, partySize, requestedDate, requestedTime) => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();
    
      await page.goto(restaurantURL);
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
        // wait for either successful available times (.f2cc84a2), or message that no times are available (.fd4148d6)
        await page.waitFor(() => 
            document.querySelectorAll('.f2cc84a2, .fd4148d6' ).length
          );

        const times = await page.evaluate(() => Array.from(document.querySelectorAll('[data-auto="timeslot"]'), element => element.textContent));
        
        // screenshot of results if we want it.
        // await page.screenshot({path: 'reservations.png'});
    
        // close brower when we are done
        await browser.close();
        return {data: times}
}