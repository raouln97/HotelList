import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FilterNames } from '../types/filterName.dto';

const DropDownComponent = ({
  optionValue,
  handleEventChange,
  options,
  label,
  filterName
}) => {
  const handleChange = event => {
    handleEventChange(filterName,event.target.value);
  };

  return (
    <FormControl fullWidth>
      {label !== '' && <InputLabel id="drop-down-label">{label}</InputLabel>}
      <Select
        labelId="drop-down-label"
        id="drop-down-select"
        value={optionValue}
        label={label}
        onChange={handleChange}
        sx={{
          backgroundColor: 'white',
          borderRadius: '30px',
          '& .MuiSvgIcon-root': {
            color: 'black',
          },
        }}
      >
        {options.length &&
          options.map((val, index) => (
            <MenuItem key={index} value={val}>
              {val}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default DropDownComponent;
