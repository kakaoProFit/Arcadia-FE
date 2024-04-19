import ValidInput from './ValidInput';
import { Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

const ValidForm = () => {
    const methods = useForm();
    const { register, handleSubmit, control } = methods;
    const submitHandler = (data) => {
      // 데이터 처리
      console.log(data);
      console.log('로그인 데이터 제출');
    };
    return(
      <Box component="form" onSubmit={methods.handleSubmit(submitHandler)} style={{ mt: 1 }}>
        <ValidInput control={control} name="email" ruleName="email"/>
        <ValidInput control={control} name="password" ruleName="password"/>
      <Box mb={1}>
        <Button color="primary" type="submit" fullWidth variant="contained" style={{ padding: '12px 2px' }}>
          로그인
          </Button>
        </Box>
        <Box mb={1}>
          <Button color="yellow" type="submit" fullWidth variant="contained" style={{ padding: '12px 2px' }}>
            카카오 로그인
          </Button>
        </Box>
        <Box mb={1}>
          <Button color="green" type="submit" fullWidth variant="contained" style={{ padding: '12px 2px' }}>
            네이버 로그인
          </Button>
        </Box>
      </Box>
    )
  }

  export default ValidForm;