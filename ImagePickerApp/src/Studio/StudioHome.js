import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {retrieveImageApi} from './ImageApi';
import {ImageContext} from '../../App';
import {FlatList} from 'react-native-gesture-handler';
import {ServerUrl} from '../ServerUrl';
import crashlytics from '@react-native-firebase/crashlytics';

export default function StudioHome({navigation, props}) {
  const {data, setUploadImageValue} = useContext(ImageContext);

  const [enabled, setEnabled] = useState(
    crashlytics().isCrashlyticsCollectionEnabled,
  );

  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }

  console.log('server url ::::::::::', ServerUrl);

  console.log('inside studio home');
  const [image, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await retrieveImageApi();

      setImages(response);
    };

    fetchData();
  }, [data]);

  console.log('value from context', data);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Button title="Toggle Crashlytics" onPress={toggleCrashlytics} />
          <Button title="Crash" onPress={() => crashlytics().crash()} />
          <Text>
            Crashlytics is currently {enabled ? 'enabled' : 'disabled'}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('UploadImage')}>
            <Text style={styles.textStyle}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Album')}>
            <Text style={styles.textStyle}>Album</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView>
            <View style={styles.imageContainer}>
              {image?.map(function (item, index) {
                return (
                  <Image
                    key={index}
                    style={styles.image}
                    source={{
                      uri: ServerUrl + item?.filename,
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  image: {
    width: 180,
    height: 200,
    margin: 7,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    margin: 5,
    width: 150,
  },
});
