<!--
  Demonstrates usage of date and time content field types within JSS.
-->
<template>
  <company-specimen v-bind="$props" data-e2e-id="company-fieldusage-date">
    <ul>
      <li>Date helper: <sc-date :field="fields.date" /></li>
      <li>Date helper (datetime): <sc-date :field="fields.dateTime" /></li>
      <li>
        UTC Date string:&nbsp;
        <!--
          Date helper provides a `formatter` prop to give you direct access to the JS Date object for formatting.
          IMPORTANT: the formatter prop is ignored when in Experience Editor mode to support inline editing.
        -->
        <sc-date :field="fields.date" :formatter="(date) => (date ? date.toUTCString() : null)" />
      </li>
      <li>
        Localized Date string (local timezone):&nbsp;
        <sc-date
          :field="fields.date"
          :formatter="(date) => (date ? date.toLocaleDateString() : null)"
        />
      </li>
      <li>
        Localized DateTime string (local timezone):&nbsp;
        <!--
          Date helper also has a scoped slot that allows more granular control over the rendered output.
          For instance, you may wish to wrap the value in custom markup.
          IMPORTANT: the scoped slot is ignored when in Experience Editor mode to support inline editing.
        -->
        <sc-date :field="fields.dateTime">
          <template v-slot="{ date }">
            <em>{{ date ? date.toLocaleDateString() : null }}</em>
          </template>
        </sc-date>
      </li>
    </ul>
  </company-specimen>
</template>

<script>
import { DateField } from '@sitecore-jss/sitecore-jss-vue';
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-FieldUsage-Date',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScDate: DateField,
    CompanySpecimen,
  },
};
</script>
