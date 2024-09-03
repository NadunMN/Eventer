import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Ceatlogo from '../asset/Icon/images (1).jpg'
import Maxxislogo from '../asset/Icon/images.png'
import Bridgestonelogo from '../asset/Icon/logo1.jpeg'
import Dunloplogo from '../asset/Icon/Rotaract-300x130.png'
import Michelinlogo from '../asset/Icon/images.jpg'
import Federallogo from '../asset/Icon/colombo.png'

function Brandcarousel() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    return (
        <div className='brandcarousel-container flex justify-center'>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                containerClass="carousel-container w-[75vw] "
                removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <Brandlogos logo={Maxxislogo} />
                <Brandlogos logo={Ceatlogo} />
                <Brandlogos logo={Bridgestonelogo} />
                <Brandlogos logo={Dunloplogo} />
                <Brandlogos logo={Michelinlogo} />
                <Brandlogos logo={Federallogo} />
            </Carousel>
        </div>

    )
}

function Brandlogos(props) {
    return (
        <img
            src={props.logo}
            alt="logo"
            style={{
                width: '170px',
                height: '100px',
            }}
        />
    )
}

export default Brandcarousel