import React, { useEffect, useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  inputRoot: {
    flexWrap: "wrap",
  },
  inputInput: {
    width: "auto",
    flexGrow: 1,
  },
  endAdornment: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    marginLeft: theme.spacing(1),
  },
}));

const MultiTermSearch = ({value,setValue,setPage,query}) => {
  const classes = useStyles();
  const [include, setInclude] = useState("");

  const handleInputChange = (event, newInputValue) => {
    setInclude(newInputValue);
    setPage(0);
  };


  const handleKeyDown = (event) => {
    if (event.key === "Enter" && include) {
      setValue([...value, include]);
      setInclude("");
    }
  };
  useEffect(() => {
    if (query?.length) {
      setValue([...value, query]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleDelete = (chipToDelete) => () => {
    setValue((chips) => chips?.filter((chip) => chip !== chipToDelete));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        freeSolo
        options={value}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={include}
        onInputChange={handleInputChange}
        renderTags={(tagValue, getTagProps) =>
          tagValue?.map((option, index) => (
            <Chip          
              variant="outlined"
              label={option}
              onDelete={handleDelete(option)}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            placeholder="Type any term"
            onKeyDown={handleKeyDown}
            InputProps={{
              ...params.InputProps,
              classes: { root: classes.inputRoot, input: classes.inputInput },
              endAdornment: (
                <div >
                  {include && (
                    <Chip
                      variant="outlined"
                      label={include}
                      onDelete={handleDelete(include)}
                    />
                  )}
                </div>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default MultiTermSearch;
