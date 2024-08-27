import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""

  })
  const onSignInPress = async () => {

  }
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='w-full relative h-[250px] '>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Welcome 🖐</Text>
        </View>
        <View className='p-5'>
          <InputField label={'Email'} placeholder="Enter your email" icon={icons.email} value={form.email} onChangeText={(value) => setForm({...form, email: value})} />
          <InputField label={'Password'} placeholder="Enter your password" icon={icons.lock} value={form.password} onChangeText={(value) => setForm({ ...form, password: value })} />
          <CustomButton title='Sign In' onPress={onSignInPress} className='mt-6' />
          {/* // OAuth verfication  */}
          <OAuth />
          <Link href={'/(auth)/sign-up'} className='mt-10 text-lg text-center text-general-200'>
            <Text>Don't have an account?</Text>
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
        </View>
        {/* { modal verification } */}
      </View>
    </ScrollView>
  )
}

export default SignInPage