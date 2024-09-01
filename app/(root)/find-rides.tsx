import GoogleTextInput from "@/components/GoogleTextInput"
import RideLayout from "@/components/RideLayout"
import { icons } from "@/constants"
import { useLocationStore } from "@/store"
import { Text, View } from "react-native"

const FindRides = () => {
    const {userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore()
    return ( 
        <RideLayout title="Ride">
            <View className="my-3">
                <Text className="text-lg mb-3 font-JakartaSemiBold">From</Text>
                <GoogleTextInput icon={icons.target} initialLocation={userAddress!} />
            </View>
        </RideLayout>
    )
}

export default FindRides