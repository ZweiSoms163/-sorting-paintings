import axios from 'axios';

export const Locations = {
  async getLocations() {
    const response = await axios.get(`https://test-front.framework.team/locations`);
    return response.data;
  },
};
// разделил логику и вынес get запрос в сервис 