// ─── Helpers ─────────────────────────────────────────────────────────────────
import { ref } from 'vue';

import type { OptionValue } from '../ListResults.properties';

type OptionsProperties = {
  labelKey: string;
  valueKey: string;
};

export const getLabel = (item: any, props: OptionsProperties) => {
  if (!item) return undefined;
  return typeof item === 'object' ? item[props.labelKey] : item;
};

export const getValue = (item: any, props: OptionsProperties) => {
  if (!item) return undefined;
  return typeof item === 'object' ? item[props.valueKey] : item;
};

type OptionsStrategy<ITEM> = {
  options: ReturnType<typeof ref<OptionValue[]>>;

  setOptions: (options: ITEM[] | undefined) => void;
  getOption: (options: ITEM) => OptionValue | undefined;
  getOriginal: (options: OptionValue) => ITEM | undefined;
  getOriginals: (...options: OptionValue[]) => ITEM | undefined;
  getLabels: (...options: ITEM[]) => string[];
  getValues: (...options: ITEM[]) => string[];
};

const DefaultOptionsStrategy = <ITEM>(
  props: OptionsProperties,
): OptionsStrategy<ITEM> => {
  const options = ref<OptionValue[]>([]);
  const originalMap = new Map<string, ITEM>();
  const optionMap = new Map<string, ITEM>();

  const setOptions = (_options: ITEM[] | undefined) => {
    const optionList = [] as OptionValue[];
    originalMap.clear();
    optionMap.clear();

    _options?.forEach((option) => {
      const optionValue = {
        value: getValue(option, props),
        label: getLabel(option, props),
      };

      originalMap.set(optionValue.value, option);

      optionList.push(optionValue);
    });

    options.value = optionList;
  };

  const getOriginal = (option: OptionValue): ITEM | undefined => {
    return originalMap.get(option.value);
  };

  const getOriginals = (...optionList: OptionValue[]): ITEM[] => {
    return optionList.map(getOriginal).filter(Boolean);
  };

  const getOption = (option: ITEM): OptionValue | undefined => {
    return optionMap.get(getValue(option, props)!);
  };

  const getLabels = (...optionList: ITEM[]): string[] => {
    return optionList.map((option) => getLabel(option, props));
  };

  const getValues = (...optionList: ITEM[]): string[] => {
    return optionList.map((option) => getValue(option, props));
  };

  return {
    options,
    setOptions,
    getOriginal,
    getLabels,
    getValues,
    getOption,
    getOriginals,
  };
};

export const useOptions = <ITEM = any>(props: OptionsProperties) => {
  const strategy = DefaultOptionsStrategy<ITEM>(props);

  return strategy;
};
