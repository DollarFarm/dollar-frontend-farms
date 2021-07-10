import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text, Flex, CopyIcon, Button, Link } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const CardImage = styled.img`
  width: 60px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
`

const TokenWrapper = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
  }
`

const TokenAddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TokenAccountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  cursor: pointer;
  padding: 5px;
`

const TokenAccount = styled.div`
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 40%;
  color: #ffffff;
  margin-left: 10px;

  @media only screen and (min-width: 375px) {
    width: 50%;
  }

  @media only screen and (min-width: 425px) {
    width: 60%;
  }

  @media only screen and (min-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 1024px) {
    width: 100%;
  }
`

const StyleButton = styled(Text).attrs({ role: 'button' })`
  position: relative;
  display: flex;
  line-height: unset !important;
`

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'block' : 'none')};
  position: absolute;
  bottom: -29px;
  right: 0;
  left: 0;
  text-align: center;
  background-color: white;
  color: black;
  border-radius: 16px;
  opacity: 0.7;
  padding: 5px;
  width: 45%;

  @media only screen and (min-width: 375px) {
    width: 55%;
  }

  @media only screen and (min-width: 425px) {
    width: 65%;
  }

  @media only screen and (min-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 1024px) {
    width: 60%;
  }
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

const AddMartianIcon = styled.img`
  width: 108px;
  height: auto;
  margin-bottom: 11px;
`

const ButtonIcon = styled.img`
  width: 60px;
  height: 34px;
`
const StyledPresaleCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  background-image: url('/images/egg/presale.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 30% 30%;
  border-radius: 8px;

`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
const Presale = () => {
  const TranslateString = useI18n()
  const tokenAddress = getCakeAddress()
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const [addMartianDisabled, setAddMartianDisabled] = useState(false)

  const handleAddMartian = useCallback(async () => {
    const windowAsAny = window as any
    if (typeof windowAsAny.ethereum === 'undefined' && !windowAsAny.ethereum.isMetaMask) {
      console.error('MetaMask is not installed!')
    }

    setAddMartianDisabled(true)

    const tokenSymbol = 'DOLLARS'
    const tokenDecimals = 18
    const tokenImage = `${process.env.REACT_APP_BASE_URL}/images/egg/9.png`

    try {
      const wasAdded = await windowAsAny.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setAddMartianDisabled(false)
    }
  }, [tokenAddress])

  return (
    <StyledPresaleCard>
      <CardBody>
        <Heading size="xl" mb="24px" style={{ textAlign: 'left' }}>
          {TranslateString(0, 'Presale is Live')}
          
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(0, 'Price Per Token')}</Text>
          <Text fontSize="14px" text-align="right"> $10 BUSD</Text>
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(0, 'Listing Price')}</Text>
          <Text fontSize="14px" text-align="right"> $20 BUSD</Text>
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(0, 'Max Holding Per Wallet')}</Text>
          <Text fontSize="14px" text-align="right"> $20,000 BUSD (2000 $DOLLARS)</Text>
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(0, 'Hard Cap')}</Text>
          <Text fontSize="14px" text-align="right"> $500,000 BUSD</Text>
        </Row>

        <ActionsButtonWrapper>

          <BuyWrapper style={{ textAlign: 'center' }}>
            <Link external href="/presale">
              <Button variant="primary">
                {TranslateString(0, 'Join Our Presale')}&nbsp;
                <ButtonIcon src="/images/logo.png" alt="dollar logo" />
              </Button>
            </Link>
           

          </BuyWrapper>
        </ActionsButtonWrapper>
      </CardBody>
    </StyledPresaleCard>
  )
}

export default Presale
