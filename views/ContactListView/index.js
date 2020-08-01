import React, {Component} from 'react';
import {
  ScrollView,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import ContactElem from '../../components/ContactElem';
import SearchBar from '../../components/SearchBar';

class ContactListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      typeSearch: null,
    };
    Contacts.iosEnableNotesUsage(true);
    this.search = this.search.bind(this);
    this.initPage = this.initPage.bind(this);
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ]).then(() => {
        this.loadContacts();
      });
    }
  }

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.warn('Permission to access contacts was denied');
      } else {
        this.setState({contacts});
      }
    });
  }

  initPage() {
    this.setState({typeSearch: null});
    this.loadContacts();
  }

  onAdd() {
    this.props.navigation.navigate('Create', {onAdd: this.initPage});
  }

  onPressContact(contact) {
    this.setState({typeSearch: null});
    this.props.navigation.navigate('Page', {contact, onDelete: this.initPage});
  }

  search(text) {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        this.setState({contacts});
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text, (err, contacts) => {
        this.setState({contacts});
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        this.setState({contacts});
      });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.manipulateBlock}>
            <SearchBar
              onChangeText={this.search}
            />
            <Button
              title="Add"
              style={styles.addContactButton}
              onPress={() => this.onAdd()}
            />
          </View>
          {this.state.contacts.map((contact) => (
            <ContactElem
              displayName={contact.displayName}
              key={contact.recordID}
              onPress={() => this.onPressContact(contact)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  manipulateBlock: {
    margin: 10,
  },
  addContactButton: {
    color: '#D3D3D3',
  },
});

export default ContactListView;
