import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
// import RNMlKit from 'react-native-firebase-mlkit';
import { observer, inject } from 'mobx-react';
import { Slider } from 'react-native-elements';
import { Title, Spinner, Button } from 'native-base';
import RNTextDetector from 'react-native-text-detector';

class Camera extends Component {
  state = { zoomValue: 0, flashMode: RNCamera.Constants.FlashMode.off };
  render() {
    const { memoStore } = this.props.store;
    // if (memoStore.loader == true) {
    //   return <Spinner color="red" />;
    // }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flashMode}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          zoom={this.state.zoomValue}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              value={this.state.zoomValue}
              onValueChange={zoomValue => this.setState({ zoomValue })}
            />
          </View>

          <Button onPress={this.takePicture.bind(this)} style={styles.capture} title="SNAP">
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </Button>
          <Button onPress={this.flash} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Flash </Text>
          </Button>
        </View>
      </View>
    );
  }
  flash = () => {
    if (this.state.flashMode == RNCamera.Constants.FlashMode.off) {
      this.setState({ flashMode: RNCamera.Constants.FlashMode.torch });
    } else this.setState({ flashMode: RNCamera.Constants.FlashMode.off });
  };
  takePicture = async () => {
    const { memoStore } = this.props.store;
    try {
      //memoStore.loader = true;
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      this.props.store.memoStore.addItem(visionResp);
      console.log('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
    //memoStore.loader = false;
  };
}
export default inject('store')(observer(Camera));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
