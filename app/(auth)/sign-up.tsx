import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { fetchAPI } from '@/lib/fetch'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'

const SignUpPage = () => {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""

  })
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: ""
  })
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setVerification({...verification, state: "pending"})

    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log("Any error occurred")
      console.log(err.errors[0].longMessage)
      Alert.alert("Error", err.errors[0].longMessage) 
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        await fetchAPI("/(api)/user", { 
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId
          })
        })
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({...verification, state: 'success '})
      } else {
        setVerification({...verification, state: "failed", error: "verification failed"})
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({...verification, state: "failed", error: err.errors[0].longMessage})

    }
  }
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='w-full relative h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Create Your Account</Text>
        </View>
        <View className='p-5'>
          <InputField label={'Name'} placeholder="Enter your Name" icon={icons.person} value={form.name} onChangeText={(value) => setForm({...form, name: value})} />
          <InputField label={'Email'} placeholder="Enter your email" icon={icons.email} value={form.email} onChangeText={(value) => setForm({...form, email: value})} />
          <InputField label={'Password'} placeholder="Enter your password" icon={icons.lock} value={form.password} secureTextEntry onChangeText={(value) => setForm({ ...form, password: value })} />
          <CustomButton title='Sign Up' onPress={onSignUpPress} className='mt-6' />
          {/* // OAuth verfication  */} 
          <OAuth />
          <Link href={'/sign-in'} className='mt-10 text-lg text-center text-general-200'>
            <Text>Already have an account?</Text>
            <Text className='text-primary-500'>Log In</Text>
          </Link>
        </View>
        {/* { modal verification } */}
        <ReactNativeModal isVisible={verification.state === 'pending'} onModalHide={() => setVerification({...verification, state: "success"})} >
          <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            <Text className='text-2xl font-JakartaExtraBold mb-2'>
                Verification
            </Text>
            <Text className='font-Jakarta mb-5'>
                We've sent a verification code to { form.email}
            </Text>
            <InputField label='Code' icon={icons.lock} placeholder='12345' value={verification.code} keyboardType='numeric' onChangeText={(code) => setVerification({ ...verification, code: code })} />
            {verification.error && <Text className='text-red-500 text-sm mt-1 '>{verification.error}</Text>}
            <CustomButton title='Verify Email' onPress={onPressVerify} className='mt-5'  bgVariant='success' />
            </View>
        </ReactNativeModal>


        <ReactNativeModal isVisible={verification.state === 'success'}>
          <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            <Image source={images.check} className='w-[110px] h-[110px] mx-auto my-5' />
            <Text className='text-3xl font-JakartaBold text-center'>Verified</Text>
            <Text className='text-base text-gray-400 font-Jakarta  mt-2 text-center'>You have successfully verified your account</Text>
            <CustomButton title='Browse Home' onPress={() => router.push('/(root)/(tabs)/home')} className='mt-5' />
            </View>
        </ReactNativeModal>
      </View>
    </ScrollView> 
  )
}

export default SignUpPage 