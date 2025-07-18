
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { endpoint_demo } from '../util/NFAppUtil';
import { Picker } from '@react-native-picker/picker';

export default function Settings() {
  const [env, setEnv] = useState('');
  const [kcEnv, setKcEnv] = useState('');
  const [kcRealm, setKcRealm] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.head}>Set Global Environment</Text>
      <Picker
        selectedValue={env}
        onValueChange={(itemValue) => setEnv(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="dev2" value={endpoint_demo} />
      </Picker>

      <View style={styles.space} />

      <View style={styles.table}>

        <View style={[styles.dataRow]}>
          <Text style={[styles.cell]}>{endpoint_demo}</Text>
        </View>
      </View>

      <View style={styles.space} />
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell]}>Name</Text>
          <Text style={[styles.headerCell]}>Value</Text>
        </View>
        <View style={[styles.dataRow]}>
          <Text style={[styles.cell]}>Referrer</Text>
          <Text style={[styles.cell]}>demo</Text>
        </View>
        <View style={[styles.dataRow]}>
          <Text style={[styles.cell]}>Client</Text>
          <Text style={[styles.cell]}>vdc-test-app</Text>
        </View>
        <View style={[styles.dataRow]}>
          <Text style={[styles.cell]}>Log Level</Text>
          <Text style={[styles.cell]}>debug</Text>
        </View>
      </View>

      <View style={styles.space} />
      <Text style={styles.head}>JWT Configuration</Text>
      <View style={styles.space} />

      <Text style={styles.head}>Keycloak Environments</Text>

      <Text style={styles.head}>Environment</Text>
      <Picker
        selectedValue={kcEnv}
        onValueChange={(itemValue) => setKcEnv(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="dev1" value={endpoint_demo} />
      </Picker>

      <Text style={styles.head}>Realm</Text>
      <Picker
        selectedValue={kcRealm}
        onValueChange={(itemValue) => setKcRealm(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="livelyvideo-dev" value={endpoint_demo} />
      </Picker>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  head: {
    fontWeight: '600',
    marginTop: 10
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 3,
  },
  space: {
    height: 12,
  },
  table: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
  },
  headerCell: {
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    padding: 15,
    textAlign: 'center',
    color: '#333',
    fontSize: 12
  },
});
