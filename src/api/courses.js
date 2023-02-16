import axios from 'axios';

export const getCourses = async () => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/JCGonzaga01/9c9e3590fb23274263678b6c4bcf9963/raw/600c8281f9db7eaba959a732912eba350bf7387d/user-course-selection.json');
    const courses = response.data;
    return courses;
  } catch (error) {
    throw new Error('Unable to fetch courses');
  }
};