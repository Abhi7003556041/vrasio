import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Svg, { Rect } from 'react-native-svg';
import Theme from '../../Constants/Theme';
import { TextInput } from 'react-native';
import HelperFunctions from '../../Constants/HelperFunctions';
import { useSelector } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

const RangeSliderWithHistogram = ({ func, max, min,fixMax,fixMin }) => {
  const { dashboardDetails, currencyDetails, favouriteList } = useSelector(state => state.commonData);

    const [range, setRange] = useState([min, max]);
    const [histogramData, setHistogramData] = useState([]);
    const [message, setMessage] = useState('');
    const [minprice, setMinprice] = useState(min)
    const [maxprice, setmaxprice] = useState(max)
    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    const barWidth = 8;
    const maxBarHeight = 150;
    const histogramHeight = 150;
    const histogramWidth = SCREEN_WIDTH - 40;

    const generateHistogramData = (range) => {
        const newData = [];
        var list = [];
        for (let i = range[0]; i <= range[1]; i = i + 100) {
            newData.push(i);
        }
        // for (let i = range[0]; i <= range[1]; i++) {
        //     newData.push(Math.floor(Math.random() * 100) + 1);
        // }
        setHistogramData(newData);
    };
    function randomNumber(minimum, maximum) {
        return Math.round(Math.random() * (maximum - minimum) + minimum);
    }
    const calculateColor = (value) => {
        const minValue = range[0];
        const maxValue = range[1];
        if (value >= minValue && value <= maxValue) {
            return '#000'; // Selected region color
        } else {
            return '#DFDFDF'; // Unselected region color
        }
    };
    useEffect(() => {
        // generateHistogramData([0, 4000]);
    }, []);
    return (
        <View style={styles.container}>
            {console.log('object', currencyDetails)}
            {/* <Svg height={histogramHeight} width={SCREEN_WIDTH - 50} >
                {histogramData.map((value, index) => {
                    const barHeight = value%3 ?(((value / 1000) * 35)  ):value%7 ?(((value / 1000) * 40)  )
                    :value%15 ?(((value / 1000) * 35)  ): ((value / 1200) * 35);
                    const x = index * (barWidth + 1);
                    // console.log('object',barHeight)
                    return (
                        <Rect
                            key={index}
                            x={x - (Platform.OS === 'ios' ? 15 : 5)}
                            y={maxBarHeight - barHeight}
                            width={barWidth}
                            height={barHeight}
                            fill={calculateColor(value)}
                        />
                    )
                })}
            </Svg> */}
            
            <MultiSlider
                values={[Number(min),Number(max)]}
                sliderLength={SCREEN_WIDTH - 50}
                onValuesChange={(values) => {
                    console.log('first',values)
                    func(values[0], values[1])
                    // setRange(values)
                }}
                min={0}
                max={10100}
                step={100}
                enabledOne={true}
          enabledTwo={true}
        //   enableLabel={true}
          smoothSnapped={true}
                snapped
                markerStyle={{
                    height: 22, width: 22, borderRadius: 50, backgroundColor: '#FFFFFF', borderColor: '#E15454', borderWidth: 4
                }}
                touchDimensions={{ height: 30, width: 30 }}
                allowOverlap={false}
                selectedStyle={{
                    backgroundColor: 'red',
                }}
                unselectedStyle={{
                    backgroundColor: '#CECECE',
                }}
                trackStyle={{ height: 2 }}
                containerStyle={styles.slider}
            />
            {/* <View
              style={{ height: 0.9, width: SCREEN_WIDTH - 40, backgroundColor: '#AAACB729', margin: 10 }}
            /> */}
            <View style={styles.textContainer}>
                <Text style={styles.text}>Min Price </Text>
                <Text style={styles.text}>Max Price </Text>
            </View>
            <View style={styles.textContainer}>
                <View style={{
                    height: 46, width: 170, marginTop: 10,
                    borderRadius: 5, borderWidth: 1, borderColor: '#DFDFDF', paddingHorizontal: 15,
                    alignItems: 'center', justifyContent: 'space-between', padding: 5, flexDirection: 'row',
                }}>
                     <TextInput
                        value={min.toString()}
                        onChangeText={a => {
                            // func(a,max)
                            a>10100 ? null  :
                            fixMin(a)
                        }}
                        
                        placeholder="Min Price"
                        placeholderTextColor={'#747A82'}
                        inputStyle={{ fontSize: 15, color: 'black' }}
                        titleStyle={{
                            fontFamily: Theme.FontFamily.normal,
                            fontSize: Theme.sizes.s14,
                        }}
                        style={
                            {
                                //   marginHorizontal:20
                                height: 44,
                                // elevation: 5,
                                paddingLeft: 0,
                                // borderWidth: 1, borderColor: '#DFDFDF', 
                                // paddingBottom
                                // height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // backgroundColor: '#F9F6F6',
                                // borderWidth: 1,
                                width: 120,
                                borderColor: '#DFDFDF',
                                // borderColor: 'black',
                                color: 'black',
                                backgroundColor: 'white'
                            }
                        }
                    // text_style={styles.text_style}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center',width:50 }}>
                        <View
                            style={{
                                height: 30, width: 1, backgroundColor: '#CECECE', marginRight: 15
                            }}
                        />
                         <Text style={styles.text1}>{currencyDetails?.currency_symbol}</Text>

                    </View>
                </View>
                <View style={{
                    height: 46, width: 170, marginTop: 10,
                    borderRadius: 5, borderWidth: 1, borderColor: '#DFDFDF', paddingHorizontal: 15,
                    alignItems: 'center', justifyContent: 'space-between', padding: 5, flexDirection: 'row',
                }}>
                    {/* <Text style={styles.text1}>{range[1]} </Text> */}
                    <TextInput
                        value={max.toString()}
                        onChangeText={a => {
                            // func(min,a)
                            a>10100 ? null  :
                            fixMax(a)
                        }}
                        placeholder="Max Price"
                        placeholderTextColor={'#747A82'}
                        inputStyle={{ fontSize: 15, color: 'black' }}
                        titleStyle={{
                            fontFamily: Theme.FontFamily.normal,
                            fontSize: Theme.sizes.s14,
                        }}
                        style={
                            {
                                //   marginHorizontal:20
                                height: 44,
                                // elevation: 5,
                                paddingLeft: 0,
                                // borderWidth: 1, borderColor: '#DFDFDF', 
                                // paddingBottom
                                // height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // backgroundColor: '#F9F6F6',
                                // borderWidth: 1,
                                width: 120,
                                borderColor: '#DFDFDF',
                                // borderColor: 'black',
                                color: 'black',
                                backgroundColor: 'white'
                            }
                        }
                    // text_style={styles.text_style}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center',width:50 }}>
                        <View
                            style={{
                                height: 30, width: 1, backgroundColor: '#CECECE', marginRight: 15
                            }}
                        />
                        <Text style={styles.text1}>{currencyDetails?.currency_symbol}</Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor:'red',
        height: 160,
        width: SCREEN_WIDTH - 40
    },
    slider: {
        marginTop: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        // width: '60%'
        // alignItems:'center'
        // justifyContent: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        width: SCREEN_WIDTH - 40,
        marginTop: 10
    },
    text: {
        fontSize: 15,
        color: '#000',
        fontFamily: Theme.FontFamily.normal
        // backgroundColor:'#fff'
    },
    text1: {
        fontSize: 14,
        color: '#000',
        fontFamily: Theme.FontFamily.bold
        // backgroundColor:'#fff'
    },
});

export default RangeSliderWithHistogram;
