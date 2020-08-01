import React, {Component} from 'react';
import {View, Text, StyleSheet, Linking, Button, Image} from 'react-native';
import Contacts from 'react-native-contacts';

class ContactPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteTitle: 'Delete',
    };
    this.handleCall = this.handleCall.bind(this);
  }
  handleCall() {
    const contact = this.props.navigation.state.params.contact;
    Linking.openURL(`tel:${contact.phoneNumbers[0].number}`);
  }
  onDelete() {
    if (this.state.deleteTitle == 'Delete') {
      this.setState({deleteTitle: 'Sure?'});
    } else {
      const contact = this.props.navigation.state.params.contact;
      Contacts.deleteContact(contact, (err) => {
        if (err) console.warn(err);
      });
      this.props.navigation.state.params.onDelete();
      this.props.navigation.goBack();
    }
  }
  render() {
    const contact = this.props.navigation.state.params.contact;
    const hasAvatar = contact.hasThumbnail;
    const avatar = contact.thumbnailPath;
    const displayName = contact.displayName;
    const phoneNumbers = contact.phoneNumbers;
    return (
      <View>
        <View style={styles.contactInfo}>
          {hasAvatar ? (
            <Image
              source={{uri: avatar}}
              style={[styles.avatar, styles.contactInfoElem]}
            />
          ) : null}
          <Text style={styles.contactInfoElem}>Name: {displayName}</Text>
          {phoneNumbers.map((phoneNumber, i) => (
            <Text key={i} style={styles.contactInfoElem}>{`Number ${i + 1}: ${
              phoneNumber.number
            }`}</Text>
          ))}
        </View>
        <View style={styles.buttonGroup}>
          <Button title="Call" onPress={this.handleCall} />
          <Button
            title={this.state.deleteTitle}
            onPress={() => this.onDelete()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  contactInfoElem: {
    margin: 10,
  },
  buttonGroup: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ContactPageView;
