import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Card, Typography, Button, message } from 'antd'
import { addToCart } from '../../state/actions/cart'

const { Title, Text } = Typography

const ProductCard = ({ id, title, price, image, category, onClick }) => {
  const dispatch = useDispatch()

  const notify = () => {
    message.success(`"${title}" added to cart!`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    const product = { id, title, price, image, category }
    dispatch(addToCart(product))
    notify()
  }

  return (
    <StyledCard hoverable onClick={() => onClick(id)}>
      <CoverDiv>
        <StyledImage src={image} alt={title} />
      </CoverDiv>

      <ContentDiv>
        <Title level={5} ellipsis>
          {title}
        </Title>
        <Text type="secondary">{category}</Text>
        <Text strong>${price.toFixed(2)}</Text>
      </ContentDiv>

      <ButtonWrapper>
        <StyledButton block type="primary" onClick={handleAddToCart}>
          Add to Cart
        </StyledButton>
      </ButtonWrapper>
    </StyledCard>
  )
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
}

export default ProductCard

const StyledCard = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CoverDiv = styled.div`
  height: 250px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
`

const StyledImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;

  & > h5 {
    margin-bottom: 0;
  }

  & > .ant-typography-secondary {
    font-size: 0.9rem;
  }

  & > .ant-typography-strong {
    color: #1a73e8;
    font-size: 1.1rem;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 16px;
`

const StyledButton = styled(Button)`
  width: 100%;
`
