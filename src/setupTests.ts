import '@shopify/react-testing/matchers';
import { destroyAll } from '@shopify/react-testing';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

afterEach(() => {
  destroyAll();
});
