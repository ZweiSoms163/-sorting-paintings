import axios from 'axios';

export const Authors = {
  async getAuthors() {
    const response = await axios.get(`https://test-front.framework.team/authors`);
    return response.data;
  },
};
// разделил логику и вынес get запрос в сервис 