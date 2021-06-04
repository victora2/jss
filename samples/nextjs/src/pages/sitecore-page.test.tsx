import 'jsdom-global/register';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SitecorePageProps } from 'lib/page-props';
import SitecorePage from './[[...path]]';
import { I18nProvider } from 'next-localization';

describe('SitecorePage', () => {
  describe('useMemo', () => {
    it('should return rendered component if it is not null', () => {

      const wrapper = shallow(
        <I18nProvider locale='en'>
          <SitecorePage {...getSitecorePageProps()} />
        </I18nProvider>
      );
      expect(wrapper).is.not.null;
      console.log(wrapper.html());
    });
  });
});

function getSitecorePageProps(): SitecorePageProps {
  return {
    locale: '',
    layoutData: {
      sitecore: {
        context: {},
        route: {
          name: 'name',
          placeholders: { 'jss-main': [] },
        },
      },
    },
    dictionary: {},
    componentProps: {},
    notFound: false,
    tracked: false,
    isPreview: false,
  };
}
