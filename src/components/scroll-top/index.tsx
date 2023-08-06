import './scroll-top.css'
import chevron from '../../assets/chevron.svg'
import { useCallback, useEffect, useState } from 'react';
import { INFINITE_SCROLL_OFFSET } from '../../utils/search';


const ScrollTop = () => {
    const [showButton, setShowButton] = useState(false)

    const handleScroll = useCallback((e: any) => {
        const scrollOffset = window.scrollY

        if (scrollOffset > INFINITE_SCROLL_OFFSET) setShowButton(true)
        else setShowButton(false)

    }, [])

    const handleScrollTopClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])

    return (
        <>
            <button className={`scroll-top-btn ${showButton ? 'visible' : ''}`} onClick={handleScrollTopClick}>
                <img src={chevron} alt="chevron top" />
            </button>
        </>
    )
}

export default ScrollTop