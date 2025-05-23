import { useRef, useState } from 'react';

import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useCameraStore } from '@/presentation/store/useCameraStore';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string>()
  const { addSelectedImage } = useCameraStore();
  
  const cameraRef = useRef<CameraView>(null);

  const onRequestPermissions = async () => {
    try {
        const { status: cameraPermissionStatus } = await requestCameraPermission();
        if(cameraPermissionStatus !== 'granted') {
            Alert.alert('Error', 'necesitamos permiso pa tomar fotos')
        }
        const { status: galleryPermissionStatus } = await requestMediaPermission();

        if(galleryPermissionStatus !== 'granted') {
            Alert.alert('Error', 'necesitamos permiso pa guardar fotos')
        }
    } catch (e) {
        console.log(e);
        Alert.alert('Error', 'ALGO SALIO MAL')
    }
  }

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  const onShutterButtonPress = async () => {
    if(!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
        quality: 0.7,
    })

    console.log(picture);
    if(!picture?.uri) return;
    setSelectedImage(picture.uri);
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>

        <TouchableOpacity onPress={onRequestPermissions}>
            <ThemedText type='subtitle'>
            Solicitar Permiso
            </ThemedText>
        </TouchableOpacity>

      </View>
    );
  }

  const onReturnCancel = () => {
    router.dismiss();
  }

  const onPictureAccepted = async () => {
    if(!selectedImage) return;
    await MediaLibrary.createAssetAsync(selectedImage as string)
    addSelectedImage(selectedImage)
    router.dismiss();
  }

  const onRetakePhoto = ()=> {
    setSelectedImage(undefined)
  }

  const onPickImages = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
        if(result.canceled) return;

        console.log(result.assets);

        result.assets.forEach(asset => {
            addSelectedImage(asset.uri);
        })

        router.dismiss();
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if(selectedImage) {
    return (<View style={styles.container}>
        <Image source={{uri: selectedImage}} style={styles.camera} />
        <ConfirmImageButton onPress={onPictureAccepted}/>
        <RetakeImageButton onPress={onRetakePhoto}/>
        <ReturnCancelButton onPress={onReturnCancel}/>
    </View>)
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <ShutterButton onPress={onShutterButtonPress}/>
            <FlipCameraButton onPress={toggleCameraFacing}/>
            <GalleryButton onPress={onPickImages}/>
            <ReturnCancelButton onPress={onReturnCancel}/>
      </CameraView>
    </View>
  );
}

//custom components
const ShutterButton = ({onPress = () => {}}) => {
    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity
        onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimensions.width / 2 - 32,
                    borderColor: primaryColor
                }
            ]}
        >

        </TouchableOpacity>
    )
}

const FlipCameraButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
            <Ionicons name='camera-reverse-outline' size={30} color='white'/>
        </TouchableOpacity>
    )
}

const GalleryButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
            <Ionicons name='images-outline' size={30} color='white'/>
        </TouchableOpacity>
    )
}

const ReturnCancelButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.returnCancelButton}>
            <Ionicons name='arrow-back-outline' size={30} color='white'/>
        </TouchableOpacity>
    )
}

const ConfirmImageButton = ({onPress = () => {}}) => {
    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity
        onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimensions.width / 2 - 32,
                    borderColor: primaryColor
                }
            ]}
        >
            <Ionicons name='checkmark-outline' size={30} color={primaryColor} />
        </TouchableOpacity>
    )
}

const RetakeImageButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
            <Ionicons name='close-outline' size={30} color='white'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    top: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
