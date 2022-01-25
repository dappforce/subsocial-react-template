import { SyntheticEvent, FC } from 'react';
import styles from './Tabs.module.sass';
import { Tab } from '@mui/material';
import MaterialTabs from '@mui/material/Tabs';
import { Box } from '@mui/system';
import { TabsProps } from 'src/models/common/tabs';

const Tabs: FC<TabsProps> = ({
  className: inputClassName,
  tabs,
  setValue,
  value,
  unselected = false,
}) => {
  const className = inputClassName
    ? `${inputClassName} ${styles.tabs} ${unselected && styles.unselected}`
    : inputClassName;

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className={className}>
        <MaterialTabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          centered
        >
          {tabs.map(({ label, tabValue }) => {
            return (
              <Tab
                className={styles.tab}
                value={tabValue}
                label={label}
                key={tabValue}
              />
            );
          })}
        </MaterialTabs>
      </Box>
    </>
  );
};

export default Tabs;
