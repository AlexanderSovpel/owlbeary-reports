const DocsService = require('./service');

const docsService = new DocsService();

class DocsController {
  static getAuthLink(req, res) {
    const authUrl = docsService.init();
    res.send(authUrl);
  }

  static async authByCode(req, res) {
    const code = req.body.code;
    await docsService.auth(code);
    res.sendStatus(201);
  }

  static async getDocument(req, res) {
    const document = await docsService.getDocument();
    res.send(document);
  }
}

module.exports = DocsController;