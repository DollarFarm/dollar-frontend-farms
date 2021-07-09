import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, Card, CardBody, CardFooter, Flex,Text } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Countdown, { zeroPad } from 'react-countdown'
import Page from 'components/layout/Page'
import { usePresaleData } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchUserTokensUnclaimedDataAsync, fetchTokensLeftDataAsync, fetchUserPresaleAllowanceDataAsync, fetchUserBalanceDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import UnlockWalletCard from './components/UnlockWalletCard'
import BuyCard from './components/BuyCard'
import styles from './styles/presale.module.css'

export interface PresaleProps {
    tokenMode?: boolean
}

const Header = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  padding-top: 20px;
  text-align: center;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: auto;
  }
  
`

const PresaleCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const CountdownText = styled.span`
  font-size: 12px;
  color: #fff;
  background: ${(props) => props.theme.card.background};
  border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-text: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: auto;
    margin-bottom: 32px;
  }
`
const Promotion = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 10px;
  padding-top: 2px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
  padding-top: 10px;
  height: 400px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/egg/ifo.jpg');
    background-position: center;
    align-items: center;
    display: flex;  
    flex-direction: column;
    padding-top: 2px;
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-top: 10px;
  }
`
const Headings = styled(Heading)`
  color: #ffffff;
  font-size: 80px;
  align-items: center;
  text-align: center;
`
const Texts = styled(Text)`
  align-items: center;
  text-align: center;
`       

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
`
const StyledCardPic = styled(Card)`
margin-left: auto;
margin-right: auto;
background-image: url('/images/egg/ifo.jpg');
background-position: center;
background-size: contain;
background-repeat: no-repeat;
border-radius: 8px;
`

const Block = styled.div`
margin-bottom: 32px;
background-color: ${(props) => props.theme.card.background};
color: #0f0e2e;
`
const Hero = styled.div`
  align-items: center;
  background-image: url('/images/egg/buyback.gif');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/egg/buyback.gif');
    background-position: center center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
const Presale: React.FC = () => {
    const { path } = useRouteMatch()
    const TranslateString = useI18n()
    const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
    const presale = usePresaleData()

    const dispatch = useDispatch()
    const { slowRefresh } = useRefresh()
    useEffect(() => {
        if (account) {
            dispatch(fetchUserTokensUnclaimedDataAsync(account))
            dispatch(fetchUserPresaleAllowanceDataAsync(account))
            dispatch(fetchUserBalanceDataAsync(account))
        }
        dispatch(fetchTokensLeftDataAsync())
    }, [account, dispatch, slowRefresh])

    const [countdownDate, setCountdownDate] = useState(1624892400000)

    const [countdownEnd, setCountdownEnd] = useState(1625281200000)

    const CountdownTimeEnd = ({ days, hours, minutes, seconds, completed }) => {
        return (
            <CountdownText>
                <Heading fontSize="40px" mb="15px" >Closing of First Buyback Protocol</Heading>
                <span style={{ fontSize: '30px', paddingTop: '10px', paddingBottom: '5px', color: '#31db9a', fontWeight: 800 }}> {zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}</span>
                <span style={{fontSize: '20px', paddingTop: '10px', paddingBottom: '5px',}}>Hours : Minutes : Seconds</span>
            </CountdownText>
        )
    }

    return (
        <Page>
        <Hero />

            
            <StyledCard >
            <CardBody>
            
            <Heading size="xl" mb="18px">{TranslateString(999, 'DollarFarm Buyback Protocol')}</Heading >

            <Text mb={3}>
              Buyback Protocol. Reassurance of Token Value
              <br />
             
            </Text>
            <Text mb={3} color="#31db9a">
              How does DollarFarm Buyback Protocol instill Confidence in Presale Holders and Farmers?
            </Text>
            <Text mb={3}>
              Experienced Presale launches that always dump on listing? Causing Panic sells and dumping at a lost?
            </Text>
            <Text mb={3}>
              With DollarFarm Buyback Protocol, we can heavily mitigate that by providing instrinsic value to the Tokens by buying back from you at a rate. 
              (Presale Rate for Now but will be subjected to changes)
            </Text>
            <Text mb={3} color="#31db9a">
              How does the Buyback Protocol Works? 
            </Text>
            <Text mb={3}>
              1. Buyback are scheduled in period of 24hours.
            </Text>
            <Text mb={3} >
              2. Worried that $DOLLAR will go down in value? Lock your $DOLLARS with us and we will buyback from you at a specified exchange rate
            </Text>
            <Text mb={3}>
              3. $DOLLARS Locked in our Buyback Protocol cannot be withdrawn. 
            </Text>
            <Text mb={3}>
              4. Participants will be able to claim their BUSD at the end of each Buyback Period
            </Text>

          
          </CardBody>
          </StyledCard>

          <StyledCard style={{ marginTop: "30px"}}  >
            <CardBody>
          

           
            <Countdown date={countdownEnd} zeroPadTime={2} renderer={CountdownTimeEnd} />
            
          
          
          </CardBody>
          </StyledCard>


            <div style={{ marginTop: '32px' }}>
                <Flex className={styles.cardContainer} justifyContent="space-between">
                    <StyledCard className={styles.card}>
                        <CardBody>
                        <Heading size="xl" mb="18px" >Buyback Stats: Round 1</Heading>
                        <Row>
                            <Text fontSize="14px" >{TranslateString(0, 'Buyback Amount Allocated')}</Text>
                            <Text fontSize="14px" >$30,000</Text>
                        </Row>
                        <Row>
                            <Text fontSize="14px" >{TranslateString(0, 'Number of $DOLLARS Allocated')}</Text>
                            <Text fontSize="14px" >3000 $DOLLARS</Text>
                        </Row>
                        <Row>
                            <Text fontSize="14px" >{TranslateString(0, 'Buyback Price per $DOLLARS')}</Text>
                            <Text fontSize="14px" >$10 </Text>
                        </Row>
                        <Row>
                            <Text fontSize="14px" >{TranslateString(0, 'Total $DOLLARS Locked')}</Text>
                            <Text fontSize="14px" >${(500000- getBalanceNumber(presale.tokensLeft)).toPrecision(6)} </Text>
                        </Row>
                        <Row>
                            <Text fontSize="14px" >{TranslateString(0, '$DOLLARS Left for Participation')}</Text>
                            <Text fontSize="14px" >${getBalanceNumber(presale.tokensLeft).toPrecision(6)} </Text>
                        </Row>
                        <BuyCard account={account} ethereum={ethereum} allowance={presale.userAllowance} busdBalance={presale.busdBalance} tokensUnclaimed={presale.tokensUnclaimed} tokenBalance={presale.cakeBalance} tokensLeft={presale.tokensLeft} />
                        </CardBody>
                    </StyledCard>

                    <StyledCard className={styles.card}>
                        <CardBody>
                        <Heading size="xl" mb="18px" >Your Participation Stats</Heading>
                        {!account ? <UnlockButton mt="8px" fullWidth /> :
                            <div className={styles.flex}>
                                <div className={styles.item}>$DOLLARS LOCKED FOR THIS ROUND: <span className={styles.colored}>{getBalanceNumber(presale.tokensUnclaimed)}</span></div>
                                <div className={styles.item}>$BUSD WAITING TO BE CLAIMED: <span className={styles.colored}>{getBalanceNumber(presale.cakeBalance)}</span></div>
                            </div>
                        }
                      
                        </CardBody>
                       
                    </StyledCard>
                    
            </Flex>


            <Flex className={styles.cardContainer} justifyContent="space-between">



          <StyledCardPic className={styles.card} style={{ marginTop: "1px"}}>
                {/* <CardBody>


                </CardBody>     */}
        </StyledCardPic>
        </Flex>
                {/* <BuyCard account={account} ethereum={ethereum} allowance={presale.userAllowance} busdBalance={presale.busdBalance} tokensUnclaimed={presale.tokensUnclaimed} tokenBalance={presale.cakeBalance} tokensLeft={presale.tokensLeft} /> */}
            </div>
        </Page>
    )
}

export default Presale
