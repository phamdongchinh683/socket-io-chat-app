import { Link } from "react-router-dom";
import { Box } from "./Components/Box";
import { Column } from "./Components/Column";
import { FooterContainer } from "./Components/FooterContainer";
import { FooterLink } from "./Components/FooterLink";
import { Heading } from "./Components/Heading";
import { Row } from "./Components/Row";

const Footer = () => {
  return (
    <Box>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Chat Application
      </h1>
      <FooterContainer>
        <Row>
          <Column>
            <Heading>Pages</Heading>
            <Link to={'/'}>
              <FooterLink>
                Home
              </FooterLink>
            </Link>
            <Link to={'/my-chats'}>
              <FooterLink>
                My chats
              </FooterLink>
            </Link>
            <Link to={'/profile'}>
              <FooterLink>
                Profile
              </FooterLink>
            </Link>
            <Link to={'/update-password'}>
              <FooterLink>
                Update Password
              </FooterLink>
            </Link>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink >
              Writing
            </FooterLink>
            <FooterLink>
              Internships
            </FooterLink>
            <FooterLink >
              Coding
            </FooterLink>
            <FooterLink>
              Teaching
            </FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink >
              Uttar Pradesh
            </FooterLink>
            <FooterLink >
              Ahemdabad
            </FooterLink>
            <FooterLink >
              Indore
            </FooterLink>
            <FooterLink >
              Mumbai
            </FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink >
              <i className="fab fa-facebook-f">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink >
              <i className="fab fa-instagram">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink >
              <i className="fab fa-twitter">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink >
              <i className="fab fa-youtube">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </FooterContainer>
    </Box>
  );
};
export default Footer;
