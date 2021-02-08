import React from 'react';
import { mount } from '@shopify/react-testing';

type HookResolver = (
  hook: (params: unknown) => unknown,
  hookParams?: unknown
) => any;

export const resolveHook: HookResolver = (hook, hookParams) => {
  let hookValue;

  const HookWrapper = () => {
    hookValue = hook(hookParams);
    return <></>;
  };

  const renderHook = () => {
    return mount(<HookWrapper />);
  };

  const wrapper = renderHook();

  return { hook: hookValue, wrapper };
};

export const flushPromises = () => new Promise(setImmediate);
