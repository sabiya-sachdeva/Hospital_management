import { Carousel, Button, Card} from "antd";
import Footerdetails from "../FooterDetails/Footerdetails";
import "antd/dist/reset.css";
import Navbar from "../Navbar/Navbar";


function Home() {
  const images = ["/Hospitalprofileimage.jpg", "/Hospitalimage2.jpg"];

  //styling using Ant

  return (
    <div>
      <Navbar />
      {/* adding corousel */}
      <Carousel autoplay>
        {images.map((src, id) => (
          <div key={id}>
            <img
              src={src}
              alt={`slide-${id}`}
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Carousel>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          boxShadow: "none", // removes shadow
          border: "none",
        }}
      >
        <Button type="primary" style={{ padding: "20px" }} href="/search">
          View All Speacialist
          
        </Button>
      </Card>
      <Footerdetails />
    </div>
  );
}

export default Home;
