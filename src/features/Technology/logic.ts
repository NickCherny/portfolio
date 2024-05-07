import { useState, useCallback, useMemo, useEffect } from 'react';
import { StrapiData, Technology } from '~/types/schema';
import { convertHEXToRGB } from '~/utils/ui/color.utils';
import { useBinnary } from '~/utils/hooks';
import { CheckboxInput } from '~/componentns/CheckboxInput';

import { TechnologyProps } from './types';
import {
  palette,
  LANGUAGE_CODES,
  CORE_STACK,
  FRONTEND_TECHNOLOGIES,
  BACKEND_TECHNOLOGIES,
  MOBILE_TECHNOLOGY,
} from './technology.constants';

const getBackgroundColor = (color: string) =>
  `rgba(${convertHEXToRGB(color).join(', ')}, 0.4)`;

export const useTechnologyLogic = ({ items }: TechnologyProps) => {
  const { value: isFrontendVisible, toggle: toggleFrontendVisiability } =
    useBinnary(true);
  const { value: isBackendVisible, toggle: toggleBackendVisiability } =
    useBinnary(false);

  const { value: isMobileVisible, toggle: toggleMobileVisibility } =
    useBinnary(false);

  const [whiteList, setWhiteList] = useState(LANGUAGE_CODES.concat(CORE_STACK));
  const filteredTechnology = useMemo(
    () =>
      items?.data?.filter((d: StrapiData<Technology>) =>
        whiteList.includes(d.attributes.code.name)
      ) ?? [],
    [whiteList, items?.data]
  );

  const chartData = useMemo(() => {
    return {
      labels: filteredTechnology.map(
        ({ attributes }: StrapiData<Technology>) => attributes.copy
      ),
      datasets: [
        {
          label: 'Level',
          data: filteredTechnology.map(
            ({ attributes }: StrapiData<Technology>) => attributes.level
          ),
          backgroundColor: filteredTechnology.map(
            ({ attributes }: StrapiData<Technology>) =>
              getBackgroundColor(palette[attributes.code.name]) ?? 'grey'
          ),
          borderColor: filteredTechnology.map(
            ({ attributes }: StrapiData<Technology>) =>
              palette[attributes.code.name] ?? 'black'
          ),
          borderWidth: 1,
          barPercentage: 0.7,
          base: 0,
        },
      ],
    };
  }, [filteredTechnology]);

  const filterWhiteList = useCallback((state: boolean, items: string[]) => {
    if (state) {
      setWhiteList((whiteList) => {
        return whiteList.concat(items);
      });
    } else {
      setWhiteList((whiteList) => {
        return whiteList.filter((item) => !items.includes(item));
      });
    }
  }, []);

  useEffect(() => {
    filterWhiteList(isFrontendVisible, FRONTEND_TECHNOLOGIES);
    filterWhiteList(isBackendVisible, BACKEND_TECHNOLOGIES);
    filterWhiteList(isMobileVisible, MOBILE_TECHNOLOGY);
  }, [isFrontendVisible, isBackendVisible, isMobileVisible, filterWhiteList]);

  return {
    chartData,
    isFrontendVisible,
    toggleFrontendVisiability,
    isBackendVisible,
    toggleBackendVisiability,
    isMobileVisible,
    toggleMobileVisibility,
  };
};
