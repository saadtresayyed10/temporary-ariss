import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';

import { Button, ButtonText } from '~/components/ui/button';
import { Input, InputField } from '~/components/ui/input';

const LoginOTP = () => {
  const [mobile, setMobile] = useState('');
  const router = useRouter();

  return (
    <Pressable onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex min-h-screen w-full flex-col justify-between bg-stone-100 px-4 pb-10">
        {/* Centered content */}
        <View className="flex flex-col items-center justify-center gap-y-20 pt-32">
          <View className="flex flex-col items-center justify-center gap-y-1">
            <Text className="mt-36 font-posterama text-7xl font-extralight uppercase text-black">
              Ariss
            </Text>
            <Text className="w-[300px] text-center font-worksans text-base capitalize text-black">
              OTP has been sent to your Whatsapp and Email
            </Text>
          </View>

          <View className="flex w-full flex-row items-center justify-center gap-x-2 px-4">
            {/* +91 box */}
            {/* <View className="w-[70px]">
              <Input size="lg" isDisabled>
                <InputField
                  value={countryCode}
                  editable={false}
                  selectTextOnFocus={false}
                  className="text-center font-worksans text-lg"
                />
              </Input>
            </View> */}

            {/* OTP box */}
            <View className="flex-1">
              <Input size="lg">
                <InputField
                  placeholder="6 Digit OTP"
                  keyboardType="number-pad"
                  className="font-worksans text-lg"
                  returnKeyType="done"
                  value={mobile}
                  onChangeText={setMobile}
                />
              </Input>
            </View>
          </View>
        </View>

        {/* Bottom content */}
        <View className="w-full items-center px-4">
          <Button className="w-full rounded-lg" size="xl" onPress={() => router.push('/')}>
            <ButtonText className="font-worksans text-base">Login</ButtonText>
          </Button>

          <View className="mt-4 flex-row justify-center">
            <Text className="font-worksans text-sm text-gray-500">Didn't receive OTP? </Text>
            <Link href="/">
              <Text className="font-worksans text-sm font-semibold text-orange-500">Resend</Text>
            </Link>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default LoginOTP;
