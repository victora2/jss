<template>
  <company-specimen v-bind="$props" data-e2e-id="company-componentparams">
    <p :class="params.cssClass">
      The CSS class of this paragraph (<code>{{ params.cssClass }}</code
      >) is set using a param
    </p>
    <div>
      <!-- Note that all params come in as string values, like this boolean-like param here: -->
      useCallToAction param: <code>{{ params.useCallToAction }}</code>
      <br />
      param type: <code>{{ typeof params.useCallToAction }}</code>
      <div class="alert alert-info" v-if="params.useCallToAction === 'true'">
        the call to action is shown
      </div>
    </div>
    <p>columns param: {{ params.columns }}</p>
    <div class="row" v-if="columnsArray">
      <div v-for="(_, index) in columnsArray" :key="index" class="col-sm">Column {{ index }}</div>
    </div>
  </company-specimen>
</template>

<script>
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-Specimen',
  props: {
    params: {
      type: Object,
    },
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  computed: {
    columnsArray() {
      return this.params.columns && [...Array(parseInt(this.params.columns))];
    },
  },
  components: {
    CompanySpecimen,
  },
};
</script>
