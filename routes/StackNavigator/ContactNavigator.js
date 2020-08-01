import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import ContactListView from "../../views/ContactListView"
import ContactPageView from "../../views/ContactPageView"
import CreateNewUserView from "../../views/CreateNewUserView"

const ContactNavigator = createStackNavigator({
  List: ContactListView,
  Page: ContactPageView,
  Create: CreateNewUserView
});

export default createAppContainer(ContactNavigator);
