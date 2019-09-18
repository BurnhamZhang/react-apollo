import { useState, useRef, useEffect } from '@tarojs/taro';
import {ApolloContextValue, getApolloContext, OperationVariables} from '@apollo/taro-common';
import { DocumentNode } from 'graphql';

import { MutationHookOptions, MutationTuple } from './types';
import { MutationData } from './data/MutationData';

export function useMutation<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> {
  const context = getApolloContext() as ApolloContextValue;
  const [result, setResult] = useState({ called: false, loading: false });
  const updatedOptions = options ? { ...options, mutation } : { mutation };

  const mutationDataRef = useRef<MutationData<TData, TVariables>>();
  function getMutationDataRef() {
    if (!mutationDataRef.current) {
      mutationDataRef.current = new MutationData<TData, TVariables>({
        options: updatedOptions,
        context,
        result,
        setResult
      });
    }
    return mutationDataRef.current;
  }

  const mutationData = getMutationDataRef();
  mutationData.setOptions(updatedOptions);
  mutationData.context = context;

  useEffect(() => mutationData.afterExecute());

  return mutationData.execute(result);
}
