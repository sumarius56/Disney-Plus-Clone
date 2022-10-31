import HoverVideoPlayer from "react-hover-video-player";

function Brands() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center mt-10 gap-6 px-8 max-w-[1400px] mx-auto">
      <div className="brand group">
        <HoverVideoPlayer
          videoSrc={[{ src: "/videos/disney.mp4", type: "video/mp4" }]}
          pausedOverlay={
            <img
              src="/images/disnep.png"
              loading="lazy"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          }
        />
      </div>
      <div className="brand group">
        <HoverVideoPlayer
          videoSrc={[{ src: "/videos/pixar.mp4", type: "video/mp4" }]}
          pausedOverlay={
            <img
              src="/images/pixar.png"
              loading="lazy"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          }
        />
      </div>

      <div className="brand group">
        <HoverVideoPlayer
          videoSrc={[{ src: "/videos/marvel.mp4", type: "video/mp4" }]}
          pausedOverlay={
            <img
              src="/images/marvel.png"
              loading="lazy"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          }
        />
      </div>

      <div className="brand group">
        <HoverVideoPlayer
          videoSrc={[{ src: "/videos/star-wars.mp4", type: "video/mp4" }]}
          pausedOverlay={
            <img
              src="/images/starwars.png"
              loading="lazy"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          }
        />
      </div>

      <div className="brand group">
        <HoverVideoPlayer
          videoSrc={[
            { src: "/videos/national-geographic.mp4", type: "video/mp4" },
          ]}
          pausedOverlay={
            <img
              src="/images/national-geographic.png"
              loading="lazy"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          }
        />
      </div>
    </section>
  );
}

export default Brands;
