import * as React from "react";
import "./ContactForm.styles.scss";

import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  InputLabel,
  Box,
  Button,
} from "@mui/material";

const ContactForm = () => {
  const [subject, setSubject] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleChange = (event, set) => {
    set(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="contactForm_container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField id="filled-basic" label="name" variant="filled" />
            <TextField id="filled-basic" label="email" variant="filled" />
            <br />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Subject</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subject}
            label="subject"
            onChange={(e) => handleChange(e, setSubject)}
          >
            <MenuItem value="technical">Technical</MenuItem>
            <MenuItem value="order">Order</MenuItem>
            <MenuItem value="return">Item Return</MenuItem>
          </Select>
        </Box>
        <TextField
          id="filled-multiline-flexible"
          label="Message"
          multiline
          maxRows={4}
          value={value}
          onChange={(e) => handleChange(e, setValue)}
          variant="filled"
        />
        <div style={{ width: "35%", marginTop: "2rem" }}>
          <FormLabel component="legend">Department</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="customer service"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="customer service"
              control={<Radio />}
              label="Customer Service"
            />
            <FormControlLabel
              value="technical help"
              control={<Radio />}
              label="Technical Help"
            />
            <FormControlLabel value="sales" control={<Radio />} label="sales" />
          </RadioGroup>
        </div>
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
