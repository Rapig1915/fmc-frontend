import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

interface TabSelectorProps {
  className?: string;
  selectedIndex?: number;
  items?: string[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '2px solid #302A3C',
    borderRadius: '27.5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '30px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20px',
    },
  },
  item: {
    width: '100%',
    borderRadius: '27.5px',
    fontFamily: 'Lato',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '20px',
    lineHeight: '24px',
    padding: '8px',
    textAlign: 'center',
    border: 0,
    color: '#7E7A92',
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
  const { className, selectedIndex, items, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={clsx('tab-selector', classes.root, className)} {...rest}>
      {items &&
        items.map((item, index) => (
          <div
            key={`cta-${item}`}
            className={clsx(
              'tab-selector-item',
              classes.item,
              index === selectedIndex ? classes.itemSelected : undefined
            )}
          >
            {item}
          </div>
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
