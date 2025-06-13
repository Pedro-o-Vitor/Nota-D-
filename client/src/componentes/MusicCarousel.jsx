import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrackCard from "./TrackCard";

export default function MusicCarousel() {
  const [tracks, setTracks] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks");
      const data = await response.json();
      setTracks(data.data);
    };

    fetchTracks();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Top Músicas no Deezer</h2>
      <Slider {...settings} ref={sliderRef}>
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </Slider>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#1E1E1E",
    color: "#fff"
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "1.8rem"
  }
};