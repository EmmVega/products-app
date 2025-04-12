import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';


interface Props {
    images: string[];
}
const ProductImages = ({images}: Props) => {
    return (
      <>
      {(!images.length) 
        ? <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        >
            <Image 
                source={require("../../../assets/images/no-product-image.png")}
                style={{width: 300, height: 300}}
            />
        </View>
        : (
        <FlatList 
            data={images}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <Image 
                    source={{uri: item}}
                    style={{
                        width: 300,
                        height: 300,
                        marginHorizontal: 7,
                        borderRadius: 5
                    }} 
                />
            )}
        />)
        }
      </>
    );
}

const styles = StyleSheet.create({})

export default ProductImages;
