import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Layout, Badge, Button, Typography } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { openCart } from '../state/actions'
import routes from '../constants/routes.json'

const { Header } = Layout
const { Title } = Typography

const AppHeader = ({ cart, openCart }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sumQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <StyledHeader scrolled={scrolled}>
      <StyledLink to={routes.HOME}>
        <StyledTitle level={scrolled ? 3 : 1} scrolled={scrolled}>
          SmartEducation
        </StyledTitle>
      </StyledLink>

      <Nav>
        <StyledLink to={routes.HOME}>Home</StyledLink>
        <StyledLink to={routes.PRODUCTS}>Products</StyledLink>

        <Badge count={sumQuantity()} offset={[0, 6]}>
          <CartButton
            shape="circle"
            icon={<ShoppingCartOutlined />}
            onClick={openCart}
          />
        </Badge>
      </Nav>
    </StyledHeader>
  )
}

const StyledHeader = styled(({ scrolled, ...rest }) => <Header {...rest} />)`
  background-color: #001529;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ scrolled }) => (scrolled ? '0 4rem' : '4rem')};
  transition: all 0.3s ease;
`

const StyledTitle = styled(({ scrolled, ...rest }) => <Title {...rest} />)`
  color: #1890ff !important;
  margin: 0 !important;
  transition: all 0.3s ease;
  font-size: ${({ scrolled }) => (scrolled ? '1.5rem' : '2.5rem')} !important;
`


const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 3rem;
`

const StyledLink = styled(Link)`
  color: #fff;
  font-size: 1.6rem;
  text-decoration: none;
  transition: transform 0.15s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

const CartButton = styled(Button)`
  /* You can add button-specific styles here if needed */
`

const mapStateToProps = (state) => ({
  cart: state.cart,
})

export default connect(mapStateToProps, { openCart })(AppHeader)
