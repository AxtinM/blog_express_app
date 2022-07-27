const articles_controller = require("../articles.controller");
// @ponicode
describe("articles_controller.getFeaturedArticlesController", () => {
  test("0", async () => {
    await articles_controller.getFeaturedArticlesController(500, {
      status: () => 200,
    });
  });

  test("1", async () => {
    await articles_controller.getFeaturedArticlesController(200, {
      status: () => 404,
    });
  });

  test("2", async () => {
    await articles_controller.getFeaturedArticlesController(429, {
      status: () => 400,
    });
  });

  test("3", async () => {
    await articles_controller.getFeaturedArticlesController(404, {
      status: () => 404,
    });
  });

  test("4", async () => {
    await articles_controller.getFeaturedArticlesController(404, {
      status: () => 400,
    });
  });

  test("5", async () => {
    await articles_controller.getFeaturedArticlesController(NaN, {
      status: () => NaN,
    });
  });
});
