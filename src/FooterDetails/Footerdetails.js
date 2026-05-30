import React from "react";
import { Row, Col, Card, Typography } from "antd";
const { Link } = Typography;
function Footerdetails() {
  return (
    <div>
      <div style={{ padding: "0 16px" }}>
        <Row gutter={10} justify="center">
          <Col xs={12} sm={10} md={8}>
            <Card
              style={{
                padding: "10px",
                backgroundColor: "bisque",
                height: "100%",
              }}
            >
              Emergency +991
            </Card>
          </Col>
          <Col xs={12} sm={10} md={8}>
            <Card
              style={{
                padding: "10px",
                backgroundColor: "beige",
                height: "100%",
              }}
            >
              Lifeline International +45562763847
            </Card>
          </Col>
          <Col xs={12} sm={10} md={8}>
            <Card
              style={{
                padding: "10px",
                backgroundColor: "bisque",
                height: "100%",
              }}
            >
              Health Help Line +25327463284
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ padding: " 40px" }}>
        {/* gutter means spacing between columns  */}
      </div>
      <div style={{ padding: " 40px" }}>
        {/* gutter means spacing between columns  */}
        <Row gutter={16} justify={"center"}>
          <Col>
            <Card
              title="Discover Vancouver"
              style={{ width: 300, height: "100%" }}
            >
              <Link href="">Overview</Link>
              <br />
              <Link href="">Careers</Link>
              <br />
              <Link href="">Vision & Mission</Link>
              <br />
              <Link href="/contact">Contact Us</Link>
            </Card>
          </Col>
          <Col>
            <Card
              title="Medical Services"
              style={{ width: 300, height: "100%" }}
            >
              <Link href="/center-of-excellence">
                Center of Excellence & Specialists
              </Link>
              <br />
              <Link href="/surgery">Surgery</Link>
              <br />
              <Link href="/radiology">Radiology</Link>
            </Card>
          </Col>

          <Col>
            <Card title="Health Library" style={{ width: 300, height: "100%" }}>
              <Link href="/diseases">Diseases and Conditions</Link>
              <br />
              <Link href="/treatments">Treatments and Procedures</Link>
              <br />
              <Link href="/symptoms">Symtoms Guide</Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footerdetails;
