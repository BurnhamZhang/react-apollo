import { OperationVariables, QueryResult } from '@apollo/taro-common';
import { DocumentNode } from 'graphql';

import { QueryHookOptions } from './types';
import { useBaseQuery } from './utils/useBaseQuery';

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
) {
  return useBaseQuery<TData, TVariables>(query, options, false) as QueryResult<
    TData,
    TVariables
  >;
}
