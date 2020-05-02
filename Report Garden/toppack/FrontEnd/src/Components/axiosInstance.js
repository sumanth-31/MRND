import  axios from 'axios'
const instance= axios.create({baseURL:'https://api.github.com/',timeout:100000});
export default instance;