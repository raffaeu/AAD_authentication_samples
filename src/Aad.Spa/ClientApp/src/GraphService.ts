// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet1>
import { GraphRequestOptions, PageCollection, PageIterator } from '@microsoft/microsoft-graph-client';

var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken: string) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests

    authProvider: (done: any) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client
    .api('/me')
    .select('displayName,mail,userPrincipalName,photo')
    .get();

  return user;
}

export async function getUserPhoto(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const photo = await client
    .api('/me/photo/$value')
    .version('beta')
    .get();

  return photo;
}