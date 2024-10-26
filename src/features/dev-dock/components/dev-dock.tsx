import { FloatingDock } from '@components/ui/floating-dock';
import { setTheme } from '@features/theme/utils/themeSlice';
import {
  Home,
  Info,
  Moon,
  MousePointer,
  MousePointerClick,
  Sun,
} from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCurrentSystemPerformance,
  getDimensionsInString,
  getZoomLevelInPercentage,
} from '../utils/utils.js';

export function DeveloperDock() {
  const currentTheme = useSelector((state: any) => state.currentTheme.value);
  const [isSelectionMode, setIsSelectionMode] = React.useState<boolean>(false);
  const [language, setLanguage] = React.useState<string>('EN');
  const [systemPerformance, setSystemPerformance] = React.useState<{
    cpuUsage: string;
    ramUsage: string;
    networkUsage: number;
  } | null>(null);
  const [dimensions, setDimensions] = React.useState<string>('');
  const [zoom, setZoom] = React.useState<number>(100);
  const dispatch = useDispatch();

  useEffect(() => {
    const dimensions = getDimensionsInString(window);
    setDimensions(dimensions);
  }, [window.innerWidth]);

  useEffect(() => {
    const updatePerformance = () => {
      const performance = getCurrentSystemPerformance(window);
      setSystemPerformance(performance);
    };

    updatePerformance();
    const interval = setInterval(updatePerformance, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateZoom = () => {
      const zoom = getZoomLevelInPercentage(window);
      setZoom(zoom);
    };

    updateZoom();
    window.addEventListener('resize', updateZoom);
    window.addEventListener('devicePixelRatio', updateZoom);

    return () => {
      window.removeEventListener('resize', updateZoom);
      window.removeEventListener('devicePixelRatio', updateZoom);
    };
  }, []);

  const highlighterRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    const newTheme =
      currentTheme === 'light-default' ? 'dark-default' : 'light-default';
    dispatch(setTheme(newTheme));
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'EN' ? 'VI' : 'EN'));
  };

  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      if (!isSelectionMode) return;

      const target = event.target as HTMLElement;
      if (target && highlighterRef.current) {
        const rect = target.getBoundingClientRect();
        highlighterRef.current.style.width = `${rect.width}px`;
        highlighterRef.current.style.height = `${rect.height}px`;
        highlighterRef.current.style.left = `${rect.left + window.scrollX}px`;
        highlighterRef.current.style.top = `${rect.top + window.scrollY}px`;
        highlighterRef.current.style.pointerEvents = 'none';
        highlighterRef.current.style.zIndex = '9999';
        highlighterRef.current.style.border =
          '2px dashed rgba(0, 123, 255, 0.8)';
        highlighterRef.current.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
      }
    };

    const handleMouseLeave = () => {
      if (highlighterRef.current) {
        highlighterRef.current.style.width = '0';
        highlighterRef.current.style.height = '0';
      }
    };

    if (isSelectionMode) {
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);
    }

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [isSelectionMode]);

  const resetZoom = () => {
    document.body.style.transform = 'scale(1)';
    document.body.style.transformOrigin = '0 0';
    setZoom(100);
  };

  const links = [
    {
      title: isSelectionMode ? 'Selection Mode: ON' : 'Selection Mode: OFF',
      icon: isSelectionMode ? (
        <MousePointerClick className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ) : (
        <MousePointer className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
      action: toggleSelectionMode,
    },
    {
      title: `Language: ${language}`,
      icon: (
        <div>
          <span className="text-base text-neutral-500 dark:text-neutral-300">
            {language}
          </span>
        </div>
      ),
      href: '#',
      action: toggleLanguage,
    },
    {
      title: 'Dimensions',
      icon: (
        <div>
          <span className="text-base text-neutral-500 dark:text-neutral-300">
            {dimensions}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex gap-2 text-base text-neutral-500 dark:text-neutral-300">
          {systemPerformance ? (
            <>
              <span className="font-bold">CPU:</span>{' '}
              {systemPerformance.cpuUsage}
              <span className="font-bold">RAM:</span>{' '}
              {systemPerformance.ramUsage}
              <span className="font-bold">Network:</span>{' '}
              {systemPerformance.networkUsage}
            </>
          ) : (
            'Loading...'
          )}
        </div>
      ),
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      action: () => window.location.reload(),
    },
    {
      title: 'Theme',
      icon:
        currentTheme !== 'light-default' ? (
          <Moon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ) : (
          <Sun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
      href: '#',
      action: toggleTheme,
    },
    {
      title: 'Zoom',
      icon: (
        <div>
          <span className="text-xs text-neutral-500 dark:text-neutral-300">
            {zoom}%
          </span>
        </div>
      ),
    },
    {
      title: `Info`,
      icon: (
        <Info className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      action: () => alert(`Browser: ${navigator.userAgent}`),
    },
  ];

  return (
    <div className="relative flex h-[35rem] w-full items-center justify-center">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
      {isSelectionMode && (
        <div
          ref={highlighterRef}
          className="fixed transition-all"
          style={{ width: 0, height: 0 }}
        />
      )}
    </div>
  );
}
