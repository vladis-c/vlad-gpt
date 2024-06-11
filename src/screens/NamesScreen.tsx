import {Text, View, StyleSheet} from 'react-native';
import {NamesScreenNavigationProps} from '../navigation';

const NamesScreen = ({navigation}: NamesScreenNavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default NamesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
