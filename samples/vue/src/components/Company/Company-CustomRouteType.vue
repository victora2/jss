<!--
  Demonstrates gaining access to root route-level data from within components.
-->
<template>
  <div data-e2e-id="company-customroutetype">
    <sc-text tag="h3" :field="routeData.fields.headline" />

    <p>
      <em> By <sc-text :field="routeData.fields.author" /> </em>
    </p>

    <sc-rich-text :field="routeData.fields.content" />

    <router-link to="/company">Return to the Company</router-link>
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Company-CustomRouteType',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScText: Text,
    ScRichText: RichText,
  },
  computed: {
    routeData() {
      // this.$jss is defined on the Vue instance by the SitecoreJssPlugin and provides
      // reactive access to the root level route data provided in layout service data.
      return this.$jss.routeData();
    },
  },
};
</script>
