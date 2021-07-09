import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'

interface BuyModalProps {
    max: BigNumber
    tokenName?: string
    onConfirm: (amount: string) => void
    onDismiss?: () => void
    tokensUnclaimed?: BigNumber
    tokenBalance?: BigNumber
    tokensLeft?: BigNumber
}

const BuyModal: React.FC<BuyModalProps> = ({ max, tokenName = "", onConfirm, onDismiss, tokensUnclaimed, tokenBalance, tokensLeft }) => {
    const [val, setVal] = useState('')
    const [pendingTx, setPendingTx] = useState(false)
    const TranslateString = useI18n()
    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(max)
    }, [max])

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setVal(e.currentTarget.value)
        },
        [setVal],
    )

    const handleSelectMax = useCallback(() => {
        setVal(fullBalance)
    }, [fullBalance, setVal])

    const renderErrorMessage = () => {
        let error = null;
        if (parseInt(val)/10 > getBalanceNumber(tokensLeft)) {
            error = "Not enough $DOLLARS left for sale!"
        }
        else if (parseInt(val)/10 + getBalanceNumber(tokenBalance)/10 + getBalanceNumber(tokensUnclaimed) > 2000) {
            error = "You have hit the max cap of 2000 $DOLLARS TOKEN"
        }
        else if (parseInt(val) < 20) {
            error = "Minimum buy is 20 BUSD!"
        }
        return error
    }

    return (
        <Modal title={`${TranslateString(316, 'Buy')} ${tokenName} Tokens`} onDismiss={onDismiss}>
            <div style={{ color: '#fff' }}>{renderErrorMessage()}</div>
            <TokenInput
                value={val}
                onSelectMax={handleSelectMax}
                onChange={handleChange}
                max={fullBalance}
                symbol={tokenName}
            />
            <ModalActions>
                <Button variant="secondary" onClick={onDismiss}>
                    {TranslateString(462, 'Cancel')}
                </Button>
                <Button
                    disabled={parseInt(val)/10 > getBalanceNumber(tokensLeft) || parseInt(val)/10 + getBalanceNumber(tokenBalance)/10 + getBalanceNumber(tokensUnclaimed) > 2000 || parseInt(val) < 20 || pendingTx}
                    onClick={async () => {
                        setPendingTx(true)
                        await onConfirm(val)
                        setPendingTx(false)
                        onDismiss()
                    }}
                >
                    {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
                </Button>
            </ModalActions>
        </Modal>
    )
}

export default BuyModal
