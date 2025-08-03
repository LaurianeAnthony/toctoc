import { useTheme } from '@/hooks/useTheme';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';



export default function Screen({children}: PropsWithChildren) {
  const {colors} = useTheme()
  return (
    <View style={[styles.root, { backgroundColor: colors.background.layout }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
});

