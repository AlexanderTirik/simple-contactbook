import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, TextInput} from 'react-native';

class SearchBar extends Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <TextInput
          style={styles.searchBar}
          onChangeText={this.props.onChangeText}
          placeholder="Search"
          autoCorrect={false}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default SearchBar;
