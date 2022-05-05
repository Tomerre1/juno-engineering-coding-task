import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../api/index";
import { Loader } from './cmps/Loader'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCarousel = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getImagesUrls();
    }, [])

    const getImagesUrls = async () => {
        try {
            setIsLoading(true);
            const fetchedImages = await fetchImageUrls();
            setImages(fetchedImages);
        } catch (err) {
            console.log(`something worng with images fetching, check getImagesUrls function: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    const carouselNavigation = (num) => {
        const nextIndex = currentImageIndex + num
        const isIndexToHigh = nextIndex > images.length - 1;
        const isIndexToLow = nextIndex < 0;

        if (isIndexToHigh || isIndexToLow) {
            const index = (isIndexToHigh) ? 0 : images.length - 1;
            setCurrentImageIndex(index)
        } else {
            setCurrentImageIndex(currentImageIndex + num);
        }
    }

    return (
        <section className="container">
            {isLoading ? <Loader />
                :
                <div className="carousel flex center">
                    <ArrowBackIosNewIcon onClick={() => { carouselNavigation(1) }} />
                    <img
                        src={images[currentImageIndex]}
                        alt="carousel img"
                    />
                    <ArrowForwardIosIcon onClick={() => { carouselNavigation(-1) }} />
                </div>
            }
        </section >
    );
}
export default ImageCarousel;
