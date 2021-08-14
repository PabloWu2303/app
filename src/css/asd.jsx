/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
    const allAddresses = props.option
    const value = props.value ? props.value : ""
    console.log("ca" + value)
    const options = allAddresses.map((option) => {
    const firstLetter = option.city[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
    
  return (
    <Autocomplete
    id="grouped-demo"
    value = {value? value : null}
    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
    groupBy={(address) => address.firstLetter}
    getOptionLabel={(address) => address.city + ", ul. " + address.street + " " + address.houseNumber + (address.flatNumber ? ("/" + address.flatNumber + ", ") : ", ") + address.postalCode}
    style={{ width: 450 }}
    renderInput={(params) => <TextField {...params} label="Address" variant="outlined" />}
  />
    //   id="combo-box-demo"
    //   options={allAddresses}
    //   select
    //   getOptionLabel={(address) => address.city + ", ul. " + address.street + " " + address.houseNumber + (address.flatNumber ? ("/" + address.flatNumber + ", ") : ", ") + address.postalCode}
    //   style={{ width: 300 }}
    //   renderInput={(params) => <TextField {...params}  variant="outlined" />}
    // />
  );
}
