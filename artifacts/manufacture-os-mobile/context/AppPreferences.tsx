import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = '@manufactureos/mobile-preferences';

type Preferences = {
  completedSafetyIds: string[];
  qualityAlertReviewed: boolean;
  productionWindow: string;
};

type PreferencesContextValue = Preferences & {
  isHydrated: boolean;
  reviewQualityAlert: () => void;
  toggleSafetyItem: (id: string) => void;
  setProductionWindow: (window: string) => void;
};

const defaultPreferences: Preferences = {
  completedSafetyIds: [],
  qualityAlertReviewed: false,
  productionWindow: 'Hari ini',
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!isMounted) return;
        if (stored) {
          setPreferences({ ...defaultPreferences, ...JSON.parse(stored) });
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (isMounted) setIsHydrated(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)).catch(() => undefined);
  }, [isHydrated, preferences]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      ...preferences,
      isHydrated,
      reviewQualityAlert: () =>
        setPreferences((current) => ({ ...current, qualityAlertReviewed: true })),
      toggleSafetyItem: (id) =>
        setPreferences((current) => ({
          ...current,
          completedSafetyIds: current.completedSafetyIds.includes(id)
            ? current.completedSafetyIds.filter((item) => item !== id)
            : [...current.completedSafetyIds, id],
        })),
      setProductionWindow: (window) =>
        setPreferences((current) => ({ ...current, productionWindow: window })),
    }),
    [isHydrated, preferences],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('useAppPreferences must be used inside AppPreferencesProvider');
  }
  return context;
}