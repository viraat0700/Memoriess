import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { getPosts, getPostsBySearch } from "../../actions/posts.js";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import Pagination from "../Pagination.jsx";
import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [tags, setTags] = useState([]);

  const query = useQuery();
  const history = useHistory();

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // search post
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatch -> fetch searched post
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
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
