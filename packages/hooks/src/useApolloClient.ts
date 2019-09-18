import { invariant } from 'ts-invariant';
import { getApolloContext } from '@apollo/taro-common';
import ApolloClient from 'apollo-client';

export function useApolloClient(): ApolloClient<object> {
  const { client } = getApolloContext();
  invariant(
    client,
    'No Apollo Client instance can be found. Please ensure that you ' +
      'have called `ApolloProvider` higher up in your tree.'
  );
  return client!;
}
