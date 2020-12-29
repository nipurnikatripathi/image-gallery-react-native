import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, StyleSheet} from 'react-native';
import {retrieveAlbumImageApi} from '../ImageApi';

export default function DisplaySingleCategory({route}) {
  const [image, setImages] = useState([]);
  const {categoryId} = route.params;

  console.log('inside single category', categoryId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await retrieveAlbumImageApi(categoryId);
      console.log('album images of cat response', response);
      setImages(response);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {image.map(function (item, index) {
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
});
