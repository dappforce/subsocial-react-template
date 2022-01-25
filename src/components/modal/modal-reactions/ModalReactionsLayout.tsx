import { FC, useEffect } from 'react';
import styles from './ModalReactions.module.sass';
import Title from '../../common/title/Title';
import MaterialTabs from '@mui/material/Tabs';
import { Tab } from '@mui/material';
import { ModalLabelTabProps, ModalReactionsProps } from 'src/models/modal';
import { TitleSizes } from 'src/models/common/typography';
import ModalReactionsList from './ModalReactionsList';

const LabelTab: FC<ModalLabelTabProps> = ({ label, count }) => {
  return (
    <div>
      {label} <span className={styles.label}>{count}</span>
    </div>
  );
};

const ModalReactionsLayout: FC<ModalReactionsProps> = (props) => {
  useEffect(() => {}, [props.dataSource]);
  return (
    <>
      <div className={props.isTabs ? styles.header : ' ' + props.className}>
        <Title type={TitleSizes.DETAILS} className={styles.title}>
          {props.title}
        </Title>

        {props.isTabs && (
          <MaterialTabs
            className={styles.tabs}
            value={props.valueTabs}
            onChange={props?.handleTabs}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            centered
          >
            {props.tabs?.map(({ label, tabValue, count = 0 }) => (
              <Tab
                className={styles.tab}
                value={tabValue}
                label={<LabelTab label={label} count={count} />}
                key={tabValue}
              />
            ))}
          </MaterialTabs>
        )}
      </div>

      <ModalReactionsList
        dataSource={props.dataSource}
        loadMore={props.loadMore}
        totalCount={props.totalCount}
        onClose={props.onClose}
      />
    </>
  );
};

export default ModalReactionsLayout;
