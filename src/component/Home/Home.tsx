'use client'

import Hero from "../Hero/Hero"
import Alumni from "./section/Alumni"
import Gallery from "./section/Gallery"
import OurResponsibility from "./section/OurResponsibility"
import TextileIndustryMarket from "./section/TextileIndustryMarket"
import Adds from "./section/Adds"

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />
            <TextileIndustryMarket />
            <OurResponsibility />
            <Adds />
            <Alumni />
            <Gallery />
        </div>
    )
}

export default Home; 