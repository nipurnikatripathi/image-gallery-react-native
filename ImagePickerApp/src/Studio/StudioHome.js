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

export default function StudioHome({navigation, props}) {

  const {data, setUploadImageValue} = useContext(ImageContext);

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
                    uri: 'http://192.168.100.247:9002/' + item.filename,
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
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
    width: 180,
  },
});
