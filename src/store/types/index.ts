import { store } from '../store';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { AppDispatch, RootState };
