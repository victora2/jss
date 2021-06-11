import { Field, Placeholder, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SectionProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Section = (props: SectionProps): JSX.Element => (
  <div className="pt-3" id={`i${props.rendering.uid && props.rendering.uid.replace(/[{}]/g, '')}`}>
    <Text className="border-bottom" field={props.fields.heading} tag="h3" />
    <Placeholder name="jssnextpersonalizationweb-section" rendering={props.rendering} />
  </div>
);

export default Section;
