import axios from 'axios';

axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';

export default {
   refs: {},
  async getAllProduct() {
    try {
      const data = await axios.get(`/ads/all`);

      return data.data.ads;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },


 
  async getAlerts() {
    try {
      const data = await axios.get('https://sciactive.com/pnotify/');

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getCardById(id) {
    try {
      const data = await axios.get(`/ads/${id}`);

      return data.data.goal;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async limitExtradition(limit, pageNumber) {
    try {
      const data = await axios.get(
        `/ads/all?limit=${limit}&page=${pageNumber}`,
      );

      return data.data.ads;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getCategoriesWithNumberCategories(numberCategories, homePage) {
    try {
      const data = await axios.get(
        `/ads/all?category=${numberCategories}&page=${homePage}`,
      );

      return data.data.ads.docs;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async adsProduct(object) {
    try {
      const data = await axios.post('/ads', object, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async deletedProduct(adId) {
    try {
      const data = await axios.delete(`/ds/${adId}`, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });


      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },



  async registrateUser(userInfo) {
    const data = await axios.post('/auth/register', userInfo);

    if (data.data.status === 'success') {
      this.loginUser(userInfo);
    } else {
      const regex = /[a-z0-9\.\-\+]+@[a-z0-9\.\-\+]+/gim;
      const res = data.data.error;
      console.error(`This email: ${res.match(regex)} already exists`);
    }
  },
  async loginUser(userInfo) {
    const data = await axios.post('/auth/login', userInfo);

    localStorage.setItem('token', data.data.token);
    localStorage.setItem('userInfo', data.config.data);
  },
  async logoutUser(userInfo) {
    const token = localStorage.getItem('token');
    const data = await axios.post('/auth/logout', userInfo, {
      headers: { Authorization: token },
    });

    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  },


};
