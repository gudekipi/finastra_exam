import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/JCGonzaga01/36a8af85464d998221c71ea3eaa57225/raw/6fe851e029ee98e9ec85ceb87433ed5ed0f06e36/users.json');
    const users = response.data;
    return users;
  } catch (error) {
    throw new Error('Unable to fetch users');
  }
};