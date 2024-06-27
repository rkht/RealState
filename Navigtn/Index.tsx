import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import SplashScreen from '../splashscreen/splash';
import LoginScreen from '../screens/loginpage';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/forgotPassword';
import SignUpScreen from '../screens/SignUp';
import LatestOffers from '../DrawerNavigation/Drawer Items/LatestOffers';
import Requirement from '../DrawerNavigation/Drawer Items/Requirement';
import TopBrokers from '../DrawerNavigation/Drawer Items/TopBrokers';
import HotLeads from '../DrawerNavigation/Drawer Items/HotLeads';
import News from '../DrawerNavigation/Drawer Items/News';
import Events from '../DrawerNavigation/Drawer Items/Events';
import MyRequiremnet from '../DrawerNavigation/Drawer Items/MyRequiremnet';
import MyLead from '../DrawerNavigation/Drawer Items/MyLead';
import Chat from '../DrawerNavigation/Drawer Items/Chat';
import MyVisits from '../DrawerNavigation/Drawer Items/MyVisits';
import Bookmark from '../DrawerNavigation/Drawer Items/Bookmark';
import Notification from '../DrawerNavigation/Drawer Items/Notification';
import Settings from '../DrawerNavigation/Drawer Items/Settings';
import RateUs from '../DrawerNavigation/Drawer Items/RateUs';
import Feedback from '../DrawerNavigation/Drawer Items/Feedback';
import ViewProfile from '../DrawerNavigation/Drawer Items/ViewProfile';
import About from '../DrawerNavigation/Drawer Items/Inside Screens/About&Help';
import Term from '../DrawerNavigation/Drawer Items/Inside Screens/Term&Condition';
import HomeLoan from '../DrawerNavigation/Drawer Items/HomeLoan';
import HomeLoanEnquiry from '../DrawerNavigation/Drawer Items/HomeLoanEnquiry';
import AddBrokerScreen from '../DrawerNavigation/Add Screens/AddBroker';
import AddLatestOffers from '../DrawerNavigation/Add Screens/AddLatestOffers';
import AddRequirement from '../DrawerNavigation/Add Screens/AddRequiremnet';
import AddHotLeads from '../DrawerNavigation/Add Screens/AddHotLeads';
import AddNews from '../DrawerNavigation/Add Screens/AddNews';
import AddEvents from '../DrawerNavigation/Add Screens/AddEvents';
import AddMyRequirement from '../DrawerNavigation/Add Screens/AddMyRequirement';
import SelectRoleScreen from '../screens/SelectRole';
import AddBookmark from '../DrawerNavigation/Add Screens/AddBookmark';
import FilterScreen from '../DrawerNavigation/Drawer Items/Inside Screens/LatestoffersFilter';
import AddRequirementInventoryScreen from '../DrawerNavigation/Drawer Items/Inside Screens/AddRequirement/Inventory';
import Next2 from '../DrawerNavigation/Drawer Items/Inside Screens/AddRequirement/Next2';
import Next3 from '../DrawerNavigation/Drawer Items/Inside Screens/AddRequirement/Next3';
import LO1 from '../Add src/LatestOffers/LO1';
import LO2 from '../Add src/LatestOffers/LO2';
import LO3 from '../Add src/LatestOffers/LO3';
import LODetails from '../Add src/LatestOffers/LOdetails';

import Rq1 from '../Add src/Requirement/Rq1';
import Rq2 from '../Add src/Requirement/Rq2';
import Rq3 from '../Add src/Requirement/Rq3';
import RqDetails from '../Add src/Requirement/RqDetails';

import Tb1 from '../Add src/TopBroker/Tb1';
import Tb2 from '../Add src/TopBroker/Tb2';
import Tb3 from '../Add src/TopBroker/Tb3';
import E1 from '../Add src/Events/E1';
import E2 from '../Add src/Events/E2';
import E3 from '../Add src/Events/E3';
import N1 from '../Add src/News/N1';
import N2 from '../Add src/News/N2';
import N3 from '../Add src/News/N3';
import Hl1 from '../Add src/HotLeads/Hl1';
import Hl2 from '../Add src/HotLeads/Hl2';
import Hl3 from '../Add src/HotLeads/Hl3';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Select Role" component={SelectRoleScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        {/* Drawer Screens */}
        <Stack.Screen name="View Profile" component={ViewProfile} />
        <Stack.Screen name="Latest Offers / Schemes" component={LatestOffers} />
        <Stack.Screen name="Requirement / Inventory" component={Requirement} />
        <Stack.Screen name="Top Brokers Search" component={TopBrokers} />
        <Stack.Screen name="Hot Leads" component={HotLeads} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="My Requirement" component={MyRequiremnet} />
        <Stack.Screen name="My Lead" component={MyLead} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="My Visits" component={MyVisits} />
        <Stack.Screen name="Bookmarks" component={Bookmark} />
        <Stack.Screen name="Notifications" component={Notification} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Rate Us" component={RateUs} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="Terms & Condition" component={Term} />
        <Stack.Screen name="About & Help" component={About} />
        <Stack.Screen name="Home Loan" component={HomeLoan} />
        <Stack.Screen name="Home Loan Enquiry" component={HomeLoanEnquiry} />
        <Stack.Screen name="Add Broker" component={AddBrokerScreen} />
        <Stack.Screen name="Add Latest Offers" component={AddLatestOffers} />
        <Stack.Screen name="Add Requirement" component={AddRequirement} />
        <Stack.Screen name="Add Hot Leads" component={AddHotLeads} />
        <Stack.Screen name="Add News" component={AddNews} />
        <Stack.Screen name="Add Events" component={AddEvents} />
        <Stack.Screen name="Add My Requirement" component={AddMyRequirement} />
        <Stack.Screen name="Add Bookmark" component={AddBookmark} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Add Requirement Inventory" component={AddRequirementInventoryScreen}  options={{ title: 'Add Requirement Inventory' }} />
        <Stack.Screen name="Next2" component={Next2}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="Next3" component={Next3} options={{ title: 'Add Requirement Inventory' }}   />


        <Stack.Screen name="LO1" component={LO1}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="LO2" component={LO2}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="LO3" component={LO3}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="LOdetails" component={LODetails}  options={{ title: 'Details' }}  />

        <Stack.Screen name="Rq1" component={Rq1} options={{ title: 'Add Requirement Inventory' }}   />
        <Stack.Screen name="Rq2" component={Rq2}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="Rq3" component={Rq3}  options={{ title: 'Add Requirement Inventory' }}   />
        <Stack.Screen name="RqDetails" component={RqDetails}  options={{ title: 'Details' }}  />

        <Stack.Screen name="Tb1" component={Tb1}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="Tb2" component={Tb2}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="Tb3" component={Tb3}  options={{ title: 'Add Requirement Inventory' }}  />

        <Stack.Screen name="Hl1" component={Hl1}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="Hl2" component={Hl2}   options={{ title: 'Add Requirement Inventory' }} />
        <Stack.Screen name="Hl3" component={Hl3}  options={{ title: 'Add Requirement Inventory' }}  />

        <Stack.Screen name="N1" component={N1}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="N2" component={N2}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="N3" component={N3}  options={{ title: 'Add Requirement Inventory' }}  />


        <Stack.Screen name="E1" component={E1}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="E2" component={E2}  options={{ title: 'Add Requirement Inventory' }}  />
        <Stack.Screen name="E3" component={E3}  options={{ title: 'Add Requirement Inventory' }}  />

    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
