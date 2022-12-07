import {
    Platform,
    Linking,
} from "react-native";
export const ComponentMap = async (latitude, longitude) => {
    const tag = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;
    const link = Platform.select({
        ios: `${tag}@${latitude},${longitude}`,
        android: `${tag}${latitude},${longitude}`
    });
    try {
        const supported = await Linking.canOpenURL(link);
        if (supported) Linking.openURL(link);
    } catch (error) {
        console.log(error);
    }
}