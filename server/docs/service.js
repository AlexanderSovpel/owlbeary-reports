const { google } = require('googleapis');

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/documents',
];

class DocsService {
  constructor() {
    this.docs = google.docs('v1');

    this.client = new google.auth.OAuth2(
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CLIENT_SECRET,
      process.env.REACT_APP_REDIRECT_URI,
    );
  }

  init() {
    return this.client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
  }

  async auth(code) {
    try {
      const response = await this.client.getToken(code);
      this.client.credentials = response.tokens;
    } catch (error) {
      console.warn(error);
    }
  }

  async getDocument() {
    try {
      const response = await this.docs.documents.get({
        auth: this.client,
        documentId: process.env.REACT_APP_DOCUMENT_ID,
      });
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  }

  async update() {
    try {
      this.docs.documents.batchUpdate({
        auth: this.client,
        documentId: process.env.REACT_APP_DOCUMENT_ID,
        requestBody: {
          requests: [
            { insertText: {
              text: 'test',
              location: { segmentId: 0, index: 0 },
            } },
          ],
          writeControl: ''
        },
      })
    } catch (error) {
      console.warn(error);
    }
  }
}

module.exports = DocsService;