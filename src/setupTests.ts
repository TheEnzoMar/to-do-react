import '@shopify/react-testing/matchers';
import { destroyAll } from '@shopify/react-testing';
import { noop } from './utilities';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

global.scroll = noop;

afterEach(() => {
  destroyAll();
});
