import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios
        .post('http://'+credentials.server+'/api/user', { credentials })
        .then(res => res.data.user),
  },
};
