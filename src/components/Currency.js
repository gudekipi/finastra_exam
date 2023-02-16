import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { USD } from '../page/Home';



function CurrencySelector({ handleCurrencyChange, currency = USD }) {

  const currencies = useSelector(state => state.currency.currencies);
  const [value, setValue] = useState(currency.code)
  const options = useMemo(() => Object.values(currencies), [currencies]);
  const handleSelectChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])


  useEffect(() => {
    let selectedValue = options.find((option) => option.code === value)
    selectedValue && handleCurrencyChange(selectedValue)
  }, [value, options, handleCurrencyChange])

  return (
    <TextField
      select
      label="Select Currency"
      style={{ width: "30%", marginTop: 20 }}
      value={value}
      onChange={handleSelectChange}
    >
      {options.map(currency => (
        <MenuItem key={currency.code} value={currency.code}>
          {currency.name} ({currency.symbol})
        </MenuItem>
      ))}
    </TextField>
  );
}

CurrencySelector.propTypes = {
  handleCurrencyChange: PropTypes.func.isRequired,
  currency: PropTypes.object,
};

export default CurrencySelector;