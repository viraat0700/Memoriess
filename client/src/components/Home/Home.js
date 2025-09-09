import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { getPosts } from "../../actions/posts.js";
import { useDispatch } from "react-redux";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import Pagination from "../Pagination.jsx";
import useStyles from "./styles.js";

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
