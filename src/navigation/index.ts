import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const MAIN_NAV = {
  HOME: 'Home',
  NAMES: 'Names',
} as const;

export type MainNavParamList = {
  [MAIN_NAV.HOME]: undefined;
  [MAIN_NAV.NAMES]: undefined;
};

export type HomeScreenNavigationProps = NativeStackScreenProps<
  MainNavParamList,
  'Home'
>;

export type NamesScreenNavigationProps = NativeStackScreenProps<
  MainNavParamList,
  'Names'
>;
