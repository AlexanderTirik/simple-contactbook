import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

class ContactElem extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.contactElem}>
        <View>
          <Text>{this.props.displayName}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  contactElem: {
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    padding: 10
  },
});

export default ContactElem;
