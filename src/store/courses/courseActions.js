import { getCourses as getCoursesAPI } from '../../api/courses';
import { fetchCourses, fetchCoursesSuccess, fetchCoursesFailure } from './courseReducer';

export const getCourses = () => async (dispatch) => {
  dispatch(fetchCourses());
  try {
    const courses = await getCoursesAPI();
    dispatch(fetchCoursesSuccess(courses));
  } catch (error) {
    dispatch(fetchCoursesFailure(error.message));
  }
};
