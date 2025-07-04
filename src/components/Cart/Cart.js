import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Typography, Button, Divider, Empty } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { closeCart } from '../../state/actions'
import { CardItemCard } from '.'

const { Title, Text } = Typography

const Cart = ({ cart, isCartOpen, closeCart }) => {
  const history = useHistory()

  const sumTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)

  const handleCheckout = () => {
    closeCart()
    history.push('/checkout')
  }

  const renderCartItems = () =>
    cart.map((item) => (
      <CartItemWrapper key={uuidv4()}>
        <CardItemCard
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          quantity={item.quantity}
        />
      </CartItemWrapper>
    ))

  const isEmpty = cart.length === 0

  return (
    <Drawer
      title={<Title level={3}>Your Shopping Cart</Title>}
      placement="right"
      closable={false}
      onClose={closeCart}
      open={isCartOpen}
      width={480}
      bodyStyle={{ padding: '2rem' }}
    >
      <CartContent>
        {isEmpty ? (
          <Empty description="Your cart is empty" imageStyle={{ height: 160 }} />
        ) : (
          renderCartItems()
        )}
      </CartContent>

      {!isEmpty && (
        <>
          <Divider />
          <TotalText strong>Total: ${sumTotal()}</TotalText>
          <CartActions>
            <StyledButton type="primary" size="large" block onClick={handleCheckout}>
              Checkout
            </StyledButton>
            <StyledButton type="default" danger size="large" block onClick={closeCart}>
              Close
            </StyledButton>
          </CartActions>
        </>
      )}
    </Drawer>
  )
}

const CartContent = styled.div`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`

const CartItemWrapper = styled.div`
  margin-bottom: 2rem;
`

const CartActions = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledButton = styled(Button)`
  font-size: 1.4rem;
`

const TotalText = styled(Text)`
  font-size: 1.8rem;
`

const mapStateToProps = (state) => ({
  cart: state.cart,
  isCartOpen: state.isCartOpen,
})

const mapDispatchToProps = {
  closeCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
