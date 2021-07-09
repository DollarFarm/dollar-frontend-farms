import React from 'react'
import { Card, CardBody, Heading, Text,  Button, Link } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 20px;
  border-radius: 8px;

`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
  align-text: center;
`

const ActionsButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;

  button {
    width: 100%;
  }

  p {
    margin-top: 10px;
  }

  a {
    display: inline-block;
    width: 100%;

    :hover {
      text-decoration: none;
    }
  }
`

const BuyWrapper = styled.div`
  margin-top: 20px;
`

const ButtonIcon = styled.img`
width: 60px;
height: 34px;
`

const Different = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let eggPerBlock = 0;
  if(farms && farms[0] && farms[0].eggPerBlock){
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(0, 'DollarFarm Buyback Protocol')}
        </Heading>
        <Row>
          <Text fontSize="20px" color="#31db9a">How does the Buyback Protocol Works?</Text>
        </Row>
        <Row>
          <Text fontSize="16px">Native Tokens often take a dump once farming starts, causing panic sells and leaving no incentive to hold nor farm.</Text>
        </Row>        
        <Row>
          <Text fontSize="16px">DollarFarm assures the value of your token by Buying Back from you at a pre-determined Price.</Text>
        </Row>
        <Row>
          <Text fontSize="16px">Locked your $DOLLARS with US and we will buyback from you at a predetermined rate with BUSD.</Text>
        </Row>
              <ActionsButtonWrapper>

      <BuyWrapper style={{ textAlign: 'center' }}>
        <Link external href="/presale">
          <Button variant="primary">
            {TranslateString(0, 'Join our Buyback Protocol')}&nbsp;
            <ButtonIcon src="/images/logo.png" alt="dollars logo" />
          </Button>
        </Link>
      

      </BuyWrapper>
      </ActionsButtonWrapper>
      </CardBody>
    </StyledCakeStats>
  )
}

export default Different
