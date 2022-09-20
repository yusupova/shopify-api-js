import {CreateClientClassParams} from '..';

import {createGraphqlClientClass} from './graphql_client';

export function createPaymentsAppsClientClass(params: CreateClientClassParams) {
  const GraphqlClient = createGraphqlClientClass(params);

  return class PaymentsAppsClient extends GraphqlClient {
    baseApiPath = '/payments_apps/api';
  };
}
