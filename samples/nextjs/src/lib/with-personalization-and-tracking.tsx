import {
  isServer,
  LayoutPersonalizationService,
  withSitecorePersonalizationContext,
  areQueryParamsReady,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { TrackingService } from '../../../../packages/sitecore-jss-tracking/types';
import { SitecorePageProps } from 'lib/page-props';
import { useRouter } from 'next/router';

export function withCurrentPageTracking<T extends SitecorePageProps>(
  Component: React.ComponentClass<T> | React.SFC<T>,
  trackingService: TrackingService
): (props: T) => JSX.Element {
  return function WithCurrentPageTrackingHoc(props: T) {
    const newProps = { ...props };
    const route = props.layoutData?.sitecore.route;
    if (
      !props.isPreview &&
      !props.tracked &&
      route &&
      route.layoutId !== 'available-in-connected-mode' &&
      areQueryParamsReady(useRouter()) &&
      !isServer()
    ) {
      trackingService.trackCurrentPage(props.layoutData?.sitecore.context, route);
      newProps.tracked = true;
    }
    return <Component {...newProps} />;
  };
}

export function withNotFoundPageTracking<T extends SitecorePageProps>(
  Component: React.ComponentClass<T> | React.SFC<T>,
  trackingService: TrackingService
): (props: T) => JSX.Element {
  return function withNotFoundPageTracking(props: T) {
    if (areQueryParamsReady(useRouter()) && !isServer()) {
      trackingService.trackPage(
        {
          url: location.pathname + location.search,
          referrer: document.referrer,
        },
        { sc_trk: 'Page not found' }
      );
    }
    return <Component {...props} />;
  };
}

export function withPersonalizationAndTracking<T extends SitecorePageProps>(
  Component: React.ComponentClass<T> | React.SFC<T>,
  layoutPersonalizationService: LayoutPersonalizationService,
  trackingService: TrackingService
): (props: T) => JSX.Element {
  return withSitecorePersonalizationContext(
    withCurrentPageTracking(Component, trackingService),
    layoutPersonalizationService
  );
}
