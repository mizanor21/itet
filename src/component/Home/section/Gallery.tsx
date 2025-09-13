'use client'

import Container from '@/component/Container/Container';
import { GalleryData } from '@/types/homeDataTypes';
import Link from "next/link";
import { useState, useEffect, useCallback } from 'react';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<GalleryData | null>(null);
    const [visibleCount, setVisibleCount] = useState(20);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

    const images: GalleryData[] = [
  { _id: '1', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614589/WhatsApp_Image_2025-09-09_at_10.05.01_PM_taovks.jpg', title: 'ITET Gallery' },
  { _id: '2', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614589/WhatsApp_Image_2025-09-09_at_10.05.02_PM_cziyaa.jpg', title: 'ITET Gallery' },
  { _id: '3', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614587/WhatsApp_Image_2025-09-09_at_10.05.02_PM_1_rdl6k7.jpg', title: 'ITET Gallery' },
  { _id: '4', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614587/WhatsApp_Image_2025-09-09_at_10.05.02_PM_3_zckosw.jpg', title: 'ITET Gallery' },
  { _id: '5', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614587/WhatsApp_Image_2025-09-09_at_10.05.02_PM_2_hxakjl.jpg', title: 'ITET Gallery' },
  { _id: '6', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614586/WhatsApp_Image_2025-09-09_at_10.19.59_PM_ahtp16.jpg', title: 'ITET Gallery' },
  { _id: '7', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614585/WhatsApp_Image_2025-09-09_at_10.19.59_PM_1_d4m0tr.jpg', title: 'ITET Gallery' },
  { _id: '8', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614585/WhatsApp_Image_2025-09-09_at_10.19.59_PM_2_ubuvnj.jpg', title: 'ITET Gallery' },
  { _id: '9', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614584/WhatsApp_Image_2025-09-09_at_10.24.56_PM_wh6zt6.jpg', title: 'ITET Gallery' },
  { _id: '10', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614583/WhatsApp_Image_2025-09-09_at_10.24.56_PM_1_uoxguj.jpg', title: 'ITET Gallery' },
  { _id: '11', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614582/WhatsApp_Image_2025-09-09_at_10.28.36_PM_f2u4ln.jpg', title: 'ITET Gallery' },
  { _id: '12', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614581/WhatsApp_Image_2025-09-09_at_10.28.37_PM_jz4ry6.jpg', title: 'ITET Gallery' },
  { _id: '13', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614581/WhatsApp_Image_2025-09-09_at_10.28.37_PM_1_vr5w1s.jpg', title: 'ITET Gallery' },
  { _id: '14', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614580/WhatsApp_Image_2025-09-09_at_10.28.38_PM_bftufo.jpg', title: 'ITET Gallery' },
  { _id: '15', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614580/WhatsApp_Image_2025-09-09_at_10.28.39_PM_nxs7ag.jpg', title: 'ITET Gallery' },
  { _id: '16', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614580/WhatsApp_Image_2025-09-09_at_10.28.38_PM_1_okjg9b.jpg', title: 'ITET Gallery' },
  { _id: '17', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614579/WhatsApp_Image_2025-09-09_at_10.28.40_PM_zwlta9.jpg', title: 'ITET Gallery' },
  { _id: '18', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614578/WhatsApp_Image_2025-09-09_at_10.28.41_PM_1_h8vdvf.jpg', title: 'ITET Gallery' },
  { _id: '19', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614578/WhatsApp_Image_2025-09-09_at_10.28.41_PM_veyhee.jpg', title: 'ITET Gallery' },
  { _id: '20', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614577/WhatsApp_Image_2025-09-09_at_10.28.42_PM_ydp31d.jpg', title: 'ITET Gallery' },
  { _id: '21', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614577/WhatsApp_Image_2025-09-09_at_10.32.22_PM_rvv2in.jpg', title: 'ITET Gallery' },
  { _id: '22', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614576/WhatsApp_Image_2025-09-09_at_10.28.42_PM_1_ddgbbt.jpg', title: 'ITET Gallery' },
  { _id: '23', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614575/WhatsApp_Image_2025-09-09_at_10.32.23_PM_tbma4v.jpg', title: 'ITET Gallery' },
  { _id: '24', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614574/WhatsApp_Image_2025-09-09_at_10.34.44_PM_o93rqt.jpg', title: 'ITET Gallery' },
  { _id: '25', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614574/WhatsApp_Image_2025-09-09_at_10.32.24_PM_rqsorp.jpg', title: 'ITET Gallery' },
  { _id: '26', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614574/WhatsApp_Image_2025-09-09_at_10.32.25_PM_uyfpia.jpg', title: 'ITET Gallery' },
  { _id: '27', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614572/WhatsApp_Image_2025-09-09_at_10.32.27_PM_owljca.jpg', title: 'ITET Gallery' },
  { _id: '28', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614572/WhatsApp_Image_2025-09-09_at_10.32.26_PM_hjogro.jpg', title: 'ITET Gallery' },
  { _id: '29', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614570/WhatsApp_Image_2025-09-09_at_10.34.39_PM_a85y5g.jpg', title: 'ITET Gallery' },
  { _id: '30', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614569/WhatsApp_Image_2025-09-09_at_10.34.43_PM_j8u4nu.jpg', title: 'ITET Gallery' },
  { _id: '31', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614569/WhatsApp_Image_2025-09-09_at_10.34.41_PM_jqvvkz.jpg', title: 'ITET Gallery' },
  { _id: '32', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614567/WhatsApp_Image_2025-09-10_at_9.34.34_PM_tupn8a.jpg', title: 'ITET Gallery' },
  { _id: '33', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614567/WhatsApp_Image_2025-09-10_at_9.34.35_PM_1_a5iu4m.jpg', title: 'ITET Gallery' },
  { _id: '34', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614567/WhatsApp_Image_2025-09-10_at_9.34.35_PM_lmkrsn.jpg', title: 'ITET Gallery' },
  { _id: '35', image: 'https://res.cloudinary.com/du04p5ikw/image/upload/v1757614566/WhatsApp_Image_2025-09-10_at_9.34.36_PM_lsvj3r.jpg', title: 'ITET Gallery' }
];


    const initialImages = images.slice(0, 20);
    const remainingImages = images.slice(20);
    const hasMoreImages = remainingImages.length > 0;

    const openModal = (image: GalleryData) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const loadMoreImages = () => {
        setVisibleCount(prevCount => prevCount + 15); // Load 15 more images
    };

    const handleImageLoad = useCallback((id: string) => {
        setLoadedImages(prev => new Set(prev).add(id));
    }, []);

    const handleImageError = useCallback((id: string) => {
        setErrorImages(prev => new Set(prev).add(id));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;

            if (e.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    // Preload next set of images when user approaches the bottom
    useEffect(() => {
        if (visibleCount >= images.length) return;

        const preloadImages = () => {
            const nextImages = images.slice(visibleCount, visibleCount + 5);
            nextImages.forEach(img => {
                const image = new Image();
                image.src = img.image;
            });
        };

        preloadImages();
    }, [visibleCount, images]);

    return (
        <div className="bg-gradient-to-b from-yellow-700/10 to-yellow-100/5 py-16">
            <Container>
                {/* Gallery Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-medium font-manuale text-black mb-4">
                        Explore <span className="text-[#B07210]">Our Gallery</span>
                    </h2>
                    <Link
                        href="/gallery"
                        className="text-sm sm:text-base text-[#B07210] underline font-medium"
                    >
                        View All
                    </Link>
                </div>

                {/* Gallery grid with modern layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.slice(0, visibleCount).map((item) => (
                        <div
                            key={item._id}
                            className="group relative overflow-hidden rounded-xl bg-neutral-200 aspect-square cursor-pointer"
                            onClick={() => openModal(item)}
                        >
                            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                {errorImages.has(item._id) ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                ) : (
                                    <>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${loadedImages.has(item._id) ? 'opacity-100' : 'opacity-0'}`}
                                            loading="lazy"
                                            onLoad={() => handleImageLoad(item._id)}
                                            onError={() => handleImageError(item._id)}
                                        />
                                        {!loadedImages.has(item._id) && !errorImages.has(item._id) && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-8 h-8 border-2 border-t-[#B07210] border-gray-300 rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Overlay with title */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-sm font-medium text-[#B07210] uppercase tracking-wider">
                                        Gallery
                                    </span>
                                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                                    <div className="w-10 h-0.5 bg-[#B07210] rounded-full mt-3"></div>
                                </div>

                                {/* View button */}
                                <div className="absolute top-4 right-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < images.length && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={loadMoreImages}
                            className="px-8 py-3 bg-[#B07210] text-white font-medium rounded-full hover:bg-[#9a6210] transition-colors duration-300 flex items-center gap-2"
                        >
                            Load More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Show message when all images are loaded */}
                {visibleCount >= images.length && hasMoreImages && (
                    <div className="text-center mt-8 text-gray-600">
                        All images loaded
                    </div>
                )}
            </Container>

            {/* Enhanced Image modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-5xl w-full max-h-[90vh]"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute -top-14 right-2 text-white hover:text-[#B07210] transition-colors z-10 bg-black/40 rounded-full p-3 backdrop-blur-sm"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="relative h-full flex flex-col items-center">
                            <div className="flex-1 overflow-hidden rounded-xl bg-black/20">
                                <img
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
                                    className="w-full h-full max-h-[70vh] object-contain"
                                />
                            </div>

                            <div className="mt-6 text-center px-4">
                                <h2 className="text-2xl font-bold text-white mt-1 mb-2">{selectedImage.title}</h2>
                                <p className="text-gray-300 text-sm">
                                    {images.findIndex(img => img._id === selectedImage._id) + 1} of {images.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;