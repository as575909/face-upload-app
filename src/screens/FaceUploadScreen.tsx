// import React from 'react';
// import { View, Text, StyleSheet, Pressable, Image, Alert, SafeAreaView } from 'react-native';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import type { RootStackParamList } from '../navigation/types';
// import { camera, facePlaceholder, gallery } from '../assets';
// import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';

// export type FaceUploadProps = NativeStackScreenProps<RootStackParamList, 'FaceUpload'>;

// export default function FaceUploadScreen({ navigation }: FaceUploadProps) {
//   const requestCameraPermission = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Camera permission required', 'Please allow camera access to take a selfie.');
//       return false;
//     }
//     return true;
//   };

//   const requestMediaPermission = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Photos permission required', 'Please allow photo library access to pick an image.');
//       return false;
//     }
//     return true;
//   };

//   const pickFromGallery = async () => {
//     const ok = await requestMediaPermission();
//     if (!ok) return;
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.9,
//     });
//     try {
//       if (!result.canceled) {
//         const uri = result.assets?.[0]?.uri;
//         if (uri) {
//           navigation.navigate('CapturePreview', { imageUri: uri });
//         }
//       }
//     } catch (e) {
//       Alert.alert('Error', 'Failed to pick image.');
//     }
//   };

//   const takePhoto = async () => {
//     const ok = await requestCameraPermission();
//     if (!ok) return;
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.9,
//       cameraType: ImagePicker.CameraType.front,
//     });
//     try {
//       if (!result.canceled) {
//         const uri = result.assets?.[0]?.uri;
//         if (uri) {
//           navigation.navigate('CapturePreview', { imageUri: uri });
//         }
//       }
//     } catch (e) {
//       Alert.alert('Error', 'Failed to capture image.');
//     }
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerBar}>
//         <Text style={styles.headerCaption}>FACIAL ATTRIBUTES</Text>
//         <Text style={styles.headerTitle}>Let’s add a Photo</Text>
//       </View>
//       <View style={styles.headerDivider} />
//       <View style={styles.body}>
//         <View style={styles.placeholderWrap}>
//         <Image source={facePlaceholder} style={styles.dottedArea} />
//         </View>
//         <View style={styles.actions}>
//           <Pressable style={styles.actionBtn} onPress={pickFromGallery}>
//             <Image source={gallery} style={styles.actionIconLarge} />
//             <Text style={styles.actionText}>From Gallery</Text>
//           </Pressable>
//           <Pressable style={styles.actionBtn} onPress={takePhoto}>
//             <Image source={camera} style={styles.actionIconLarge} />
//             <Text style={styles.actionText}>Take a selfie</Text>
//           </Pressable>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingVertical: 80
//   },
//   headerBar: {
//     paddingTop: 8,
//     paddingHorizontal: 16,
//     opacity: 0.3,
//     //paddingBottom: 12,
//   },
//   headerCaption: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     letterSpacing: 1,
//     marginBottom: 4,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#111',
//   },
//   headerDivider: {
//     height: 1,
//     backgroundColor: '#AAAAAA',
//     marginTop: 12,
//     opacity: 0.5
//   },
//   body: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 24,
//     justifyContent: 'space-between',
//   },
//   placeholderWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', },
//   dottedArea: {
//     width: 220,
//     height: 280,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   plus: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     borderWidth: 2,
//     borderColor: '#E5E7EB',
//     marginBottom: 8,
//   },
//   centerBadge: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
//   addLabel: {
//     color: '#9CA3AF',
//   },
//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     paddingHorizontal: 12,
//   },
//   actionBtn: {
//     width: 140,
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//     paddingVertical: 8,
//   },
//   actionIconLarge: { width: 40, height: 40, tintColor: '#111', marginBottom: 8 },
//   actionText: {
//     color: '#111',
//     fontWeight: '500',
//   },
// });
































import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
  Modal,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { camera, facePlaceholder, gallery } from '../assets';
import { Ionicons } from '@expo/vector-icons';

export type FaceUploadProps = NativeStackScreenProps<RootStackParamList, 'FaceUpload'>;

const { width, height } = Dimensions.get('window');

interface MediaAsset {
  id: string;
  uri: string;
  width: number;
  height: number;
  creationTime: number;
}

export default function FaceUploadScreen({ navigation }: FaceUploadProps) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, setMediaPermission] = useState<MediaLibrary.PermissionResponse | null>(null);
  
  const [showCamera, setShowCamera] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<MediaAsset[]>([]);
  const [cameraType, setCameraType] = useState<CameraType>('front');
  const [loading, setLoading] = useState(false);
  
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const requestMediaLibraryPermission = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    setMediaPermission(permission);
    if (!permission.granted) {
      Alert.alert('Photos permission required', 'Please allow photo library access to pick an image.');
    }
  };

  const loadGalleryPhotos = async () => {
    try {
      setLoading(true);
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
        first: 100,
        sortBy: 'creationTime',
      });

      const photos: MediaAsset[] = assets.map(asset => ({
        id: asset.id,
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        creationTime: asset.creationTime,
      }));

      setGalleryPhotos(photos);
    } catch (error) {
      Alert.alert('Error', 'Failed to load photos from gallery.');
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async () => {
    try {
      if (!cameraPermission) {
        const permission = await requestCameraPermission();
        if (!permission?.granted) {
          Alert.alert(
            'Camera Permission Required', 
            'Please go to Settings > Apps > [Your App Name] > Permissions and enable Camera access.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      if (!cameraPermission?.granted) {
        Alert.alert(
          'Camera Permission Required', 
          'Please go to Settings > Apps > [Your App Name] > Permissions and enable Camera access.',
          [{ text: 'OK' }]
        );
        return;
      }

      setShowCamera(true);
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Error', 'Camera permission denied. Please enable it in settings.');
    }
  };

  const openGallery = async () => {
    try {
      if (!mediaPermission?.granted) {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            'Photos Permission Required', 
            'Please go to Settings > Apps > [Your App Name] > Permissions and enable Photos access.',
            [{ text: 'OK' }]
          );
          return;
        }
        setMediaPermission(permission);
      }

      await loadGalleryPhotos();
      setShowGallery(true);
    } catch (error) {
      console.error('Gallery permission error:', error);
      Alert.alert('Error', 'Photos permission denied. Please enable it in settings.');
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        base64: false,
      });

      if (photo?.uri) {
        // Copy the photo to a permanent location for production builds
        const filename = `photo_${Date.now()}.jpg`;
        const newPath = `${FileSystem.documentDirectory}${filename}`;
        
        await FileSystem.copyAsync({
          from: photo.uri,
          to: newPath,
        });

        setShowCamera(false);
        navigation.navigate('CapturePreview', { imageUri: newPath });
      }
    } catch (error) {
      console.error('Camera capture error:', error);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
    }
  };

  const selectFromGallery = async (asset: MediaAsset) => {
    try {
      // Get the full asset info to ensure we have the URI
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
      
      let sourceUri = assetInfo.localUri || assetInfo.uri;
      
      if (sourceUri) {
        // For production builds, copy the file to app's document directory
        const filename = `gallery_${Date.now()}.jpg`;
        const newPath = `${FileSystem.documentDirectory}${filename}`;
        
        await FileSystem.copyAsync({
          from: sourceUri,
          to: newPath,
        });

        setShowGallery(false);
        navigation.navigate('CapturePreview', { 
          imageUri: newPath
        });
      } else {
        Alert.alert('Error', 'Could not access the selected image.');
      }
    } catch (error) {
      console.error('Gallery selection error:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const renderGalleryItem = ({ item }: { item: MediaAsset }) => (
    <Pressable
      style={styles.galleryItem}
      onPress={() => selectFromGallery(item)}
    >
      <Image source={{ uri: item.uri }} style={styles.galleryImage} />
    </Pressable>
  );

  if (showCamera) {
    return (
      <Modal visible={showCamera} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={cameraType}
          />
          
          {/* Camera Overlay - positioned absolutely */}
          <View style={styles.cameraOverlay}>
            {/* Top controls */}
            <View style={styles.cameraTopControls}>
              <Pressable
                style={styles.cameraControlBtn}
                onPress={() => setShowCamera(false)}
              >
                <Ionicons name="close" size={30} color="white" />
              </Pressable>
              <Pressable
                style={styles.cameraControlBtn}
                onPress={toggleCameraType}
              >
                <Ionicons name="camera-reverse" size={30} color="white" />
              </Pressable>
            </View>

            {/* Center guide */}
            <View style={styles.cameraGuide}>
              <View style={styles.faceGuideOval} />
              <Text style={styles.guideText}>Position your face in the oval</Text>
            </View>

            {/* Bottom controls */}
            <View style={styles.cameraBottomControls}>
              <Pressable style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  if (showGallery) {
    return (
      <Modal visible={showGallery} animationType="slide">
        <SafeAreaView style={styles.galleryContainer}>
          <View style={styles.galleryHeader}>
            <Pressable
              style={styles.galleryCloseBtn}
              onPress={() => setShowGallery(false)}
            >
              <Ionicons name="close" size={24} color="#111" />
            </Pressable>
            <Text style={styles.galleryTitle}>Select Photo</Text>
            <View style={styles.placeholder} />
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text>Loading photos...</Text>
            </View>
          ) : (
            <FlatList
              data={galleryPhotos}
              renderItem={renderGalleryItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={styles.galleryGrid}
              showsVerticalScrollIndicator={false}
            />
          )}
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerCaption}>FACIAL ATTRIBUTES</Text>
        <Text style={styles.headerTitle}>Let's add a Photo</Text>
      </View>
      <View style={styles.headerDivider} />
      
      <View style={styles.body}>
        <View style={styles.placeholderWrap}>
          <Image source={facePlaceholder} style={styles.dottedArea} />
        </View>
        
        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={openGallery}>
            <Image source={gallery} style={styles.actionIconLarge} />
            <Text style={styles.actionText}>From Gallery</Text>
          </Pressable>
          
          <Pressable style={styles.actionBtn} onPress={openCamera}>
            <Image source={camera} style={styles.actionIconLarge} />
            <Text style={styles.actionText}>Take a selfie</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 80,
  },
  headerBar: {
    paddingTop: 8,
    paddingHorizontal: 16,
    opacity: 0.3,
  },
  headerCaption: {
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#AAAAAA',
    marginTop: 12,
    opacity: 0.5,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  placeholderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dottedArea: {
    width: 220,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  actionBtn: {
    width: 140,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  actionIconLarge: {
    width: 40,
    height: 40,
    tintColor: '#111',
    marginBottom: 8,
  },
  actionText: {
    color: '#111',
    fontWeight: '500',
  },

  // Camera Styles
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    pointerEvents: 'box-none', // Allow touches to pass through to camera
  },
  cameraTopControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  cameraControlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraGuide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceGuideOval: {
    width: 200,
    height: 250,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: 100,
    borderStyle: 'dashed',
  },
  guideText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cameraBottomControls: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },

  // Gallery Styles
  galleryContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  galleryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  galleryCloseBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryGrid: {
    padding: 2,
  },
  galleryItem: {
    flex: 1,
    margin: 2,
    aspectRatio: 1,
    maxWidth: (width - 16) / 3,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});