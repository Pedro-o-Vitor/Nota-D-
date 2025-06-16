import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrackCard from "./TrackCard";
import axios from "axios";

export default function MusicCarousel({ title, apiEndpoint }) {
  const [tracks, setTracks] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setTracks(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar músicas:", error);
      }
    };
    fetchTracks();
  }, [apiEndpoint]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    // para adicionar reponsibilidade
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
    backgroundColor: "Black",
    color: "#fff"
  },
};