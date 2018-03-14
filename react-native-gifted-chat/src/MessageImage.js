import PropTypes from 'prop-types';
import React from 'react';
import {Dimensions} from 'react-native';
import {
    Image,
    StyleSheet,
    View,
    ViewPropTypes,
} from 'react-native';
import Lightbox from 'react-native-lightbox';

const {height, width} = Dimensions.get('window');
export default class MessageImage extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Lightbox
                    navigator={null}
                    activeProps={{
                        style: styles.imageActive,
                    }}
                    {...this.props.lightboxProps}
                >
                    <Image
                        {...this.props.imageProps}
                        style={[styles.image, this.props.imageStyle]}
                        source={{uri: this.props.currentMessage.image}}
                    />
                </Lightbox>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
        height,
    },
});

MessageImage.defaultProps = {
    currentMessage: {
        image: null,
    },
    containerStyle: {},
    imageStyle: {},
};

MessageImage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    imageStyle: Image.propTypes.style,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
};
