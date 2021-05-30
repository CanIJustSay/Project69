import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Permission from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CAMERA } from "expo-permissions";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      permissionGranted: null,
      qrScanned: false,
      qrData: "",
      buttonState: "normal",
    };
  }
  getCamPerm = async () => {
    const { status } = await Permission.askAsync(Permission.CAMERA);
    this.setState({
      permissionGranted: status === "granted" ? true : false,
      qrScanned: false,
      buttonState:"camera",
    });
  };
  information = async({type, data}) => {
    this.setState({
      qrScanned:true,
      qrData : data,
      buttonState:"normal",
    })
  };
  render() {
if(this.state.buttonState==="normal"){
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 300 }}
          onPress={() => {
            this.getCamPerm();
          }}
        >
          <Text>Scan QR code</Text>
        </TouchableOpacity>
        <Text>{this.state.qrData}</Text>
      </View>
    );
    }else{

      return(
          <BarCodeScanner onBarCodeScanned={
            this.state.qrScanned ===true? undefined : this.information
          } style={StyleSheet.absoluteFillObject}>
          </BarCodeScanner>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
