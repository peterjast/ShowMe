import React, { useEffect, useState } from 'react'
import './Carousel.css'

const Carousel = (props) => {
    const { children, show } = props
    console.log(props);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    const [touchPosition, setTouchPosition] = useState(null)

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - carouselIndex.index)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }
    const [carouselIndex, setDimensions] = useState({index:4})
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                index: responsive(window.innerWidth)
            })
            // console.log(‘resized to: ’, window.innerWidth, ‘x’, window.innerHeight);
        }, 1000)
        window.addEventListener("resize", debouncedHandleResize)
        return _ => {
            window.removeEventListener("resize", debouncedHandleResize)
        }
    })
    function debounce(fn, ms) {
        let timer;
        return _ => {
            clearTimeout(timer);
            timer = setTimeout(_ => {
                timer = null;
                fn.apply(this, arguments);
            }, ms);
        };
    }
    const responsive = (window) => {
        console.log('inside trending', window);
         if (window > 1600){
           return 4;
         } else if (window < 1600 && window > 1024){
           return 3;
         } else if (window < 1024 && window > 464){
           return 2;
         } else if (window < 464) {
           return 1;
       };
     }

return (
    <div className="carousel-container">
        <div className="carousel-wrapper">
            {/* You can always change the content of the button to other things */}
            {
                currentIndex > 0 &&
                <button onClick={prev} className="left-arrow">
                    &lt;
                    </button>
            }
            <div
                className="carousel-content-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div
                    // responsive={responsive}
                    className={`carousel-content show-${carouselIndex.index}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / carouselIndex.index)}%)` }}
                >
                    {children}
                </div>
            </div>
            {/* You can alwas change the content of the button to other things */}
            {
                currentIndex < (length - carouselIndex.index) &&
                <button onClick={next} className="right-arrow">
                    &gt;
                    </button>
            }
        </div>
    </div>
)
}

export default Carousel;