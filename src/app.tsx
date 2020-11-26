import { history, API } from 'umi';
import { createLogger } from 'redux-logger';
import { message } from 'antd';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

// 修改 clientRender 参数。
// let isSubApp = false;
// export function modifyClientRenderOpts(memo) {
//   return {
//     ...memo,
//     rootElement: isSubApp ? 'sub-root' : memo.rootElement,
//   };
// }

// 获取整个路由系统
// export function patchRoutes({ routes }) {
//   routes.unshift({
//     path: '/foo',
//     exact: true,
//     component: require('@/extraRoutes/foo').default,
//   });
// }

// 覆写 render。比如用于渲染之前做权限校验
// export function render(oldRender) {
//   fetch('/api/auth').then(auth => {
//     if (auth.isLogin) { oldRender() }
//     else {
//       history.push('/login');
//       oldRender()
//     }
//   });
// }

// 初始加载 和 路由切换
// export function onRouteChange({ location, routes, action }) {
//   bacon(location.pathname);
// }

// 修改交给 react-dom 渲染时的根组件。比如用于在外面包一个 Provider，
// export function rootContainer(container) {
//   return React.createElement(ThemeProvider, null, container);
// }

// dva 运行时配置
export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};

function test() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ready: true });
    }, 500);
  });
}

// getInitialState
// 如果要做权限拦截，此函数会最开始执行，获取权限数据之后,layout、access插件可以获取这个数据
export async function getInitialState() {
  const data = await test();
  return data;
}

// 运行时配置 layout
// export const layout = ({
//   initialState,
// }: {
//   initialState: { settings?: LayoutSettings; currentUser };
// }): BasicLayoutProps => {
//   return {
//     // 个人信息头像
//     rightContentRender: () => <div>user-content</div>,
//     // 底部渲染
//     footerRender: () => (<div>foot-content</div>),
//     onPageChange: () => {
//       const { currentUser } = initialState;
//       const { location } = history;
//       // 如果没有登录，重定向到 login
//       if (!currentUser && location.pathname !== '/user/login') {
//         history.push('/user/login');
//       }
//     },
//     menuHeaderRender: undefined,
//     ...initialState?.settings,
//   };
// };
