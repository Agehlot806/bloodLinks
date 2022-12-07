import call from 'react-native-phone-call';
export const PhoneCall = () => {
    const args = {
        number: '6375798641',
        prompt: true, 
    }

    call(args).catch(console.error)
}