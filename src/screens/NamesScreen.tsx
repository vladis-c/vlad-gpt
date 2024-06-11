import {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NamesScreenNavigationProps} from '../navigation';
import {NamesContext} from '../context/NamesContext';

const NamesScreen = ({navigation}: NamesScreenNavigationProps) => {
  const {names} = useContext(NamesContext);

  return (
    <View style={styles.container}>
      <Text>{names.map(el => el.name).join(', ')}</Text>
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
