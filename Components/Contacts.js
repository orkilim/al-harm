import React, { useEffect, useState} from 'react';
import * as Contacts from 'expo-contacts';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize : 40,
  },
});


export default function App() {
  const [contacts, setContacts ] = useState([])
  const [closeFriends, setCloseFriends ] = useState([])

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const result = data.filter((item) => item.name !== undefined)
          setContacts(result)
        }
      }
    })();
  }, []);

  useEffect(() => {
    console.log('closeFriends: ', closeFriends)
  }, [closeFriends])

  return (
    <FlatList
        data={contacts}
        numColumns={1}
        renderItem={({ item }) =>
        <TouchableOpacity onPress={() => setCloseFriends([ ...closeFriends, { name: item.name, phoneNumber: item.phoneNumbers[0].number }])}>
          <View style={styles.container}>
              <View style={styles.textArea}>
                <Text style={{fontSize : 40}}> {item.name}</Text>
              </View>
          </View>
        </TouchableOpacity>
        }
        ItemSeparatorComponent={()=> <View style={{height: 2, width: "100%", backgroundColor: "rgba(0,0,0,0.5)", }} />}
        keyExtractor={(item, index) => index.toString()}
    />
  );
}
