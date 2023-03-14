let page;
beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
  await page.goto("https://github.com/team", {timeout: 60000});
});


  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("Another page tests", () => {
  test("The h1 header enterprise'", async () => {
    await page.goto("https://github.com/enterprise", {timeout: 60000});
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Enterprise · A smarter way to work together · GitHub');
  });
  test("The h1 header education'", async () => {
    await page.goto("https://education.github.com/", {timeout: 60000});
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Engaged students are the result of using real-world tools - GitHub Education');
  }, 60000);
  test("The h1 header topics'", async () => {
    await page.goto("https://github.com/topics", {timeout: 60000});
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Topics on GitHub · GitHub');
  });
});
