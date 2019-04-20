import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { observer, inject } from 'mobx-react';
import { Slider } from 'react-native-elements';
import { Spinner, Button, Icon, Header, Left, Body, Title, Right } from 'native-base';
import RNTextDetector from 'react-native-text-detector';

class Camera extends Component {
  state = { zoomValue: 0, flashMode: RNCamera.Constants.FlashMode.off };

  static navigationOptions = {
    header: null,
  };

  render() {
    const { memoStore } = this.props.store;
    {
      console.log('render method', memoStore.loader);
    }

    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: '#e94153' }} androidStatusBarColor="#e11145">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>FasReco</Title>
          </Body>
          <Right />
        </Header>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flashMode}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          zoom={this.state.zoomValue}
        >
          {memoStore.loader == true ? (
            <View styles={StyleSheet.spinnerStyle}>
              <Spinner color="red" />
              <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black' }}>Please Wait...</Text>
            </View>
          ) : null}
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
              <Slider
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={this.state.zoomValue}
                onValueChange={zoomValue => this.setState({ zoomValue })}
                thumbTintColor="#e94153"
              />
            </View>

            <Icon type="Entypo" onPress={this.takePicture} style={styles.icon} name="flickr-with-circle" />

            <Icon type="Entypo" onPress={this.flash} style={styles.icon} name="flash" />
          </View>
        </RNCamera>
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
      memoStore.loaderTrue();
      console.log('try', memoStore.loader);
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
    memoStore.loaderFalse();
    console.log('try outside', memoStore.loader);
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },
  icon: {
    flex: 0,
    color: 'white',
    fontSize: 40,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  spinnerStyle: {
    flex: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '40',
    width: '40',
    alignSelf: 'flex-start',
    height: '100%',
  },
});
