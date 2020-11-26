import { Subscription, Effect, Reducer } from 'umi';
// import { ConnectState } from './connect.d';

/*
内置 dva，默认版本是 ^2.6.0-beta.20，如果项目中有依赖，会优先使用项目中依赖的版本。
约定是到 model 组织方式，不用手动注册 model
文件名即 namespace，model 内如果没有声明 namespace，会以文件名作为 namespace
内置 dva-loading，直接 connect loading 字段使用即可
支持 immer，通过配置 immer 开启

约定式的 model 组织方式
符合以下规则的文件会被认为是 model 文件，

src/models 下的文件
src/pages 下，子目录中 models 目录下的文件
src/pages 下，所有 model.ts 文件
*/
export interface GlobalModelType<U> {
  namespace: 'global';
  state: Record<string, any>;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
    fetchJumpList: Effect;
  };
  reducers: Record<string, Reducer<U>>;
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {},

  effects: {},

  reducers: {},

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        console.log({ pathname });
        // if (typeof window.ga !== 'undefined') {
        //   // window.ga('send', 'pageview', pathname + search);
        // }
      });
    },
  },
};

export default GlobalModel;
