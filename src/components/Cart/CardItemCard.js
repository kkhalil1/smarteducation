import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Image, Button, Space, Row, Col, Card } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addToCart, removeFromCart } from '../../state/actions'

const { Text } = Typography

const CardItemCard = ({ id, title, price, image, quantity, addToCart, removeFromCart }) => {
  const formatTitle = (title) => (title.length <= 28 ? title : title.substring(0, 28) + '...')
  const sumPrice = () => (price * quantity).toFixed(2)

  const handleAdd = () => {
    addToCart({ id, title, price, image })
  }

  const handleRemove = () => {
    removeFromCart({ id, title, price, image })
  }

  return (
    <StyledCard>
      <Row gutter={16} align="middle">
        <Col xs={6} sm={5}>
          <StyledImage src={image} alt={title} preview={false} />
        </Col>
        <Col xs={18} sm={19}>
          <InfoContainer>
            <StyledTitle strong>{formatTitle(title)}</StyledTitle>
            <StyledTotal type="secondary">Total: ${sumPrice()}</StyledTotal>
            <Space size="middle">
              <StyledButton
                shape="circle"
                icon={<MinusOutlined />}
                onClick={handleRemove}
                size="small"
              />
              <QuantityText>{quantity}</QuantityText>
              <StyledButton
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                size="small"
              />
            </Space>
          </InfoContainer>
        </Col>
      </Row>
    </StyledCard>
  )
}

CardItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
}

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
  padding: 1.2rem;
  background-color: #fafafa;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  background-color: #fff;
  padding: 8px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledTitle = styled(Text)`
  font-size: 1.3rem;
`

const StyledTotal = styled(Text)`
  font-size: 1.1rem;
`

const QuantityText = styled(Text)`
  font-size: 1.1rem;
`

const StyledButton = styled(Button)`
  background-color: #f0f0f0;
`

export default connect(null, mapDispatchToProps)(CardItemCard)
