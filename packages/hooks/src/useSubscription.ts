import {  useState, useRef, useEffect } from '@tarojs/taro';
import { DocumentNode } from 'graphql';
import { getApolloContext, OperationVariables } from '@apollo/taro-common';

import { SubscriptionHookOptions } from './types';
import { SubscriptionData } from './data/SubscriptionData';

export function useSubscription<TData = any, TVariables = OperationVariables>(
  subscription: DocumentNode,
  options?: SubscriptionHookOptions<TData, TVariables>
) {
  const context = getApolloContext();
  const updatedOptions = options
    ? { ...options, subscription }
    : { subscription };
  const [result, setResult] = useState({
    loading: !updatedOptions.skip,
    error: undefined,
    data: undefined
  });

  const subscriptionDataRef = useRef<SubscriptionData<TData, TVariables>>();
  function getSubscriptionDataRef() {
    if (!subscriptionDataRef.current) {
      subscriptionDataRef.current = new SubscriptionData<TData, TVariables>({
        options: updatedOptions,
        context,
        setResult
      });
    }
    return subscriptionDataRef.current;
  }

  const subscriptionData = getSubscriptionDataRef();
  subscriptionData.setOptions(updatedOptions);
  subscriptionData.context = context;

  useEffect(() => subscriptionData.afterExecute());
  useEffect(() => subscriptionData.cleanup.bind(subscriptionData), []);

  return subscriptionData.execute(result);
}
