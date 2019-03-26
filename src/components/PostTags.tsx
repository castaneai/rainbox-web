import React from "react";
import Downshift from "downshift";
import { TextField, Chip, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  tags: string[];
}

interface InputProps {
  InputProps: any;
  classes: ReturnType<typeof useStyles>;
  ref?: React.Ref<HTMLInputElement>;
  fullWidth: boolean;
  label: string;
}

const useStyles = makeStyles({
  chip: {},
  paper: {},
  inputRoot: {},
  inputInput: {}
});

const renderInput = (inputProps: InputProps) => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
};

const PostTags = (props: Props) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState<string[]>([]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  const handleChange = (item: string) => {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  };

  const handleDelete = (item: string) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  <Downshift
    id="downshift-multiple"
    inputValue={inputValue}
    onChange={handleChange}
    selectedItem={selectedItem}
  >
    {({
      getInputProps,
      getItemProps,
      isOpen,
      inputValue: inputValue2,
      selectedItem: selectedItem2,
      highlightedIndex
    }) => (
      <div>
        {renderInput({
          fullWidth: true,
          classes,
          InputProps: getInputProps({
            startAdornment: selectedItem.map(item => (
              <Chip
                key={item}
                tabIndex={-1}
                label={item}
                className={classes.chip}
                onDelete={handleDelete(item)}
              />
            )),
            onChange: handleInputChange,
            onKeyDown: handleKeyDown,
            placeholder: "Select multiple countries"
          }),
          label: "Label"
        })}
        {isOpen ? (
          <Paper className={classes.paper} square>
            {getSuggestions(inputValue2).map((suggestion, index) =>
              renderSuggestion({
                suggestion,
                index,
                itemProps: getItemProps({ item: suggestion.label }),
                highlightedIndex,
                selectedItem: selectedItem2
              })
            )}
          </Paper>
        ) : null}
      </div>
    )}
  </Downshift>;
};

export default PostTags;
