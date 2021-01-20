import { Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

import styles from './ContentBlock.module.css';
import globalStyles from '../../styles/Global.module.css';

type ContentBlockProps = StyleguideComponentProps & {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
  <div className={`${styles.red} ${globalStyles.blue}`}>
    <Text tag="h2" className="display-4" field={fields.heading} />
    <RichText className="contentDescription" field={fields.content} />
  </div>
);

export default ContentBlock;
