import {shopify, queueMockResponse} from '../../../__tests__/test-helper';

const DOMAIN = 'shop.myshopify.io';
const QUERY = `
{
  shop {
    name
  }
}
`;

const successResponse = {
  data: {
    shop: {
      name: 'Shoppity Shop',
    },
  },
};

describe('Payments GraphQL client', () => {
  it('can return response from specific access token', async () => {
    const client = new shopify.clients.PaymentsApps({
      domain: DOMAIN,
      accessToken: 'bork',
    });

    queueMockResponse(JSON.stringify(successResponse));

    await expect(client.query({data: QUERY})).resolves.toEqual(
      buildExpectedResponse(successResponse),
    );

    const headers: {[key: string]: unknown} = {};
    expect({
      method: 'POST',
      domain: DOMAIN,
      path: `/payments_apps/api/${shopify.config.apiVersion}/graphql.json`,
      data: QUERY,
      headers,
    }).toMatchMadeHttpRequest();
  });
});

function buildExpectedResponse(obj: unknown) {
  const expectedResponse = {
    body: obj,
    headers: expect.objectContaining({}),
  };
  return expect.objectContaining(expectedResponse);
}
