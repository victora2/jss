import liveLayoutServiceResponse from './liveLayoutServiceResponse.json';
import mockLayoutServiceResponse from './mockLayoutServiceResponse.json';
import { LayoutServiceData } from '../../types';

interface MockLayoutServiceData {
  sitecore: {
    context: {
      pageEditing: boolean;
      site: { name: string };
    };
    route: {
      name: string;
      layoutId: string;
    };
  };
}

interface MochaHooks {
  apiKey: string;
  endpoint: string;
  siteName: string;
  env: string;
  response: LayoutServiceData | MockLayoutServiceData;
}
export const mochaHooks = (): MochaHooks => {
  if (process.env.CI) {
    return {
      apiKey: 'ADCF0159-031F-4093-9DDA-45FF14C81989',
      endpoint: 'https://cm.jssdev.localhost/sitecore/api/graph/edge',
      siteName: 'JssNextWeb',
      env: 'ci',
      response: liveLayoutServiceResponse,
    };
  } else {
    return {
      // return nock hooks here - set hostname apikey etc?
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      endpoint: 'http://sctest/graphql',
      siteName: 'supersite',
      env: 'dev',
      response: mockLayoutServiceResponse,
    };
  }
};
