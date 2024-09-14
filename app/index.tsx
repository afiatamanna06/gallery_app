import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchImages,
  setSearchQuery,
  loadCachedImages,
  deleteImage,
  deleteAlbum,
} from "@/redux/gallerySlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { FlatList, Pressable, TextInput, Button, Alert } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { Image } from "@/components/ui/image";
import Toast from "react-native-toast-message";

interface ImageProps {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: string;
}

const GalleryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, status, searchQuery } = useSelector(
    (state: RootState) => state.gallery
  );
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    dispatch(loadCachedImages());
    dispatch(fetchImages(page));
  }, [page]);

  const filteredImages = images.filter((image) => {
    const title = image.title?.toLowerCase() || "";
    const album = image.album?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return title.includes(query) || album.includes(query);
  });

  const handleLoadMore = () => {
    if (status === "idle" || status === "succeeded") {
      setPage(page + 1);
    }
  };

  const handleDeleteImage = (id: number) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this image?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteImage(id));
            Toast.show({
              type: "success",
              text1: "Image Deleted",
              text2: "The image has been deleted",
            });
          },
        },
      ]
    );
  };

  const handleDeleteAlbum = (album: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this album and all its images?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteAlbum(album));
            Toast.show({
              type: "success",
              text1: "Album Deleted",
              text2: `The album ${album} has been deleted`,
            });
          },
        },
      ]
    );
  };

  return (
    <VStack className="bg-white w-full">
      <TextInput
        placeholder="Search by title or album"
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
            onPress={() => router.push(`/detail/${item.id}`)}
          >
            <Image
              source={{ uri: item.thumbnailUrl }}
              className="w-full h-[100%] aspect-square"
              alt={item.title}
            />
            {/* <Button title="Delete" onPress={() => handleDeleteImage(item.id)} className="absolute top-2 right-2" /> */}
          </Pressable>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      {/* Example button to delete an album */}
      {/* <Button title="Delete Album 1" onPress={() => handleDeleteAlbum("Album 1")} /> */}
    </VStack>
  );
};

export default GalleryScreen;
