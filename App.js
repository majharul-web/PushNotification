/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });


    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage)
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage)
          );
        }
      });


  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Push notification</Text>
    </View>
  );
};

export default App;