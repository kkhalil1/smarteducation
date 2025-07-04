import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Divider,
  List,
  Space,
  message,
} from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { addToCart, removeFromCart, clearCart } from '../state/actions'
import { useHistory } from 'react-router-dom'

const { Title, Text } = Typography
const { Option } = Select

const Checkout = ({ cart, addToCart, removeFromCart, clearCart }) => {
  const [loading, setLoading] = useState(false)
  const [displayedTotal, setDisplayedTotal] = useState(0)
  const displayedTotalRef = useRef(0)
  const animationFrame = useRef(null)
  const formRef = useRef(null)
  const history = useHistory()


  const animateTotal = (from, to) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
  
    const duration = 500
    const startTime = performance.now()
  
    const step = (now) => {
      const elapsed = now - startTime
      if (elapsed >= duration) {
        setDisplayedTotal(to)
        return
      }
      const progress = elapsed / duration
      const current = from + (to - from) * progress
      setDisplayedTotal(current)
      animationFrame.current = requestAnimationFrame(step)
    }
  
    animationFrame.current = requestAnimationFrame(step)
  }
  

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    animateTotal(displayedTotalRef.current, total)
    displayedTotalRef.current = total
  }, [cart])
  

  const onFinish = (values) => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      message.success('Order placed successfully!')
      clearCart() 
      history.push('/') 
    }, 1500)
  }

  const handleAdd = (item) => {
    addToCart(item)
  }

  const handleRemove = (item) => {
    removeFromCart({ ...item, removeAll: false })
  }

  return (
    <PageWrapper>
      <Title level={2} centered>
        Checkout
      </Title>

      <StyledForm
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ paymentMethod: 'credit-card' }}
        ref={formRef}
      >
        {/* Form Items */}
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input placeholder="Khodor Khalil" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="khalil@example.com" />
        </Form.Item>

        <Form.Item
          label="Shipping Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input.TextArea rows={3} placeholder="1234 Main St, City, Country" />
        </Form.Item>

        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: 'Please select payment method' }]}
        >
          <Select>
            <Option value="credit-card">Credit Card</Option>
            <Option value="paypal">PayPal</Option>
            <Option value="cash-on-delivery">Cash on Delivery</Option>
          </Select>
        </Form.Item>

        <Divider />

        <Title level={4}>Order Summary</Title>

        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<ProductImage src={item.image} alt={item.title} />}
                title={item.title}
                description={
                  <Space>
                    <Button
                      icon={<MinusOutlined />}
                      size="small"
                      onClick={() => handleRemove(item)}
                    />
                    <Text>{item.quantity}</Text>
                    <Button
                      icon={<PlusOutlined />}
                      size="small"
                      onClick={() => handleAdd(item)}
                    />
                  </Space>
                }
              />
              <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
            </List.Item>
          )}
        />

        <Divider />

        <TotalContainer>
          <TotalText strong>
            Total: ${displayedTotal.toFixed(2)}
          </TotalText>
        </TotalContainer>

        <Form.Item>
          <PlaceOrderButton
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Place Order
          </PlaceOrderButton>
        </Form.Item>
      </StyledForm>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1rem;
`

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 1.5rem;
  }
`

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`

const TotalContainer = styled.div`
  text-align: right;
  margin-top: 1rem;
`

const TotalText = styled(Text)`
  font-size: 2rem;
  display: inline-block;
  min-width: 120px;
`

const PlaceOrderButton = styled(Button)`
  margin-top: 2rem;
`

const mapStateToProps = (state) => ({
  cart: state.cart,
})

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  clearCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
