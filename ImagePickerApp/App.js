import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Studio from './src/Studio/Studio';

export const ImageContext = React.createContext();

// export const ImageProvider = ({children}) => {
//   const [uploadImageValue, setUploadImageValue] = useState(false);

//   return (
//     <ImageContext.Provider
//       value={{
//         data: uploadImageValue,
//         setUploadImageValue: setUploadImageValue,
//         // updateUploadImageStatus = () => {
//         //   setState(!uploadImageStatus);
//         // },
//       }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };

const App = () => {
  const [uploadImageValue, setUploadImageValue] = useState(false);

  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }

  const config = {
    screens: {
      Studio: {
        path: 'studio/:id',
        parse: {
          id: (id) => `${id}`,
        },
      },
      UploadImage: {
        path: 'upload/:id',
        parse: {
          id: (id) => `${id}`,
        },
      },
      Album: {
        path: 'album/:id',
        parse: {
          id: (id) => `${id}`,
        },
      },
      DisplaySingleCategory: {
        path: 'displaysinglecategory/:id',
        parse: {
          id: (id) => `${id}`,
        },
      },
    },
  };

  const linking = {
    prefixes: ['https://www.imagepicker.com/page'],
    config,
  };

  console.log('inside app.js');
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <ImageContext.Provider
        value={{
          data: uploadImageValue,
          setUploadImageValue: setUploadImageValue,
        }}>
        <Studio />
      </ImageContext.Provider>
    </NavigationContainer>
  );
};

export default App;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
