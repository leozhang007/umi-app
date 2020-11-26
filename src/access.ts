// 对应 .umirc.ts -> routes 配置项 加上 access: 'canReadFoo'
export default function(initialState) {
  const { userId, role } = initialState;
  return {
    canReadFoo: true,
    canUpdateFoo: role === 'admin',
    canDeleteFoo: foo => {
      return foo.ownerId === userId;
    },
  };
}
