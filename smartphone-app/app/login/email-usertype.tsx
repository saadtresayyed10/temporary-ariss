import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';

import { Button, ButtonText } from '~/components/ui/button';
import { ChevronDownIcon } from '~/components/ui/icon';
import { Input, InputField } from '~/components/ui/input';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '~/components/ui/select';

const EmailUserType = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<'DEALER' | 'TECHNICIAN' | 'BACKOFFICE'>('DEALER');
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

          <View className="flex w-full flex-col gap-y-4 px-4">
            {/* Email Input */}
            <Input size="lg">
              <InputField
                placeholder="Email Address"
                keyboardType="email-address"
                className="font-worksans text-lg"
                returnKeyType="done"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </Input>

            {/* User Type Select */}
            <Select>
              <SelectTrigger variant="outline" size="lg" className="font-worksans text-lg">
                <SelectInput placeholder="Select User Type" value={userType} />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Dealer" value="DEALER" onPress={() => setUserType('DEALER')} />
                  <SelectItem
                    label="Technician"
                    value="TECHNICIAN"
                    onPress={() => setUserType('TECHNICIAN')}
                  />
                  <SelectItem
                    label="Back Office"
                    value="BACKOFFICE"
                    onPress={() => setUserType('BACKOFFICE')}
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
          </View>
        </View>

        {/* Bottom content */}
        <View className="w-full items-center px-4">
          <Button
            className="w-full rounded-lg"
            size="xl"
            onPress={() => router.push('/login/login-otp')}>
            <ButtonText className="font-worksans text-base">Send OTP</ButtonText>
          </Button>

          {/* <View className="mt-4 flex-row justify-center">
            <Text className="font-worksans text-sm text-gray-500">Didn't get the OTP? </Text>
            <Text
              className="font-worksans text-sm font-semibold text-orange-500"
              onPress={() => router.back()}>
              Resend
            </Text>
          </View> */}
        </View>
      </View>
    </Pressable>
  );
};

export default EmailUserType;
