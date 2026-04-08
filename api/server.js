// Vercel serverless entry — dynamically imports the pre-built ESM Express app
let app;

async function loadApp() {
  if (!app) {
    const mod = await import("./dist/server.mjs");
    app = mod.default;
  }
  return app;
}

module.exports = async function handler(req, res) {
  const expressApp = await loadApp();
  expressApp(req, res);
};
