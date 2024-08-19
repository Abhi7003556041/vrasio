import React, {Component} from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Keyboard,
  PanResponder,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: props.isOpen,
      isPanelOpened: props.isOpen,
      contentHeight: undefined,
    };
    this.panelHeightValue = new Animated.Value(0);
    this._setPanResponders();
  }

  togglePanel = () => {
    const {contentHeight, isPanelOpened} = this.state;
    const {
      animationDuration,
      animation,
      sliderMinHeight,
      onOpen,
      onClose,
    } = this.props;

    Animated.timing(this.panelHeightValue, {
      duration: animationDuration,
      easing: animation,
      toValue: this.panelHeightValue._value === 0
        ? contentHeight - sliderMinHeight
        : 0,
      useNativeDriver: false,
    }).start(() => {
      this.setState({isPanelOpened: !isPanelOpened}, () => {
        if (this.state.isPanelOpened) {
          this.props.func(false)
          onOpen();
        } else {
          this.props.func(true)
          onClose();
          Keyboard.dismiss();
        }
      });
    });
  };

  _onBackPress = () => {
    this.state.isPanelOpened && this.togglePanel();
    return this.state.isPanelOpened;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  _setPanResponders() {
    

    this._parentPanResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () =>  this.props.func(true) ,
      onMoveShouldSetPanResponderCapture: () => !this.state.isPanelOpened  ,
      onPanResponderRelease: () => this.togglePanel() ,
    });

    this._childPanResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () =>  this.props.func(false),
      onPanResponderMove:(_,gestureState) => gestureState.dy > 15 && this.props.func(true),
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        gestureState.dy > 15 ,
      onPanResponderRelease: (_, gestureState) =>
        gestureState.dy > 0 && this.togglePanel() ,
    });
  }

  _handleScrollEndDrag = ({nativeEvent}) => {
    nativeEvent.contentOffset.y === 0 && this.togglePanel() && this.props.func(true)
    ;
  };

  _setSize = ({nativeEvent}) => {
    this.setState({contentHeight: nativeEvent.layout.height}, () => {
      const {isOpen, sliderMinHeight} = this.props;
      const {contentHeight} = this.state;
      if (!isOpen && contentHeight) {
        this.panelHeightValue.setValue(contentHeight - sliderMinHeight);
        this.setState({isPanelVisible: true});
      }
    });
  };

  render() {
    const {isPanelVisible} = this.state;
    const {
      sliderMaxHeight,
      wrapperStyle,
      outerContentStyle,
      innerContentStyle,
      lineContainerStyle,
      lineStyle,
      children,
    } = this.props;

    return (
      <Animated.View
        onLayout={this._setSize}
        {...this._parentPanResponder.panHandlers}
        style={{
          ...styles.container,
          ...wrapperStyle,
          maxHeight: sliderMaxHeight,
          borderTopRightRadius:this.state.isPanelOpened ? 0 :30,
          borderTopLeftRadius:this.state.isPanelOpened ? 0 :30,
          transform: [
            {translateY: this.panelHeightValue},
            {scale: isPanelVisible ? 1 : 0},
          ],
        }}>
        <Animated.View
          style={[styles.outerContent, outerContentStyle]}
          {...this._childPanResponder.panHandlers}>
          <TouchableOpacity 
          // onPress={this.togglePanel}
           activeOpacity={1}>
            <Animated.View style={[styles.lineContainer, lineContainerStyle]}>
              <View style={[styles.line, lineStyle]} />
            </Animated.View>
          </TouchableOpacity>
          <View style={[styles.innerContent, innerContentStyle]}>
            {typeof children === 'function'
              ? children(this._handleScrollEndDrag)
              : children}
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

BottomSheet.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  isOpen: PropTypes.bool,
  sliderMaxHeight: PropTypes.number,
  sliderMinHeight: (props, propName, _) => {
    if (props[propName] > props.sliderMaxHeight) {
      return new Error(
        'sliderMinHeight value cannot be greater than sliderMaxHeight',
      );
    }
  },
  animation: PropTypes.func,
  animationDuration: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  wrapperStyle: PropTypes.object,
  outerContentStyle: PropTypes.object,
  innerContentStyle: PropTypes.object,
  lineContainerStyle: PropTypes.object,
  lineStyle: PropTypes.object,
};

BottomSheet.defaultProps = {
  children: <View />,
  isOpen: true,
  sliderMaxHeight: Dimensions.get('window').height * 0.5,
  sliderMinHeight: 50,
  animation: Easing.quad,
  animationDuration: 200,
  onOpen: () => null,
  onClose: () => null,
  wrapperStyle: {},
  outerContentStyle: {},
  innerContentStyle: {},
  lineContainerStyle: {},
  lineStyle: {},
};

const styles = {
  container: {
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    paddingHorizontal: 21,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#ffffff',
  },
  lineContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 35,
    height: 4,
    borderRadius: 2,
    marginTop: 18,
    marginBottom: 30,
    backgroundColor: '#D5DDE0',
  },
  outerContent: {
    flex: -1,
  },
  innerContent: {
    flex: -1,
  },
};

export default BottomSheet;
