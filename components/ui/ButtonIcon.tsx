import { useTheme } from '@/hooks/useTheme';
import { TouchableOpacity } from 'react-native';
import { IconName, IconSymbol } from './IconSymbol';


export type ButtonIconProps = {
  onPress: () => void;
  icon: IconName
  size?: number
};

export default function ButtonIcon({onPress, icon, size = 16}: ButtonIconProps) {
  const {colors} = useTheme()
  return (
    <TouchableOpacity
    onPress={onPress}
      >
       <IconSymbol
                name={icon}
                size={size}
                weight="medium"
                color={colors.content.secondary}
              />
    </TouchableOpacity>
  );
}

