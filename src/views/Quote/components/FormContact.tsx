import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import ButtonForward from 'src/components/atoms/ButtonForward';
import { InputWithStatus } from 'src/components/atoms';
import { Email, Lock, Person, Phone } from '@material-ui/icons';
import { QuoteContext } from '../QuoteContext';

interface FormContactProps {
  className?: string;
  modalView?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 23,
    lineHeight: '28px',
    fontWeight: 800,
    marginBottom: theme.spacing(1),

    '.modal-view &': {
      textAlign: 'center',
    },
  },
  subTitle: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 500,
    marginBottom: theme.spacing(3),
    maxWidth: 300,
    flexWrap: 'wrap',
  },

  contentContainer: {
    flexGrow: 1,
  },

  lineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  flexGrow: {
    flexGrow: 1,
  },

  actionContainer: {
    minHeight: 70,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },

    '& .button-mobile-info': {
      width: 45,
      height: 45,
    },

    '.modal-view &': {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));

const FormContact = (props: FormContactProps): ReactElement => {
  const { className, modalView } = props;

  const classes = useStyles();

  const { handleCreateAppointment } = useContext(QuoteContext);

  const { contact, handleSetContact } = useContext(QuoteContext);

  const handleInputChange = (key: string, value: string) => {
    handleSetContact({
      ...contact,
      [key]: value,
    });
  };

  const handleContinue = () => {
    if (modalView) handleCreateAppointment();
  };

  const validateEmail = (em: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(em).toLowerCase());
  };

  const PHONE_NUMBER_LENGTH = 10;
  const isReadyToContinue =
    !!contact.name &&
    !!contact.email &&
    !!contact.password &&
    !!contact.phone &&
    validateEmail(contact.email) &&
    contact.phone.length === PHONE_NUMBER_LENGTH;

  return (
    <Box
      className={clsx(
        'quote-form-contact',
        classes.root,
        modalView && 'modal-view',
        className
      )}
    >
      <Typography key="title" className={classes.title}>
        Contact & Account
      </Typography>
      {!modalView && (
        <Typography key="subtitle" className={classes.subTitle}>
          Our technician are preparing a quote for you
        </Typography>
      )}
      <Grid container className={classes.contentContainer}>
        <Grid item sm={modalView ? 12 : 8} xs={12}>
          <Box key="input-name" className={classes.lineContainer}>
            <InputWithStatus
              className={classes.flexGrow}
              placeholder="First And Last Name"
              value={contact.name}
              valueChanged={(val: string) => handleInputChange('name', val)}
              start={<Person color="secondary" />}
            />
          </Box>
          <Box key="input-email" className={classes.lineContainer}>
            <InputWithStatus
              className={classes.flexGrow}
              placeholder="Email"
              email
              value={contact.email}
              valueChanged={(val: string) => handleInputChange('email', val)}
              start={<Email color="secondary" />}
            />
          </Box>
          <Box key="input-password" className={classes.lineContainer}>
            <InputWithStatus
              className={classes.flexGrow}
              placeholder="Password"
              value={contact.password}
              valueChanged={(val: string) => handleInputChange('password', val)}
              start={<Lock color="secondary" />}
              password
            />
          </Box>
          <Box key="input-phone" className={classes.lineContainer}>
            <InputWithStatus
              className={classes.flexGrow}
              placeholder={`Cell phone number (${PHONE_NUMBER_LENGTH} digits)`}
              value={contact.phone}
              forceLength={PHONE_NUMBER_LENGTH}
              valueChanged={(val: string) => handleInputChange('phone', val)}
              start={<Phone color="secondary" />}
            />
          </Box>
        </Grid>
        <Grid
          item
          sm={modalView ? 12 : 4}
          xs={12}
          className={classes.actionContainer}
        >
          <ButtonForward
            title="Continue"
            rounded
            size="large"
            onClickHandler={handleContinue}
            disabled={!isReadyToContinue}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

FormContact.defaultProps = {
  className: undefined,
  modalView: false,
};

export default FormContact;
