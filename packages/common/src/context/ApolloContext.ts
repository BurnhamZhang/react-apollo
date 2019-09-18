import {Context,createContext} from '@tarojs/taro';
import ApolloClient from 'apollo-client';

export interface ApolloContextValue {
  client?: ApolloClient<object>;
  renderPromises?: Record<any, any>;
}

let apolloContext: Context<ApolloContextValue>;

export function getApolloContext() {
  if (!apolloContext) {
    apolloContext = createContext<ApolloContextValue>({});
  }
  return apolloContext;
}

export function resetApolloContext() {
  apolloContext = createContext<ApolloContextValue>({});
}

export function setApolloContext(context) {
  apolloContext = context;
}
