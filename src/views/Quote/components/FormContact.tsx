import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import ButtonForward from 'src/components/atoms/ButtonForward';
import { InputWithStatus } from 'src/components/atoms';
import { Email, Lock, Person, Phone } from '@material-ui/icons';
import { QuoteShowModal } from 'src/types';
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

  const { handleShowModal } = useContext(QuoteContext);
  const handleContinue = () => {
    if (modalView) handleShowModal(QuoteShowModal.REVIEW_QUOTE);
  };

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
              start={<Person color="secondary" />}
            />
          </Box>
          <Box key="input-email" className={classes.lineContainer}>
            <InputWithStatus
              className={classes.flexGrow}
              placeholder="Email"
              start={<Email color="secondary" />}
            />
          </Box>
          <Box key="input-password" className={classes.lineContainer}>
            <InputWithStatus
              className={classes.flexGrow}
              placeholder="Password"
              start={<Lock color="secondary" />}
              password
            />
          </Box>
          <Box key="input-phone" className={classes.lineContainer}>
            <InputWithStatus
              className={classes.flexGrow}
              placeholder="Cell phone number"
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
