import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';

import { Button, ButtonText } from '~/components/ui/button';
import { Input, InputField } from '~/components/ui/input';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const countryCode = '+91';
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
            <Text className="font-worksans text-base capitalize text-black">
              Login to your account
            </Text>
          </View>

          <View className="flex w-full flex-row items-center justify-center gap-x-2 px-4">
            {/* +91 box */}
            <View className="w-[70px]">
              <Input size="lg" isDisabled>
                <InputField
                  value={countryCode}
                  editable={false}
                  selectTextOnFocus={false}
                  className="text-center font-worksans text-lg"
                />
              </Input>
            </View>

            {/* Mobile number box */}
            <View className="flex-1">
              <Input size="lg">
                <InputField
                  placeholder="Mobile Number"
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
          <Button
            className="w-full rounded-lg"
            size="xl"
            onPress={() => router.push('/login/email-usertype')}>
            <ButtonText className="font-worksans text-base">Continue</ButtonText>
          </Button>

          <View className="mt-4 flex-row justify-center">
            <Text className="font-worksans text-sm text-gray-500">Don't have an account? </Text>
            <Link href="/">
              <Text className="font-worksans text-sm font-semibold text-orange-500">Sign up</Text>
            </Link>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Login;
