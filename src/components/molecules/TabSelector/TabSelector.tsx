import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface TabSelectorProps {
  className?: string;
  selectedValue?: string;
  items?: { [val: string]: string };
  disabled?: boolean;
  onTabSelected: (val: string) => void;
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
    color: (props: TabSelectorProps) =>
      props.disabled ? '#828188' : '#A2A1A8',
    textAlign: 'center',
    display: 'table-cell',
    background: theme.palette.common.white,
    cursor: (props: TabSelectorProps) =>
      props.disabled ? 'no-drop' : 'pointer',

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
  const {
    className,
    selectedValue,
    items,
    disabled,
    onTabSelected,
    ...rest
  } = props;

  const classes = useStyles(props);

  const handleClick = (val: string | number) => {
    if (!disabled) onTabSelected(val as string);
  };

  return (
    <div className={clsx('tab-selector', classes.root, className)} {...rest}>
      {items &&
        Object.keys(items).map((val) => (
          <Typography
            role="button"
            tabIndex={0}
            key={`tab-${val}`}
            className={clsx(
              'tab-selector-item',
              classes.item,
              val === selectedValue ? classes.itemSelected : undefined
            )}
            onClick={() => handleClick(val)}
            onKeyDown={() => {}}
          >
            {items[val] || ''}
          </Typography>
        ))}
    </div>
  );
};

TabSelector.defaultProps = {
  className: undefined,
  selectedValue: '',
  items: {},
  disabled: false,
};

export default TabSelector;
