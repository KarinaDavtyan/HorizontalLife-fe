import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Svg } from 'expo';

class RoutePreview extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

  renderSVG = (color, type, svg) => {
    if (type == 'line') {
      return <Svg.Path d={svg} fill="none" stroke={color} strokeWidth={2.5} />;
    } else {
      const circles = svg.map(point => (
        <Svg.Circle
          key={point.timestamp}
          cx={point.x}
          cy={point.y}
          r={25}
          strokeWidth={2.5}
          stroke={color}
          fill="none"
        />
      ));
      return circles;
    }
  };

  render() {
    const {
      imageUri,
      color,
      type,
      svg,
      svg_height,
      svg_width,
    } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <View>
            <Image
              source={{ uri: imageUri }}
              style={{
                height: svg_height,
                width: svg_width,
              }}
            ></Image>
            <View
              style={{
                position: 'absolute',
                height: svg_height,
                width: svg_width,
              }}
            >
              <Svg height={svg_height} width={svg_width}>
                {this.renderSVG(color, type, svg)}
              </Svg>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});

export default RoutePreview;
