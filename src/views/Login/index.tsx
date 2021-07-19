import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import { ButtonForward, InputWithStatus } from 'src/components/atoms';
import { Email, Lock, LockOpen, Phone } from '@material-ui/icons';

import { getToken, signIn } from 'src/api/auth';
import { ResponseAuth, ResponseSignin } from 'src/types';
import { logout, setAuthCode, setAuthToken } from 'src/store/actions';
import { MODE_LOGIN, URL } from 'src/utils/consts';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 600,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      minHeight: 300,
    },

    '& .switch': {
      zIndex: 100,
      width: 250,
      marginTop: theme.spacing(3),
    },
  },
  input: {
    minWidth: 250,
    zIndex: 100,
  },
  buttons: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
  },
}));

const Login = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    mode: MODE_LOGIN.PHONE,

    phone: '',
    code: '',
    codeCheck: '',
    codeSent: false,

    email: '',
    password: '',
  });

  const handleInputChange = (key: string, val: string) => {
    if (data.mode === MODE_LOGIN.PHONE) {
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
    } else {
      setData((state) => ({
        ...state,
        [key]: val,
      }));
    }
  };

  const handleForward = async () => {
    if (data.mode === MODE_LOGIN.PHONE) {
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
    } else {
      const response: ResponseSignin = await signIn({
        user: {
          email: data.email,
          password: data.password,
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

    setData((state) => ({
      ...state,

      email: '',
      password: '',

      phone: '',
      code: '',
      codeCheck: '',
      codeSent: false,
    }));
  };

  const validateEmail = (em: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(em).toLowerCase());
  };

  const isReadyToSignByEmail =
    data.email && data.password && validateEmail(data.email);

  return data.mode === MODE_LOGIN.PHONE ? (
    <Box className={classes.root}>
      <InputWithStatus
        className={classes.input}
        start={data.codeSent ? <LockOpen /> : <Phone />}
        placeholder={
          !data.codeSent ? 'Your phone number' : 'Input code you received'
        }
        value={data.codeSent ? data.code : data.phone}
        valueChanged={(val: string) => handleInputChange('phone', val)}
      />
      <Box className={classes.buttons}>
        <ButtonForward
          key="forward"
          title={data.codeSent ? 'Login' : 'Send code'}
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
  ) : (
    <Box className={classes.root}>
      <InputWithStatus
        className={classes.input}
        placeholder="Email"
        email
        value={data.email}
        valueChanged={(val: string) => handleInputChange('email', val)}
        start={<Email color="secondary" />}
      />
      <InputWithStatus
        className={classes.input}
        placeholder="Password"
        value={data.password}
        valueChanged={(val: string) => handleInputChange('password', val)}
        start={<Lock color="secondary" />}
        password
      />
      <Box className={classes.buttons}>
        <ButtonForward
          key="forward"
          title="Login"
          size="large"
          onClickHandler={handleForward}
          disabled={!isReadyToSignByEmail}
        />
      </Box>
    </Box>
  );
};

export default Login;
