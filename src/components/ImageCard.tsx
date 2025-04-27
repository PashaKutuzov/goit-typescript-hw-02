import { PhotoType } from "../type";
import React from 'react';
// 
export default function ImageCard({ urls, alt_description }:PhotoType) {
    return(
        <div>
                <img src={urls.small} alt={alt_description} />
              </div>
    )
}
