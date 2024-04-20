import React from 'react';
import { TextField }  from '@mui/material';

function createField(props) {
    return (
      <TextField
        margin="normal"
        size="large"
        fullWidth
        required
        id={props.id}
        label={props.label}
        name={props.name}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
      />
    );
  }

export default createField;