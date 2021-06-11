import { Text, RichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, SpecimenFields } from 'lib/component-props';

type SpecimenProps = ComponentProps &
  SpecimenFields & {
    e2eId: string;
    children: React.ReactNode;
  };

/**
 * Helper component that displays explanatory information and where to find the definitions
 * of specimens.
 */
const Specimen = ({
  fields: { heading, description },
  children,
  rendering,
  e2eId,
}: SpecimenProps): JSX.Element => (
  <div
    className="pt-3"
    id={`i${rendering.uid && rendering.uid.replace(/[{}]/g, '')}`}
    data-e2e-id={e2eId}
  >
    <Text tag="h4" field={heading} />
    <RichText field={description} />

    <p>
      <small>
        Implementation: <code>/src/components/**/{rendering.componentName}.tsx</code>
      </small>
    </p>
    <div className="border p-2">{children}</div>
  </div>
);

export default withDatasourceCheck()(Specimen);
