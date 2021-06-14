// 
import React, { ReactPropTypes } from 'react';

export interface DynamicImportOptions {
  isDynamic?: boolean;
  loading?: string;
  ssr?: boolean;
}
export interface DynamicImportProps {
  isDynamic?: boolean;
  loading?: string;
  ssr?: boolean;
}

const defaultOptions: DynamicImportOptions = {
  isDynamic: true,
  loading: '...',
  ssr: false
}

export const withDynamicImport = (
  Component: React.ComponentType, 
  options: DynamicImportOptions

) => function dynamicImport (props: any, options: DynamicImportOptions) {
    console.log(Component);

    return <Component {...props} dynamic={options} />
};
