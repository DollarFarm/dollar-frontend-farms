import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Card, CardHeader, CardBody, Image } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Page from 'components/layout/Page'
import ReferralLink from './components/ReferralLink'
import TotalReferralCount from './components/TotalReferralCount'

const Con = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
`

const Images = styled.img`
  background-image: url('/images/egg/referralHeader.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: absolute;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  width: 100%;
  height: 145px;
`

const StyledCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const Actions = styled.div`
  margin-top: 24px;
`

const StyleHeading = styled(Heading)`
    margin-top: 15px
`

const Referral: React.FC = () => {
    const TranslateString = useI18n()
    const { account } = useWallet()

    return (
        <Page>
            <Con>
                <Images />
                <StyledCard>
                    <CardHeader>
                        <Heading size="md">Invite your Friends and Earn additional 5% of your friends earnings!</Heading>
                    </CardHeader>
                    <CardBody>
                        <Actions>
                            {account ? (
                                <div>
                                    <ReferralLink />
                                    <TotalReferralCount />
                                </div>
                            ) : (
                                <div>
                                    <UnlockButton />
                                    <StyleHeading size="md">Unlock wallet to get your unique referral link</StyleHeading>
                                </div>
                            )}
                        </Actions>
                    </CardBody>
                </StyledCard>
            </Con>
        </Page>
    )
}

export default Referral