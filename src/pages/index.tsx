import React from 'react';
import styles from './index.less';
import { useModel } from 'umi';

export default () => {
  const { initialState, loading, refresh } = useModel('@@initialState');
  return (
    <div>
      {initialState.ready}
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
};
