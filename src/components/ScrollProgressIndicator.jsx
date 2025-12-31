import { useState, useEffect } from 'react';

const ScrollProgressIndicator = ({ sectionRef, sectionCount }) => {

    // deafault to first element
    const [currentInd, setCurrent] = useState(0) 

    // check if active, change color to white on active
    useEffect(() => {
        const container = sectionRef.current

        const handleScroll = () => {

            // how far we scrolled / 1 vh
            let newInd = container.scrollTop / container.clientHeight

            // update currentInd
            setCurrent(newInd)
        }

        // add event listener to call handleScroll
        container.addEventListener('scroll', handleScroll)

        // when components gets unmounted
        return () => {
            container.removeEventListener('scroll', handleScroll)
        }
    }, [sectionCount])

    return (
        <div className="fixed right-3 top-1/2 -translate-y-1/2 flex flex-col items-center z-40 pointer-events-none">
        {Array.from({ length: sectionCount }).map((_, index) => { 
            return (
                <button className={`w-2 h-2 rounded-full my-2 p-0.5 ${
                    index === currentInd ? 'bg-white' :'bg-slate-500'}`}></button>
            );
        })}
        </div>
    );
};

export default ScrollProgressIndicator;

