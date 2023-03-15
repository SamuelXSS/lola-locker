import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';

const Input = styled((props: TextFieldProps) => {
  return (
    <TextField
      sx={{
        '& .MuiFormLabel-root': {
          color: '#999999',
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: props.mainColor,
        },
      }}
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  );
})(({ theme, mainColor }) => ({
  '& .MuiInput-underline:after': {
    borderBottomColor: mainColor,
  },
  '& .MuiFilledInput-root': {
    border: '1px solid #999999',
    overflow: 'hidden',
    borderRadius: 4,
    color: '#ccc',
    backgroundColor: 'transparent',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '& .MuiInputLabel-root': {
      color: '#ccc',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#ccc',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha('#7F3999', 0.25)} 0 0 0 2px`,
      borderColor: '#999998',
    },
  },
  '& .MuiInputBase-root': {
    overflow: 'hidden',
    borderRadius: 4,
    color: '#ccc',
  },
}));

export default Input;
