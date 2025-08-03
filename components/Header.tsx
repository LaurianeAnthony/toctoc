import { Typography } from '@/components/ui/Typography';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, View } from 'react-native';
import { IconName, IconSymbol } from './ui/IconSymbol';


export type HeaderProps = {
  title: string;
  icon?: IconName
};

export default function Header({title, icon}: HeaderProps) {
  const {colors} = useTheme()
  return (
    <View
        style={[styles.header, { backgroundColor: colors.background.secondary,  }]}
      >
       {icon && <IconSymbol
                name={icon}
                size={18}
                weight="medium"
                color={colors.content.secondary}
              />}
      <Typography color={colors.content.secondary} variant="title">{title}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20, paddingTop: 48, paddingBottom: 20,
  },
});

