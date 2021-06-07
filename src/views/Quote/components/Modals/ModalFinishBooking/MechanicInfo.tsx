import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Image, StarRating } from 'src/components/atoms';
import { Check } from '@material-ui/icons';

import { itemsCandidates } from 'src/utils/data';

const useStyles = makeStyles((theme) => ({
  imgCandidate: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(3),
  },
  countReview: {
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: '15px',
    lineHeight: '20.75px',
    textAlign: 'center',
    color: '#7157FF',
  },
  nameCandidate: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: 800,
    fontSize: 20,
    lineHeight: '29px',
    color: '#2A2D3C',
  },
  containerMention: {
    width: '100%',
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: '40.86px',
    '& svg': {
      color: '#36D9A0',
      marginRight: '10px',
    },
  },
}));

const MechanicInfo = (props: { className: string }): ReactElement => {
  const { className } = props;

  const classes = useStyles();

  const candidate = itemsCandidates[0];

  return (
    <Box className={className}>
      <Box
        key="box-candidates"
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Image
          className={classes.imgCandidate}
          src={`/assets/candidates/${candidate.photoASE}`}
          lazy={false}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <StarRating />
          <Typography className={classes.countReview}>
            {candidate.review} reviews
          </Typography>
        </Box>
      </Box>
      <Typography className={classes.nameCandidate}>
        {candidate.name}
      </Typography>
      <Box key="mention" className={classes.containerMention}>
        {candidate.mention &&
          candidate.mention.map((m) => (
            <div key={m}>
              <Check /> {m}
            </div>
          ))}
      </Box>
    </Box>
  );
};

export default MechanicInfo;
