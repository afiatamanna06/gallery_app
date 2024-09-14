import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface Image {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: string;
}

interface GalleryState {
  images: Image[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
}

const initialState: GalleryState = {
  images: [],
  status: "idle",
  error: null,
  searchQuery: "",
};

export const fetchImages = createAsyncThunk(
  "gallery/fetchImages",
  async (page: number = 1) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_limit=30&_page=${page}`
    );
    return response.data.map((image: any) => ({
      ...image,
      album: `Album ${Math.ceil(image.id / 50)}`,
    }));
  }
);

export const loadCachedImages = createAsyncThunk(
  "gallery/loadCachedImages",
  async () => {
    const cachedImages = await AsyncStorage.getItem("cachedImages");
    if (cachedImages) {
      return JSON.parse(cachedImages);
    }
    return [];
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    deleteImage: (state, action: PayloadAction<number>) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload
      );
    },
    deleteAlbum: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(
        (image) => image.album !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchImages.fulfilled,
        (state, action: PayloadAction<Image[]>) => {
          state.status = "succeeded";
          state.images = [...state.images, ...action.payload];
          AsyncStorage.setItem("cachedImages", JSON.stringify(state.images));
        }
      )
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch images";

        Toast.show({
          type: "error",
          text1: "Error",
          text2: state.error,
          position: "bottom",
        });
      })
      .addCase(loadCachedImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadCachedImages.fulfilled,
        (state, action: PayloadAction<Image[]>) => {
          state.status = "succeeded";
          state.images = action.payload;
        }
      )
      .addCase(loadCachedImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load cached images";

        Toast.show({
          type: "error",
          text1: "Error",
          text2: state.error,
          position: "bottom",
        });
      });
  },
});

export const { setSearchQuery, deleteImage, deleteAlbum } =
  gallerySlice.actions;
export default gallerySlice.reducer;
