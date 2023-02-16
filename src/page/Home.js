import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencySelector, SearchBar, SortableTable } from '../components';
import { getUsers } from '../store/user/userActions';
import { getCourses } from '../store/courses/courseActions';
import { getCurrencies, getConversion } from '../store/currency/currencyActions';
import { Grid } from '@mui/material';
import { userCoursesModel } from '../models/userCourses';


export const USD = {
  code: "USD",
  symbol: '$'
}

function Home() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const courses = useSelector(state => state.course.courses);
  const conversionRate = useSelector(state => state.currency.conversionRate);
  const isLoading = useSelector(state => state.currency.loading)
  const error = useSelector(state => state.currency.error);
  const [searchTerm, setSearchTerm] = useState("");
  const [currency, setCurrency] = useState(USD);
  const prevCurrency = useRef()

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCourses());
    dispatch(getCurrencies());
  }, [dispatch]);

  useEffect(() => {
    prevCurrency.current = currency;
  }, [currency]);


  const handleSearchTermChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleCurrencyChange = useCallback((curr) => {
    console.log(curr)
    const prevCur = prevCurrency?.current
    prevCur && dispatch(getConversion(USD.code, curr.code));
    setCurrency(curr);

  }, [dispatch]);

  const combineData = useCallback((users, courses, searchTerm, conversionRate) => {
    const term = searchTerm.toLowerCase();
    const usersWithCourses = users.map((user) => {
      const userCourses = courses.filter((course) => course.user_id === user.id);
      const uniqueCourses = userCourses.reduce((courses, course) => {
        if (!courses.some(c => c.course_selection === course.course_selection)) {
          const newCourse = { ...course, semester_fee: `${currency.symbol} ${course.semester_fee * conversionRate}` };
          courses.push(newCourse);
        }
        return courses;
      }, []);

      return { ...user, courses: uniqueCourses };
    });

    const filteredData = usersWithCourses.filter((user) => {
      return (
        user.name.toLowerCase().includes(term) ||
        user.phone.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    });

    return filteredData;
  }, [currency.symbol]);

  const filteredData = useMemo(() => combineData(users, courses, searchTerm, conversionRate), [combineData, searchTerm, conversionRate, users, courses]);
  const tableData = useMemo(() => filteredData, [filteredData]);

  return (
    <div>
      <Grid style={{ margin: 20 }}>
        <Grid>
          <Grid><SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchTermChange} /></Grid>
          <Grid><CurrencySelector currency={currency} handleCurrencyChange={handleCurrencyChange} /> </Grid>
        </Grid>
        <Grid style={{ marginTop: 20 }}>{!error ? <SortableTable loading={isLoading} headers={userCoursesModel} data={tableData} /> : <Grid textAlign='center'>{error}</Grid>}</Grid>
      </Grid>
    </div>
  );
}

export default Home;