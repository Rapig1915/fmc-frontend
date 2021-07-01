import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import { ButtonForward, InputWithStatus } from 'src/components/atoms';
import { LockOpen, Phone } from '@material-ui/icons';

import { getToken, signIn } from 'src/api/auth';
import { ResponseAuth, ResponseSignin } from 'src/types';
import { logout, setAuthCode, setAuthToken } from 'src/store/actions';
import { URL } from 'src/utils/consts';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: 500,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    minWidth: 250,
  },
  buttons: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
}));

const Login = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    phone: '',
    code: '',
    codeCheck: '',
    codeSent: false,
  });

  const handleInputChange = (val: string) => {
    if (data.codeSent)
      setData((state) => ({
        ...state,
        code: val,
      }));
    else
      setData((state) => ({
        ...state,
        phone: val,
      }));
  };

  const handleForward = async () => {
    if (!data.codeSent) {
      const response: ResponseAuth = await getToken({
        user: {
          phone: data.phone,
        },
      });

      if (response && response.status === 'Code sent') {
        dispatch(setAuthCode(response.code));

        setData((state) => ({
          ...state,
          codeSent: true,
          codeCheck: response.code,
          code: '',
        }));
      }
    } else {
      const response: ResponseSignin = await signIn({
        user: {
          code: data.code,
        },
      });

      if (
        response &&
        response.auth_token &&
        response.user &&
        response.user.id
      ) {
        dispatch(
          setAuthToken(
            response.auth_token,
            response.user.id,
            response.user.email
          )
        );
        history.push(URL.DASHBOARD);
      }
    }
  };

  const handleReset = () => {
    dispatch(logout());

    setData({
      phone: '',
      code: '',
      codeCheck: '',
      codeSent: false,
    });
  };

  return (
    <Box className={classes.root}>
      <InputWithStatus
        className={classes.input}
        start={data.codeSent ? <LockOpen /> : <Phone />}
        placeholder={
          !data.codeSent ? 'Your phone number' : 'Input code you received'
        }
        value={data.codeSent ? data.code : data.phone}
        valueChanged={handleInputChange}
      />
      <Box className={classes.buttons}>
        <ButtonForward
          key="forward"
          title={data.codeSent ? 'Check code' : 'Send code'}
          size="large"
          onClickHandler={handleForward}
          disabled={
            (data.codeSent && !data.code) || (!data.codeSent && !data.phone)
          }
        />
        {data.codeSent && (
          <ButtonForward
            key="reset"
            title="Reset"
            size="medium"
            onClickHandler={handleReset}
            noIcon
          />
        )}
      </Box>
    </Box>
  );
};

export default Login;
