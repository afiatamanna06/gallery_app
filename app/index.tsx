import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages, setSearchQuery } from "@/redux/gallerySlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Href, useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { FlatList, Pressable, TextInput } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { Image } from "@/components/ui/image";

interface ImageProps {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const GalleryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, status, searchQuery } = useSelector(
    (state: RootState) => state.gallery
  );
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchImages(page));
  }, [page]);

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadMore = () => {
    if (status !== "loading") {
      setPage(page + 1);
    }
  };

  return (
    <VStack className="bg-white w-full">
      <TextInput
        placeholder="Search Images"
        value={searchQuery}
        onChangeText={(text: string) => dispatch(setSearchQuery(text))}
        className="p-4 border bg-white"
      />
      {status === "loading" && <Spinner />}
      <FlatList
        data={filteredImages}
        numColumns={4}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: ImageProps }) => (
          <Pressable
            className="flex-1 bg-white flex flex-row justify-center"
            onPress={() =>
              router.push(`/detail/${item.id}` as Href<string | object>)
            }
          >
            <Image
              source={{ uri: item.thumbnailUrl }}
              className="w-full h-[100%] aspect-square"
              alt={item.title}
            />
          </Pressable>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </VStack>
  );
};

export default GalleryScreen;
