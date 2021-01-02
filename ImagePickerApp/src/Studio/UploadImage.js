import React, {useState, useContext} from 'react';
import {uploadImageApi, createCategoryApi} from './ImageApi';
import {ImageContext} from '../../App';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadImage = ({navigation}) => {
  const [filePath, setFilePath] = useState({});
  const [image, setImages] = useState([]);
  const [enterCategory, setEnterCategory] = useState('');

  const {data, setUploadImageValue} = useContext(ImageContext);

  console.log('value from context in uploadimage', data);

  const handleUpload = async () => {
    try {
      console.log('inside handle upload function', enterCategory.toLowerCase());
      console.log('filePath inside handleupload', filePath);

      if (!enterCategory.trim()) {
        alert('Please Enter Category');
      } else if (Object.keys(filePath).length == 0) {
        console.log('inside else');
        alert('Capture image from camera or select image from gallery');
      } else {
        console.log('inside else', enterCategory);
        const categoryResponse = await createCategoryApi(enterCategory);
        console.log('>>>>>>>>>>>. categoryResponse', categoryResponse);
        const img = new FormData();
        img.append('name', 'avatar');
        img.append('category', categoryResponse._id);
        img.append('filedata', {
          uri: filePath.uri,
          type: filePath.type,
          name: filePath.fileName,
        });
        console.log('data before uploading image ', data);
        await uploadImageApi(img);
        setUploadImageValue(!data);
        console.log('data after uploading image ', data);
        navigation.goBack();
      }
    } catch (err) {
      console.log('error@@', err);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    console.log('type in capture image', type);
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          // alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    console.log('type in capture image', type);
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{filePath.uri}</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => captureImage('photo')}>
            <Text style={styles.textStyle}>Launch Camera for Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => chooseFile('photo')}>
            <Text style={styles.textStyle}>Choose Image</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('video')}>
          <Text style={styles.textStyle}>Launch Camera for Video</Text>
        </TouchableOpacity> */}

          {/* <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('video')}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity> */}

          <TextInput
            activeOpacity={0.5}
            style={styles.textInputStyle}
            //style={{height: 40}}
            placeholder="Enter Category"
            onChangeText={(text) => setEnterCategory(text.toLowerCase())}
            //defaultValue={enterCategory}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => handleUpload()}>
            <Text style={styles.textStyle}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  textInputStyle: {
    backgroundColor: '#DDDDDD',
    marginVertical: 10,
    width: 250,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
