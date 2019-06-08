import Axios from 'axios';

class DocsService {
  constructor() {
    this.axios = Axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAuthLink = async () => {
    try {
      const response = await this.axios.get('/');
      return response.data;
    } catch (error) {
      console.warn(error);
      return '';
    }
  }

  authByCode = async (code) => {
    try {
      await this.axios.post('/auth', { code });
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  getDocument = async () => {
    try {
      const { data: document } = await this.axios.get('/document');
      return document;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }
}

export default DocsService;