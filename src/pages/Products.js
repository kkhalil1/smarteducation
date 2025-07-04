import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Row, Col, Spin } from 'antd'

import { setProducts } from '../state/actions/products'
import { generateProducts } from '../data/generateProducts'
import ProductCard from '../components/Products/ProductCard'

const CHUNK_SIZE = 18

const Products = ({ products, setProducts }) => {
  const [visibleProducts, setVisibleProducts] = useState([])
  const history = useHistory()

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts()
      setProducts(fetchedProducts)
  
      const visibleCount = parseInt(sessionStorage.getItem('visibleProductsCount'), 10)
      const shouldRestore = sessionStorage.getItem('fromProductsPage') === 'true'
  
      const count = !isNaN(visibleCount) && shouldRestore
        ? visibleCount
        : CHUNK_SIZE
  
      setVisibleProducts(fetchedProducts.slice(0, count))
    }
  
    loadProducts()
  }, [setProducts])
  

  const fetchProducts = async () => {
    const data = generateProducts()
    return data
  }

  const fetchMoreProducts = useCallback(() => {
    const nextProducts = products.slice(
      visibleProducts.length,
      visibleProducts.length + CHUNK_SIZE
    )
    setVisibleProducts((prev) => [...prev, ...nextProducts])
  }, [products, visibleProducts])

  const handleProductClick = (id) => {
    sessionStorage.setItem('productsScrollY', window.scrollY)
    sessionStorage.setItem('visibleProductsCount', visibleProducts.length)
    sessionStorage.setItem('fromProductsPage', 'true')
    history.push(`/product/${id}`)
  }

  useEffect(() => {
    const shouldRestore = sessionStorage.getItem('fromProductsPage') === 'true'
    const scrollY = parseInt(sessionStorage.getItem('productsScrollY'), 10)
  
    if (
      shouldRestore &&
      !isNaN(scrollY) &&
      visibleProducts.length >= parseInt(sessionStorage.getItem('visibleProductsCount'), 10)
    ) {
      window.scrollTo({ top: scrollY, behavior: 'auto' })
      sessionStorage.removeItem('fromProductsPage')
      sessionStorage.removeItem('productsScrollY')
      sessionStorage.removeItem('visibleProductsCount')
    }
  }, [visibleProducts])

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={visibleProducts.length}
        next={fetchMoreProducts}
        hasMore={visibleProducts.length < products.length}
        loader={
          <LoaderWrapper>
            <Spin size="large" />
          </LoaderWrapper>
        }
      >
        <StyledRow gutter={[32, 32]} justify="start">
          {visibleProducts.map((product) => (
            <StyledCol
              key={uuidv4()}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
            >
              <CardWrapper>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  onClick={handleProductClick}
                />
              </CardWrapper>
            </StyledCol>
          ))}
        </StyledRow>
      </InfiniteScroll>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: auto;
`

const LoaderWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`

const StyledRow = styled(Row)`
  /* you can add custom styles here if needed */
`

const StyledCol = styled(Col)`
  display: flex !important;
  justify-content: center !important;
`

const CardWrapper = styled.div`
  width: 100%;
`

const mapStateToProps = (state) => ({
  products: state.products,
})

const mapDispatchToProps = {
  setProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
