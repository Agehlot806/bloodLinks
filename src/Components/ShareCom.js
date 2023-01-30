import { Share } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const onShare = async (item, name, address) => {
    try {
        const result = await Share.share({
            message: `${name} :${item.name}
${address} :${item.address_1}`,


        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};