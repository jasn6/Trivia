import React from "react";
import Main from "./components/Main";
import { Button, Grid, Typography, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./index.css";
import logo from "./Images/logo.png";

export default function App() {
  const [start, setStart] = React.useState(true);
  const [categories, setCategories] = React.useState();
  const [difficulty, setDifficulty] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleDifficulty = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value);
  };

  const handleStart = () => {
    setStart((prev) => !prev);
  };

  React.useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  const startScreen = () => {
    return (
      <>
        <div className="startScreenLogo">
          <img className="ssLogo" src={logo} alt="Person thinking" />
        </div>

        <div className="startpageContainer">
          <div className="Title">Welcome To Trivia !</div>
          <div className="selections">
            <Grid container spacing={1}>
              {categories && (
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Typography variant="h5">CATEGORY</Typography>
                    <Select
                      autoWidth
                      value={category}
                      displayEmpty
                      onChange={handleCategory}
                    >
                      <MenuItem value="">
                        <em>Random</em>
                      </MenuItem>
                      {categories.map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.id + "-" + item.name}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Typography variant="h5">DIFFICULTY</Typography>
                  <Select
                    displayEmpty
                    autoWidth
                    value={difficulty}
                    onChange={handleDifficulty}
                  >
                    <MenuItem value="">
                      <em>Random</em>
                    </MenuItem>
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  onClick={handleStart}
                  size="large"
                >
                  Start
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="https://opentdb.com/">Database</a>
          </li>
          <li>
            <a href="https://github.com/jasn6/Trivia">Github</a>
          </li>
        </ul>
      </nav>
      {start ? startScreen() : <Main diff={difficulty} cat={category} />}
    </>
  );
}
