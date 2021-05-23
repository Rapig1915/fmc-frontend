import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface TabSelectorProps {
  className?: string;
  selectedIndex?: number;
  items?: string[];
  onTabSelected: (index: number, text: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '2px solid #302A3C',
    borderRadius: 27.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2.5),
    },
    maxHeight: 50,
  },
  item: {
    width: '100%',
    height: '100%',
    borderRadius: 27.5,
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: '20px',
    padding: '8px',
    border: 0,
    color: '#A2A1A8',
    textAlign: 'center',
    display: 'table-cell',
    background: theme.palette.common.white,
    cursor: 'pointer',

    [theme.breakpoints.down('xs')]: {
      padding: '5px',
    },
  },
  itemSelected: {
    background: '#2A2D3C',
    border: '2px solid #2A2D3C',
    color: theme.palette.common.white,
  },
}));

/**
 * Component to display the section headers
 *
 * @param {TabSelectorProps} props
 */
const TabSelector = (props: TabSelectorProps): ReactElement => {
  const { className, selectedIndex, items, onTabSelected, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={clsx('tab-selector', classes.root, className)} {...rest}>
      {items &&
        items.map((item, index) => (
          <Typography
            role="button"
            tabIndex={0}
            key={`cta-${item}`}
            className={clsx(
              'tab-selector-item',
              classes.item,
              index === selectedIndex ? classes.itemSelected : undefined
            )}
            onClick={() => onTabSelected(index, item)}
            onKeyDown={() => {}}
          >
            {item}
          </Typography>
        ))}
    </div>
  );
};

TabSelector.defaultProps = {
  className: undefined,
  selectedIndex: undefined,
  items: [],
};

export default TabSelector;
