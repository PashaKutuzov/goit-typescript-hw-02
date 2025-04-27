import ImageCard from "./ImageCard";
import { PhotoType } from "../type";
import React from 'react';

type ImageGalleryProps = {
  items: PhotoType[]
  openModal: (photo:PhotoType) => void
}


export default function ImageGallery({ items, openModal }: ImageGalleryProps) {
    
    return (
        <ul className="image-gallery">
          {items.map(({ id, urls, alt_description }) => (
            <li key={id} className="image-item" onClick={() => openModal({id, urls, alt_description })}>
           <ImageCard 
           urls={urls}
           alt_description={alt_description}/>
            </li>
          ))}
        </ul>
      );
    
    }