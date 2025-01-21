import { Text, TextProps } from '@tarojs/components';

export interface IconProps extends TextProps {
  name: string;
  dot?: boolean;
  info?: string | number;
  color?: string;
  size?: string | number;
  prefix?: string;
}

export const Icon = () => {
  return <Text>123</Text>;
};
