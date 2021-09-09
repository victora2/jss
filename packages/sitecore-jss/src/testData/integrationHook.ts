import liveLayoutServiceResponse from './liveLayoutServiceResponse.json';
import mockLayoutServiceResponse from './mockLayoutServiceResponse.json';
import liveLayoutServiceResponseRest from './liveLayoutServiceResponseRest.json';
import mockLayoutServiceResponseRest from './mockLayoutServiceResponseRest.json';
// import mockLayoutServiceResponseRest from './mockLayoutServiceResponseRest.json';
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
  siteName: string;
  env: string;
  response: LayoutServiceData | MockLayoutServiceData | unknown;
}

interface GqlMochaHooks {
  endpoint: string;
}
interface RestMochaHooks {
  apiHost: string;
  responseUrl?: string;
}
export const mochaHooksGql = (): MochaHooks & GqlMochaHooks => {
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

export const mochaHooksRest = (): MochaHooks & RestMochaHooks => {
  if (process.env.CI) {
    return {
      apiKey: 'ADCF0159-031F-4093-9DDA-45FF14C81989',
      apiHost: 'https://cm.jssdev.localhost',
      siteName: 'JssNextWeb',
      env: 'ci',
      response: liveLayoutServiceResponseRest,
    };
  } else {
    return {
      // return nock hooks here - set hostname apikey etc?
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      apiHost: 'http://sctest',
      siteName: 'supersite',
      env: 'dev',
      response: mockLayoutServiceResponseRest,
      responseUrl:
        'http://sctest/sitecore/api/layout/render/jss?item=%2Fstyleguide&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=en&tracking=true',
    };
  }
};
