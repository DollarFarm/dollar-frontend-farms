import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Card, CardBody, CardFooter, Flex, Button, Heading, Text} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove, useApprovePresale } from 'hooks/useApprove'
import { getBusdAddress} from 'utils/addressHelpers'
import BuyAction from './BuyAction'
import styles from '../styles/presale.module.css'
import ClaimAction from './ClaimAction'

interface BuyCardProps {
    account?: string
    ethereum?: provider
    allowance?: BigNumber
    busdBalance?: BigNumber
    tokensUnclaimed?: BigNumber
    tokenBalance?: BigNumber
    tokensLeft?: BigNumber
}

const BuyCard: React.FC<BuyCardProps> = ({ account, ethereum, allowance, busdBalance, tokensUnclaimed, tokenBalance, tokensLeft }) => {
    const TranslateString = useI18n()
    const [requestedApproval, setRequestedApproval] = useState(false)

    const isApproved = account && allowance && allowance.isGreaterThan(0)

    const busdContract = useMemo(() => {
        return getContract(ethereum as provider,  getBusdAddress())
    }, [ethereum])

    const { onApprove } = useApprovePresale(busdContract)

    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            await onApprove()
            setRequestedApproval(false)
        } catch (e) {
            console.error(e)
        }
    }, [onApprove])

    const renderApprovalOrBuyButton = () => {
        return isApproved ? (
            <BuyAction busdBalance={busdBalance} tokensUnclaimed={tokensUnclaimed} tokenBalance={tokenBalance} tokensLeft={tokensLeft} />
        ) : (
            <Button mt="8px" fullWidth  onClick={handleApprove}>
                {TranslateString(999, 'Approve Contract')}
            </Button>
        )
    }

    const renderClaimButton = () => {
        return <ClaimAction />
    }

    const StyledCard = styled(Card)`
        margin-left: auto;
        margin-right: auto;
        border-radius: 8px;
    `
  
    const Row = styled.div`
        align-items: center;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        margin-bottom: 8px;
    `

    return (
        <div>
            <Flex className={styles.cardContainer} justifyContent="space-between" style={{ marginTop: '32px' }}>
                <StyledCard className={styles.card}>
                    <CardBody><Heading size="x2" mb="18px" >Lock $DOLLARS Token</Heading>
                    {!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrBuyButton()}</CardBody>
                    {/* <CardFooter></CardFooter> */}
                </StyledCard>
                <StyledCard className={styles.card}>
                    <CardBody>
                    
                    <Heading size="x2" mb="18px" >Claim BUSD after Round</Heading>
                    {!account ? <UnlockButton mt="8px" disabled fullWidth /> : renderClaimButton()}</CardBody>
                    
                </StyledCard>
            </Flex>
        </div>
    )
}

export default BuyCard

// disabled={requestedApproval} 