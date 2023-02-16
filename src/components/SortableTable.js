import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';

function SortableTable(props) {
  const { data, headers, loading } = props;
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const NO_DATA = 'No Data Found'

  const handleSort = (header) => {
    if (orderBy === header && order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    setOrderBy(header);
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  return (
    <Table component={Paper}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            header.sortable ? (
              <TableCell style={{fontWeight: '600'}} key={header.id}>
                <TableSortLabel
                  active={orderBy === header.id}
                  direction={order}
                  onClick={() => handleSort(header.id)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ) : (
              <TableCell style={{fontWeight: '600'}} key={header.id}>{header.label}</TableCell>
            )
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((user) => (
          <React.Fragment key={user.id}>
            <TableRow>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
            {user.courses.length > 0 ? (
              user.courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell>{course.course_name}</TableCell>
                  <TableCell>{course.course_selection}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{!loading ? course.semester_fee : <CircularProgress size={20} variant='indeterminate'/>}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell >{NO_DATA}</TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

SortableTable.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  loading: PropTypes.array.isRequired
};

export default SortableTable;