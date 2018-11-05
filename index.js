import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  VrButton,
  Animated,
} from 'react-360';
import { Easing } from 'react-native';
import data from './data';

class Same extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      id: '',
      fadeAnim: new Animated.Value(1),
      growAnim: new Animated.Value(.8),
      rotateAnim:  new Animated.Value(0)
    };

    // this.spinValue = new Animated.Value(0);
    this.fadeOut = this.fadeOut.bind(this);
    this.grow = this.grow.bind(this);
    this.rotate = this.rotate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  fadeOut () {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
      }
    ).start(() => {
      this.setState({
        fadeAnim:  new Animated.Value(1)
      })
      this.fadeOut();
    })
  }

  grow () {
    Animated.timing(
      this.state.growAnim,
      {
        toValue: 1.1,
        duration: 1500,
        // easing: Easing.linear,
      }
    ).start(() => {
      this.setState({
        growAnim:  new Animated.Value(.8)
      })
      this.grow();
    })
  }

  rotate () {
    Animated.timing(
      this.state.rotateAnim,
      {
        toValue: 45,
        duration: 1200,
        easing: Easing.linear,
      }).start()
  }

  handleClick(event, id) {
    if (this.state.show === true && this.state.id === id) {
      this.setState({
        show: false,
      });
    } else {
      this.setState({
        show: true,
        id,
      });
    }
  }

  componentDidMount () {
    this.fadeOut();
    this.grow();
  }

  render() {
    const {
      show,
      id,
      fadeAnim,
      growAnim,
    } = this.state;

    // const fadeOut = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1, 0]
    // });

    // const grow = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1, 0]
    // });

    const styles = StyleSheet.create({
      panel: {
        width: 4680,
        height: 1700,
        justifyContent: 'center',
        alignItems: 'center',
      },
      marker: {
        position: 'absolute',
        width: 40,
        height: 40,
        transform: [
          {translateZ: -1}
        ]
      },
      markerRadar: {
        position: 'absolute',
        left: -2,
        top: -2,
        width: 44,
        height: 44,
        backgroundColor: '#d7fc35',
        borderRadius: 50,
        borderWidth: 0,
        // transform: [{rotate: spin}],
      },
      tt: {
        position: 'absolute',
        top: -80,
        left: 56,
        maxWidth: 320,
        backgroundColor: 'rgba(250, 250, 250, 0.9)',
        padding: 24,
        borderRadius: 8,
        zIndex: 99,
        transform: [
          {translateZ: 999}
        ]
        // borderWidth: 1,
        // borderColor: 'rgba(250, 250, 250, 0.9)',
        // shadowColor: '#000',
        // shadowOffset: { width: 10, height: 20 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 9,
      },
      ttText: {
        color: '#21262c',
      }
    });

    return (
      <View style={styles.panel}>
        {data.map(marker => (
          <View
            key={marker.id}
            style={{
              transform: [
                { translateY: marker.y },
                { translateX: marker.x },
              ],
            }}
          >
            <View>
              <Animated.View style={[ styles.markerRadar, {opacity: fadeAnim}, {transform: [{scale: growAnim}]}]} />
              <VrButton
                onClick={event => this.handleClick(event, marker.id)}
              >
                <Image
                  style={styles.marker}
                  source={{uri: 'static_assets/button2x.png'}}
                />
              </VrButton>
            </View>

            {show && marker.id === id &&
              <View style={styles.tt}>
                <Text style={styles.ttText}>{marker.text}</Text>
              </View>
            }
          </View>
        ))}
      </View>
    );
  }
}

module.exports = Same;

AppRegistry.registerComponent('Same', () => Same);


// style={[styles.marker, {transform: [{rotate: (styles.marker, show === true && id === id) ? '-45deg' : '0deg' }]}]}
