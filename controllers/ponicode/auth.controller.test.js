const auth_controller = require("../auth.controller");
// @ponicode
describe("auth_controller.updateImageProfile", () => {
  test("0", async () => {
    await auth_controller.updateImageProfile(
      {
        user: { _id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" },
        body: "package",
        fileName: "program.exe",
        fileMime: "esa",
      },
      { status: () => 200 }
    );
  });
});
