import React from 'react';
import styles from './index.less';
import { useAccess, Access, dynamic } from 'umi';

const PageDynamic = dynamic({
  loader: async function() {
    // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 HugeA 以这个名字单独拆出去
    const { default: HugeA } = await import(
      /* webpackChunkName: "external_A" */ '../pageA'
    );
    return HugeA;
  },
});

const User = () => {
  // const access = useAccess();
  // if (access.canReadFoo) {
  //   // 如果可以读取 Foo，则...
  //   return (
  //     <Access
  //       accessible={access.canReadFoo}
  //       fallback={<div>Can not read foo content.</div>}
  //     >
  //       Foo content.
  //     </Access>
  //   )
  // }

  return (
    <div>
      <h1 className={styles.title}>User index</h1>
      <PageDynamic />
    </div>
  );
};

// 权限路由
User.wrappers = ['@/wrappers/auth'];
User.title = 'user';

export default User;
