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
                <>
                    <h1 style={{ textAlign: 'center' }}>Tomer Revah Test</h1>
                    <div className="carousel flex center" data-testid="carousel">
                        <button id="next" name="next" data-testid="next-btn" onClick={() => { carouselNavigation(1) }}>
                            <ArrowBackIosNewIcon />
                        </button>
                        <img
                            src={images[currentImageIndex]}
                            alt="carousel img"
                        />
                        <button name="prev" data-testid="prev-btn" onClick={() => { carouselNavigation(-1) }}>
                            <ArrowForwardIosIcon />
                        </button>
                    </div>
                </>
            }
        </section >
    );
}
export default ImageCarousel;
