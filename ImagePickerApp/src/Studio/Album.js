import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {retrieveAlbumFirstImageApi, getCategoryCollectionApi} from './ImageApi';

export default function Album({navigation}) {
  console.log('album folder');
  const [firstImage, setFirstImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategoryCollectionApi();
      console.log('response in album for category collection ', response);

      response.map(async function (item, index) {
        console.log('map data', item._id);
        const firstImageResponse = await retrieveAlbumFirstImageApi(item._id);
        console.log('first image response', firstImageResponse);

        setFirstImage((prevFirstImage) => [
          ...prevFirstImage,
          firstImageResponse,
        ]);
      });
    };
    fetchData();
  }, []);

  console.log('array length', firstImage.length);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.albumContainer}>
          {firstImage?.map(function (item, index) {
            console.log('item inside first image', item.category.category);
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() =>
                  navigation.navigate('DisplaySingleCategory', {
                    categoryId: item.category,
                  })
                }>
                <Image
                  style={styles.image}
                  source={{
                    uri: 'http://192.168.100.247:9002/' + item.filename,
                  }}
                />
                <Text style={styles.textStyle}>{item.category.category} </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    padding: 15,
    backgroundColor: '#fff',
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: 160,
    height: 150,
    margin: 9,
  },
  albumContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 145,
    height: 140,
    margin: 7,
  },
});
