export type RootState = ReturnType<typeof import('./index').store.getState>;
export type AppDispatch = typeof import('./index').store.dispatch;
