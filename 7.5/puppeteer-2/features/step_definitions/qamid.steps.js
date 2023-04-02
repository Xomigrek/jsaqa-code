const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 300 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
    });

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the start page", async function () {
    return await this.page.goto("http://qamid.tmweb.ru/client/index.php", {
      setTimeout: 200000000,
    });
});

When("user select the first available time", async function () {
    return await clickElement(this.page, ".movie-seances__time-block .movie-seances__time:not(.acceptin-button-disabled)");
});

When("user select the first not taken chair", async function () {
    return await clickElement(this.page, ".buying-scheme__wrapper span:not(.buying-scheme__chair_taken)");
});

When("user select the first taken chair", async function () {
    return await clickElement(this.page, ".buying-scheme__chair_taken");
});

When("user push booking button", async function () {
    return await clickElement(this.page, ".acceptin-button");
});

When("user select the third following day", async function () {
    return await clickElement(this.page, ".page-nav__day:nth-child(4)");
});

When("user select the second available time", async function () {
    return await clickElement(this.page, ".movie:nth-child(2) .movie-seances__time-block");
});

Then("user is on the payment page", async function () {
    expect(this.page.url()).to.equal("http://qamid.tmweb.ru/client/payment.php");
});

Then("booking button is disabled", async function () {
    const button = await this.page.$eval(".acceptin-button", link => link.disabled);
    expect(button).equal(true);
});