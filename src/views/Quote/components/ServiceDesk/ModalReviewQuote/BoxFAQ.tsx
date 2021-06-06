import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Add, ArrowForwardIos, ExpandMore, Remove } from '@material-ui/icons';
import { ImageNode } from 'src/components/molecules';
import { faq } from 'src/utils/data';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: '#f9f8fd',
    borderRadius: '7px',
  },
  containerHappyCustomer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  imgHappyCustomer: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  titleHappyCustomer: {
    color: '#7E7A92',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    '& b': {
      color: '#302A3C',
      fontWeight: 800,
    },
    '& .arrow': {
      position: 'absolute',
      top: 0,
      right: theme.spacing(3),
      height: '100%',
      width: 25,
      color: '#BDC1DA',
      cursor: 'pointer',

      '&.shown': {
        width: 40,
      },
    },
  },

  faqBox: {
    margin: theme.spacing(3),
    marginTop: 0,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    borderRadius: 5,
    position: 'relative',
  },
  faqQ: {
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: '18px',
    color: '#302A3C',

    '&.expanded': {
      color: '#7157FF',
    },
  },
  faqA: {
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: '20px',
    color: '#7E7A92',
    display: 'none',
    maxWidth: 300,

    '&.expanded': {
      display: 'block',
    },
  },
  faqControl: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: '#302A3C',
    cursor: 'pointer',

    '&.expanded': {
      color: '#7157FF',
    },
  },
}));

const BoxFAQ = (): ReactElement => {
  const classes = useStyles();

  const [showQA, setShowQA] = useState(false);

  const [expanded, setExpanded] = useState(faq.map((fq, ind) => ind === 0));

  const handleShowQA = () => {
    setShowQA(!showQA);
  };

  const handleExpandQA = (index: number, show: boolean) => {
    setExpanded(faq.map((fq, ind) => (ind === index ? show : false)));
  };

  return (
    <Box className={classes.root}>
      <ImageNode
        key="faq"
        title={
          <>
            <b>FAQs</b>
            <br />
            Got questions?
            {!showQA ? (
              <ArrowForwardIos className="arrow" onClick={handleShowQA} />
            ) : (
              <ExpandMore
                className={clsx('arrow', showQA && 'shown')}
                fontSize="large"
                onClick={handleShowQA}
              />
            )}
          </>
        }
        imgUrl="/assets/faq.png"
        titleProps={{ className: classes.titleHappyCustomer }}
        imgProps={{ className: classes.imgHappyCustomer }}
        className={classes.containerHappyCustomer}
      />
      {showQA &&
        faq.map((fq, ind) => (
          <Box key={fq.q} className={classes.faqBox}>
            <Typography
              className={clsx(classes.faqQ, expanded[ind] && 'expanded')}
            >
              {fq.q}
            </Typography>
            <Typography
              className={clsx(classes.faqA, expanded[ind] && 'expanded')}
            >
              {fq.a}
            </Typography>
            {!expanded[ind] ? (
              <Add
                className={classes.faqControl}
                onClick={() => handleExpandQA(ind, true)}
              />
            ) : (
              <Remove
                className={clsx(classes.faqControl, 'expanded')}
                onClick={() => handleExpandQA(ind, false)}
              />
            )}
          </Box>
        ))}
    </Box>
  );
};

export default BoxFAQ;
