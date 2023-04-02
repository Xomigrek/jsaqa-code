const { expect } = require("chai");
const { clickElement, getText, clickElementAndGetText } = require("./lib/commands.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
    page.close();
});

describe("Booking tests", () => {

    test("Вooking one ticket", async () => {
        const expectedFilm = await getText(page, ".movie__title");
        const expectedTime = await clickElementAndGetText(page, ".movie-seances__time-block .movie-seances__time:not(.acceptin-button-disabled)");
        await clickElement(page, ".buying-scheme__wrapper span:not(.buying-scheme__chair_taken)");
        await clickElement(page, ".acceptin-button");

        actualFilm = await getText(page, ".ticket__title");
        actualTime = await getText(page, ".ticket__start");

        expect(page.url()).to.equal("http://qamid.tmweb.ru/client/payment.php");
        expect(actualFilm).to.equal(expectedFilm);
        expect(actualTime).to.equal(expectedTime);
      });

      test("Вooking one ticket on another day", async () => {
        await clickElement(page, ".page-nav__day:nth-child(4)");
        const expectedFilm = await getText(page, ".movie:nth-child(2) .movie__title");
        const expectedTime = await clickElementAndGetText(page, ".movie:nth-child(2) .movie-seances__time-block");
        await clickElement(page, ".buying-scheme__wrapper span:not(.buying-scheme__chair_taken)");
        await clickElement(page, ".acceptin-button");

        actualFilm = await getText(page, ".ticket__title");
        actualTime = await getText(page, ".ticket__start");

        expect(page.url()).to.equal("http://qamid.tmweb.ru/client/payment.php");
        expect(actualFilm).to.equal(expectedFilm);
        expect(actualTime).to.equal(expectedTime);
      });

      test("The sad path test'", async () => {
            await clickElement(page, ".movie-seances__time-block .movie-seances__time:not(.acceptin-button-disabled)");
            await clickElement(page, ".buying-scheme__chair_taken");
            const button = await page.$eval(".acceptin-button", link => link.disabled);
            expect(button).equal(true);
      });

}, 6000);