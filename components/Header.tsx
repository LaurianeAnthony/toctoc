import { Typography } from '@/components/ui/Typography';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, View } from 'react-native';
import ButtonIcon from './ui/ButtonIcon';
import { IconName } from './ui/IconSymbol';


export type HeaderProps = {
  title: string;
  icon?: IconName
  onPress?: () => void;
};

export default function Header({title, icon, onPress}: HeaderProps) {
  const {colors} = useTheme()
  return (
    <View
        style={[styles.header, { backgroundColor: colors.background.secondary,  }]}
      >
       {icon && onPress && <ButtonIcon onPress={onPress} icon={icon} size={32}/>}
      <Typography color={colors.content.secondary} variant="title">{title}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20, paddingTop: 48, paddingBottom: 20,
  },
});

