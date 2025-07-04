import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import homepageImage from '../assets/images/homepage-image.png'
import line from '../assets/images/line.png'
import routes from '../constants/routes.json'

const { Title, Text } = Typography

const Home = () => {
  return (
    <HomeWrapper>
      <Message>
        <SubTitle>Best workshop ever</SubTitle>
        <MainTitle>Smart Education Shop</MainTitle>
        <Line src={line} alt="line" />
        <Link to={routes.PRODUCTS}>
          <StyledButton type="primary" size="large" shape="round">
            Shop now
          </StyledButton>
        </Link>
      </Message>
      <Image src={homepageImage} alt="people" />
    </HomeWrapper>
  )
}

export default Home

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6rem;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 4rem;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`

const Message = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;

  animation: fadeIn ease 2s;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
  }
`

const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.grey.dark};
  font-size: 1.9rem;
  font-weight: bold;
  letter-spacing: 0.5rem;
  text-transform: uppercase;

  @media (max-width: 450px) {
    font-size: 1.4rem;
  }
`

const MainTitle = styled(Title)`
  font-size: 6.4rem !important;
  font-weight: bold !important;
  margin: 0 !important;

  @media (max-width: 1024px) {
    text-align: center;
    margin-bottom: 3rem !important;
  }

  @media (max-width: 450px) {
    font-size: 5rem !important;
  }
`

const Line = styled.img`
  width: 25rem;
  margin-top: -1rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    display: none;
  }
`

const Image = styled.img`
  width: 75rem;
  animation: fadeIn ease 2s;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: -1;
    width: 100%;
    opacity: 0.4;
    animation: none;
  }

  @media (max-width: 600px) {
    top: 25rem;
  }
`

const StyledButton = styled(Button)`
  font-size: 1.6rem !important;
  padding: 0 3rem !important;
  height: 4.5rem !important;
`
