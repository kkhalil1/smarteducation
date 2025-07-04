import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Typography,
  Button,
  message,
  Card,
  Skeleton,
  Space,
  Breadcrumb,
} from 'antd'
import { HomeOutlined, ShopOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { addToCart } from '../state/actions'

const { Title, Paragraph } = Typography

const ProductsDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const product = useSelector((state) =>
    state.products.find((p) => p.id === parseInt(id))
  )

  const notify = (product) =>
    message.success(`${product.title} added to cart!`)

  if (!product) {
    return (
      <NotFoundWrapper>
        <Title level={2} type="secondary">
          Product not found.
        </Title>
      </NotFoundWrapper>
    )
  }

  return (
    <PageWrapper>
      <StyledBreadcrumb>
        <Breadcrumb.Item>
          <StyledLink to="/">
            <HomeOutlined /> Home
          </StyledLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <StyledLink to="/products">
            <ShopOutlined /> Products
          </StyledLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </StyledBreadcrumb>

      <Row gutter={[32, 32]} align="top">
        <Col xs={24} md={10}>
          <StyledCard
            cover={
              <ProductImage
                alt={product.title}
                src={product.image}
              />
            }
          />
        </Col>

        <Col xs={24} md={14}>
          <Card>
            <Skeleton loading={!product} active>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <BackLink to="/products">← Back to Products</BackLink>

                <Title level={2}>{product.title}</Title>
                <Title level={3} priceColor>
                  ${product.price.toFixed(2)}
                </Title>

                <Description>{product.description}</Description>

                <Row>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => {
                        dispatch(addToCart(product))
                        notify(product)
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              </Space>
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ProductsDetails

const PageWrapper = styled.div`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: auto;
`

const NotFoundWrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
`

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-bottom: 2rem;
  font-size: 1.4rem;
`

const StyledLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StyledCard = styled(Card)`
  img {
    height: 400px;
    object-fit: contain;
    padding: 1rem;
    border-radius: 10px;
    background-color: #fff;
  }
`

const ProductImage = styled.img`
  height: 400px;
  object-fit: contain;
  padding: 1rem;
  border-radius: 10px;
  background-color: #fff;
`

const BackLink = styled(Link)`
  font-size: 1.5rem;
  padding: 0;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 1rem;
`

const Description = styled(Paragraph)`
  font-size: 1.25rem;
  color: #444;
`
