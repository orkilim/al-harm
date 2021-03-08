import React, { useEffect, useState} from 'react';
import * as Contacts from 'expo-contacts';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';

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


export default function ContactsPage() {
  const [contacts, setContacts ] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const [closeFriends, setCloseFriends ] = useState([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const onChangeSearch = query => setSearchQuery(query)
  const [show, setShow] = useState(false)

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
          setFilteredDataSource(result)
        }
      }
    })();
  }, []);

  const updateSearch = (txt) => {
    onChangeSearch(txt)
    setFilteredDataSource(contacts.filter((obj) => obj.name.indexOf(txt) > -1))
    setShow(true)
  }

    return (
        <View>
            <Searchbar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={searchQuery}
                onClear={() => setShow(false)}
            />
            <FlatList
            data={show ? filteredDataSource : contacts}
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
        </View>
      )
}
