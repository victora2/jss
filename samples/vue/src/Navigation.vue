<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom"
  >
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <router-link to="/" class="text-dark">
        <img :src="logoImg" alt="Sitecore" />
      </router-link>
    </h5>
    <!-- note: `$t` is a computed property on the Vue instance, defined by the vue-i18n plugin -->
    <nav class="my-2 my-md-0 mr-md-3">
      <a
        class="p-2 text-dark"
        href="https://github.com/victora2/cli2Cms"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('Documentation') }}
      </a>
      <router-link to="/company" class="p-2 text-dark">
        {{ $t('Company') }}
      </router-link>
      <router-link to="/contact" class="p-2 text-dark disabled">
        {{ $t('Contact') }}
      </router-link>
      <button class="btn btn-secondary align-baseline" type="button" v-on:click="toggleContext">
        {{ contextButtonText }}
      </button>
    </nav>
  </div>
</template>

<script>
import logo from './assets/valtech_logo.svg';

export default {
  name: 'Navigation',
  data() {
    return {
      contextButtonText: '',
      logoImg: logo,
    };
  },
  created() {
    // $t is a computed property, so it's not defined when initializing the `data` object.
    // Therefore, use the `created` hook to set the data.
    this.contextButtonText = this.$t('show-context-data');
  },
  // `toggleContextView` is provided from AppRoot
  inject: {
    toggleContextView: {
      type: Function,
    },
  },
  methods: {
    toggleContext() {
      this.toggleContextView();
      this.contextButtonText =
        this.contextButtonText === this.$t('hide-context-data')
          ? this.$t('show-context-data')
          : this.$t('hide-context-data');
    },
  },
};
</script>
