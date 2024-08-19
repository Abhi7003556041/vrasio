import { View, Text, Image } from 'react-native'
import React from 'react'
import Theme from '../../Constants/Theme'

const NodataFound = ({title}) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: (0),
            }}>
            <Image
                source={require('../../assets/images/notfound.png')}
                resizeMode='contain'
                style={{
                    height: (180),
                    width: (180)
                }}

            />
            <Text
                style={{
                    color: 'blue',
                    fontFamily: Theme.FontFamily.semiBold,
                    marginTop: 5
                }}>
                {/* {`No ${title ? title : 'data'} Found`} */}
            </Text>
        </View>
    )
}

export default NodataFound