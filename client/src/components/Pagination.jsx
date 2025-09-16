import React from "react";
import useStyles from "./styles.js";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSeletor } from 'react-redux';
const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  

  return (
    <>
      <Pagination
        classes={{ ul: classes.ul }}
        count={5}
        page={1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
        )}
      />
    </>
  );
};

export default Paginate;
