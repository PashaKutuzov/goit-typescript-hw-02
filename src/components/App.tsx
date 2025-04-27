import "./App.css";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import LoadMoreBtn from "./LoadMoreBtn";
import ErrorMessage from "./ErrorMessage";
import ImageGallery from "./ImageGallery";
import { useState, useEffect } from "react";
import { fetchPhotosWithTopic } from "../search-api";
import ImageModal from "./ImageModal";
import { PhotoType } from "../type";
import React from 'react';

function App() {



  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);



  const [selectedImage, setSelectedImage] = useState<PhotoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (image: PhotoType): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (topic:string): void => {
    setPhotos([]);

    setSearch(topic);
    setPage(1);
  };

  useEffect((): void => {
    if (search === "") {
      return;
    }

    async function getData(): Promise<void> {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotosWithTopic(search, page);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, search]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {error && <ErrorMessage />}
      {photos.length > 0 && <ImageGallery items={photos} openModal={openModal}/>}
      {loading && <Loader />}
      {photos.length > 0 && (
        <LoadMoreBtn onClick={() => setPage(page + 1)} Page={page} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
