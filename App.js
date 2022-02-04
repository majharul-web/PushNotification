/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [notification, setNotification] = useState({
    title: null,
    body: null,
    image: null,
  });

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('.........................: ', token);
  };

  useEffect(() => {
    getToken();

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Push notification</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>{notification?.title}</Text>
        <Text style={{ fontSize: 20 }}>{notification?.body}</Text>
        <Image source={{ uri: notification?.image }} width={200} height={200} />
      </View>
    </View>
  );
};

export default App;