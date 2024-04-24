const LoginRules = {
  email: {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '올바른 이메일 주소를 입력해주세요',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    },
    maxLength: {
      value: 20,
      message: '비밀번호는 최대 20자 이하여야 합니다.',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      message: '비밀번호는 영문 소문자, 숫자, 특수문자를 포함해야 합니다.',
    },
  },
}

export default LoginRules
