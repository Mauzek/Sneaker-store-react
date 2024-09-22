import { Carousel } from 'antd'
import React from 'react'
import images from '../images'
import Styles from './banner.module.css'

export const Banner = () => {
  return (
    <div>
      <Carousel autoplay className={Styles.banner}>
        <img src={images.banner} alt='banner'/>
        <img src={images.banner} alt='banner'/>
      </Carousel>
    </div>
  )
}
