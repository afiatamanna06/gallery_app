import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const image = useSelector((state: RootState) =>
    state.gallery.images.find((img) => img.id === parseInt(id as string, 10))
  );

  if (!image) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No Image Found",
      position: "bottom",
    });

    return <Text>No Image Found</Text>;
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="flex flex-row justify-center">
          <Image
            source={{ uri: image.url }}
            alt={image.title}
            size="2xl"
            className="w-full h-[100%] aspect-square"
          />
        </View>
        <View className="px-6 pt-6">
          <Text className="text-2xl font-medium mb-4">
            Title: {image.title}
          </Text>
          <Text className="text-lg">Album: {image.album}</Text>
          <Text className="text-lg">Image ID: {image.id}</Text>
          <Text className="text-lg">URL: {image.url}</Text>
          <Text className="text-lg">Thumbnail URL: {image.thumbnailUrl}</Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-8 w-full px-6">
        <Button onPress={() => router.back()} size="lg" className="rounded-lg">
          <ButtonText>Back</ButtonText>
        </Button>
      </View>

      <Toast />
    </View>
  );
};

export default DetailScreen;
