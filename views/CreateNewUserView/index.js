import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import Contacts from 'react-native-contacts';

class CreateNewUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      number: null,
    };

    this.onNameType = this.onNameType.bind(this);
    this.onNumberType = this.onNumberType.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onNameType(text) {
    this.setState({name: text});
  }
  onNumberType(text) {
    this.setState({number: text});
  }

  onAdd() {
    const newPerson = {
      phoneNumbers: [
        {
          label: 'mobile',
          number: this.state.number,
        },
      ],
      displayName: this.state.name,
    };
    Contacts.openContactForm(newPerson, (err) => {
      if (err) console.warn(err);
    });
    this.props.navigation.state.params.onAdd();
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Text style={styles.label}>Contact name</Text>
        <TextInput
          style={styles.form}
          placeholder="Name"
          onChangeText={this.onNameType}
        />
        <Text style={styles.label}>Contact phone number</Text>
        <TextInput
          style={styles.form}
          placeholder="Number"
          onChangeText={this.onNumberType}
        />
        <Button title="Add user" onPress={() => this.onAdd()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 5,
  },
  form: {
    marginLeft: 5,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    marginBottom: 10,
    padding: 10,
  },
});

export default CreateNewUserView;
