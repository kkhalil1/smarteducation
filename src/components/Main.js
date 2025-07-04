import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductsDetails from '../pages/ProductsDetails'
import Checkout from '../pages/Checkout'
import routes from '../constants/routes.json'

const Main = () => (
  <MainWrapper>
    <Switch>
      <Route exact path={routes.EMPTY} component={Home} />
      <Route exact path={routes.HOME} component={Home} />
      <Route exact path={routes.PRODUCTS} component={Products} />
      <Route exact path={routes.PRODUCTS_DETAILS} component={ProductsDetails} />
      <Route exact path={routes.CHECKOUT} component={Checkout} />
    </Switch>
  </MainWrapper>
)

export default Main

const MainWrapper = styled.main`
  max-width: ${({ theme }) => theme.widths.content};
  margin: 0 auto;
  padding: 4rem;
`
