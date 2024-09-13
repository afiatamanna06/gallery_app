import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Image {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
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
    return response.data;
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
          AsyncStorage.setItem("cachedImages", JSON.stringify(state.images)); // Cache images
        }
      )
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch images";
      });
  },
});

export const { setSearchQuery, deleteImage } = gallerySlice.actions;
export default gallerySlice.reducer;
