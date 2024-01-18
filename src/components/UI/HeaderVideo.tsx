import { MainPageVideoWrapper, SmallBackground } from "components/atoms";
import React, { useEffect, useState } from "react";
import presentation from "../../assets/video/presentation.mp4";
import ReactPlayer from "react-player/lazy";

const VideoComponent = () => {
  const video = document.getElementById("video");

  const toggleControls = () => {
    if (video) {
      if (video.hasAttribute("controls")) {
        video.removeAttribute("controls");
      } else {
        video.setAttribute("controls", "controls");
      }
    }
  };

  return (
    <MainPageVideoWrapper onMouseOver={() => toggleControls()}>
      <ReactPlayer
        id="video"
        width="100%"
        playing={true}
        height={"auto"}
        url={presentation}
        controls={true}
        loop={true}
        muted={true}
        stopOnUnmount
        volume={0.3}
        fallback={
          <SmallBackground>
            <div className="catalog-banner-c1">
              <div className="catalog-banner-head">
                <h1>SIBERIA Organic</h1>
              </div>
              <div className="catalog-banner-text">
                Уникальные напитки, сладости и снеки из натуральных сибирских
                продуктов!
              </div>
            </div>
          </SmallBackground>
        }
      />
    </MainPageVideoWrapper>
  );
};

export default VideoComponent;
