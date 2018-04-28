import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator , View , StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  layer : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class ActivityMUB extends Component {

  static propTypes = {
    alpha: PropTypes.number,
    layerColor: PropTypes.string,
  };

  show = () => {
    this.setState({hidden:false});
  }

  hide = () => {
    this.setState({hidden:true});
  }

  state = {
    hidden:true,
  }

  render() {
    if (this.state.hidden == true) {
      return null;
    }
    const {alpha, layerColor="#000000"} = this.props;
    const style = [styles.layer];
    style.push({backgroundColor:layerColor, overflow:'hidden', opacity:alpha});
    return (
      <View style={[StyleSheet.absoluteFill, style]}>
        <ActivityIndicator color={'white'} size={'large'} />
      </View>
    )
  }
}
