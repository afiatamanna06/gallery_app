import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text, View } from "react-native";
import { Box } from "@/components/ui/box";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const image = useSelector((state: RootState) =>
    state.gallery.images.find((img) => img.id === parseInt(id as string, 10))
  );

  if (!image) {
    return <Text>No Image Found</Text>;
  }

  return (
    <View className="relative h-full bg-white">
      <View className="flex flex-row justify-center">
        <Image
          source={{ uri: image.url }}
          alt={image.title}
          size="2xl"
          className="w-full h-[100%] aspect-square"
        />
      </View>

      <Text className="px-6 pt-8 pb-10 text-2xl font-medium">
        {image.title}
      </Text>
      <View className="px-6 absolute bottom-10 w-full">
        <Button onPress={() => router.back()} size="lg" className="rounded-lg">
          <ButtonText>Back</ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default DetailScreen;
