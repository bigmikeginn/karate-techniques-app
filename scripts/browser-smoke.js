const { chromium } = require("playwright");

const targetUrl = process.env.TEST_URL || "http://127.0.0.1:3000";

async function verifyViewport(browser, name, viewport) {
  const page = await browser.newPage({
    viewport,
    isMobile: viewport.width < 768,
  });

  const errors = [];
  const failedRequests = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console: ${message.text()}`);
    }
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText}`);
  });

  const response = await page.goto(targetUrl, {
    waitUntil: "networkidle",
    timeout: 45000,
  });

  if (!response || response.status() >= 400) {
    throw new Error(`${name}: expected healthy response, got ${response?.status() || "no response"}`);
  }

  await page.getByRole("button", { name: "BJJ" }).first().click();
  await page.waitForTimeout(300);

  const heading = await page.locator("h1").first().textContent();
  if (heading !== "Jitsu-Do BJJ") {
    throw new Error(`${name}: BJJ toggle did not update heading`);
  }

  const cardCount = await page.locator("main [class*=premium-card]").count();
  if (cardCount < 50) {
    throw new Error(`${name}: expected BJJ technique cards, found ${cardCount}`);
  }

  await page.locator("main [class*=premium-card]").first().click();
  await page.waitForTimeout(300);

  const modalVisible = await page.locator("[role=dialog]").isVisible();
  if (!modalVisible) {
    throw new Error(`${name}: technique modal did not open`);
  }

  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  const modalClosed = await page.locator("[role=dialog]").count();
  if (modalClosed !== 0) {
    throw new Error(`${name}: Escape did not close the modal`);
  }

  const footerVisible = await page.locator("footer").isVisible();
  if (!footerVisible) {
    throw new Error(`${name}: footer is not visible`);
  }

  if (errors.length || failedRequests.length) {
    throw new Error(`${name}: browser errors detected\n${[...errors, ...failedRequests].join("\n")}`);
  }

  await page.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  try {
    await verifyViewport(browser, "desktop", { width: 1440, height: 900 });
    await verifyViewport(browser, "tablet", { width: 820, height: 1180 });
    await verifyViewport(browser, "mobile", { width: 390, height: 844 });
    console.log(`Browser smoke checks passed for ${targetUrl}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
