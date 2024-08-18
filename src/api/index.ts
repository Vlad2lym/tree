import axios from 'axios';

export default axios.create({
  baseURL: 'https://test.vmarmysh.com/api.user.tree.get',
  responseType: 'json',
});
