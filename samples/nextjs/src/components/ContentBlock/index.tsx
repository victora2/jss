import { Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';
import styled from 'styled-components';

const Styled = styled.div.attrs({ className: "styled-class"})`
  background-color: red;

  p {
    background-color: ${({theme}) => theme.colors.main};
  }
`;

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
  <>
    <Styled>
      <Text tag="h2" className="display-4" field={fields.heading} />
      <RichText className="contentDescription" field={fields.content} />
    </Styled>
  </>
);

export default ContentBlock;