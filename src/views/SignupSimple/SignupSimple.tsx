import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { CustomTheme } from 'src/themes';
import { SectionHeader } from 'src/components/molecules';
import { Section } from 'src/components/organisms';
import { Form } from './components';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {},
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const SignupSimple = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title="Sign up"
            subtitle="Keep your car in a wonderful situation with us."
            titleProps={{
              variant: 'h3',
            }}
          />
          <Form />
        </div>
      </Section>
    </div>
  );
};

export default SignupSimple;
