import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Box from '@material-ui/core/Box';

const CountrySelector = ({ countries, handleOnChange, value }) => {

  return (
    <Box sx={{
      maxWidth: 120,
      mb: 3
    }}>
      <FormControl>
        <InputLabel shrink htmlFor='country-selector'>
          アリア
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={handleOnChange}
          inputProps={{
            name: 'country',
            id: 'country-selector',
          }}
        >
          {countries && countries.map(({ Country, ISO2 }) => (
            <option key={ISO2} value={ISO2.toLowerCase()}>
              {Country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default CountrySelector