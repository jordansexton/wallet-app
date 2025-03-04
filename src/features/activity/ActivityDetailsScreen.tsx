import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useCallback, useMemo, useState } from 'react'
import { Linking, ScrollView } from 'react-native'
import { ConfirmedSignatureInfo } from '@solana/web3.js'
import { useTranslation } from 'react-i18next'
import CheckmarkFilled from '@assets/images/checkmarkFill.svg'
import Error from '@assets/images/error.svg'
import { ReAnimatedBox } from '@components/AnimatedBox'
import ListItem from '@components/ListItem'
import ImageBox from '@components/ImageBox'
import BackScreen from '@components/BackScreen'
import Box from '@components/Box'
import Text from '@components/Text'
import ButtonPressable from '@components/ButtonPressable'
import { useColors } from '@theme/themeHooks'
import BlurActionSheet from '@components/BlurActionSheet'
import globalStyles from '@theme/globalStyles'
import { DelayedFadeIn } from '@components/FadeInOut'
import useCopyText from '@hooks/useCopyText'
import useHaptic from '@hooks/useHaptic'
import CircleLoader from '@components/CircleLoader'
import { useCreateExplorerUrl } from '../../constants/urls'
import { ActivityStackParamList } from './activityTypes'
import { ellipsizeAddress, solAddressIsValid } from '../../utils/accountUtils'
import AddressActivityItem from './AddressActivityItem'
import { EnrichedTransaction } from '../../types/solana'

type Route = RouteProp<ActivityStackParamList, 'ActivityDetailsScreen'>

const ActivityDetailsScreen = () => {
  const route = useRoute<Route>()
  const colors = useColors()
  const { t, i18n } = useTranslation()
  const createExplorerUrl = useCreateExplorerUrl()
  const copyText = useCopyText()
  const { triggerImpact } = useHaptic()

  const { transaction } = route.params

  const [optionsOpen, setOptionsOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string>('')

  const dateLabel = useMemo(() => {
    const enrichedTx = transaction as EnrichedTransaction
    const confirmedSig = transaction as ConfirmedSignatureInfo

    const date = new Date()

    if (enrichedTx.timestamp) {
      date.setTime(enrichedTx.timestamp * 1000)
    }

    if (confirmedSig.blockTime) {
      date.setTime(confirmedSig.blockTime * 1000)
    }

    // Format date in DD/MMMM/YYYY format
    const formattedString = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const time = `${date.getHours()}:${
      date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
    }`

    return `${formattedString} | ${time}`
  }, [transaction])

  const activityImage = useMemo(() => {
    const enrichedTx = transaction as EnrichedTransaction
    const confirmedSig = transaction as ConfirmedSignatureInfo

    if (confirmedSig.err) {
      return <Error color={colors.error} width={150} height={150} />
    }

    const { tokenTransfers, events } = enrichedTx

    if (events?.compressed?.length) {
      const nft = events.compressed[0]

      if (!nft?.metadata.image) {
        return (
          <Box
            backgroundColor="surface"
            borderRadius="xl"
            width={250}
            height={250}
            justifyContent="center"
            alignItems="center"
          >
            <CircleLoader loaderSize={80} />
          </Box>
        )
      }

      return (
        <ImageBox
          source={{
            uri: nft?.metadata?.image || '',
            cache: 'force-cache',
          }}
          width={250}
          height={250}
          borderRadius="xxl"
        />
      )
    }

    if (
      tokenTransfers?.length &&
      tokenTransfers[0].tokenMetadata?.json?.image
    ) {
      return (
        <ImageBox
          source={{
            uri: tokenTransfers[0].tokenMetadata.json.image,
            cache: 'force-cache',
          }}
          width={250}
          height={250}
          borderRadius="xxl"
        />
      )
    }

    return (
      <CheckmarkFilled color={colors.greenBright500} width={150} height={150} />
    )
  }, [colors, transaction])

  const onAddressItemPress = useCallback(
    (address: string) => () => {
      setSelectedAddress(address)
      setOptionsOpen(true)
    },
    [],
  )

  const AccountAddressListItems = useMemo(() => {
    const enrichedTx = transaction as EnrichedTransaction
    const confirmedSig = transaction as ConfirmedSignatureInfo

    if (confirmedSig.err || !enrichedTx.type) {
      return null
    }

    const firstTokenTransfer = enrichedTx.tokenTransfers?.length
      ? enrichedTx.tokenTransfers[0]
      : null
    const firstNativeTransfer = enrichedTx.nativeTransfers?.length
      ? enrichedTx.nativeTransfers[0]
      : null

    const fromAccount =
      firstTokenTransfer?.fromUserAccount ||
      firstNativeTransfer?.fromUserAccount
    const toAccount =
      firstTokenTransfer?.toUserAccount || firstNativeTransfer?.toUserAccount

    if (!fromAccount && !toAccount) {
      return null
    }

    return (
      <Box marginTop="l" flex={1} width="100%" justifyContent="center">
        {fromAccount && (
          <AddressActivityItem
            accountAddress={fromAccount}
            marginHorizontal="l"
            marginBottom="xs"
            borderRadius="xl"
            showBubbleArrow
            onMenuPress={onAddressItemPress(fromAccount)}
          />
        )}
        {toAccount && (
          <AddressActivityItem
            accountAddress={toAccount}
            marginHorizontal="l"
            borderRadius="xl"
            onMenuPress={onAddressItemPress(toAccount)}
          />
        )}
      </Box>
    )
  }, [onAddressItemPress, transaction])

  const title = useMemo(() => {
    const enrichedTx = transaction as EnrichedTransaction
    const confirmedSig = transaction as ConfirmedSignatureInfo

    if (confirmedSig.err) {
      return t('activityScreen.transactionFailed')
    }

    const txnKey = `activityScreen.enrichedTransactionTypes.${enrichedTx.type}`
    return i18n.exists(txnKey)
      ? t(`activityScreen.enrichedTransactionTypes.${enrichedTx.type}`)
      : t('activityScreen.enrichedTransactionTypes.UNKNOWN')
  }, [i18n, t, transaction])

  const description = useMemo(() => {
    const enrichedTx = transaction as EnrichedTransaction
    const confirmedSig = transaction as ConfirmedSignatureInfo

    if (enrichedTx.events?.compressed?.length) {
      const { symbol } = enrichedTx.events.compressed[0].metadata
      const count = enrichedTx.events.compressed.length
      if (symbol) {
        return t('activityScreen.compressedNFTDescription', {
          symbol: symbol.toLowerCase(),
          count,
        })
      }
    }

    // compressedNFTDescription
    // Custom description that ellipsizes the address
    if (enrichedTx.description) {
      const customDescription = enrichedTx.description
        ?.split(' ')
        .map((word) => {
          // Remove addresses
          if (solAddressIsValid(word)) {
            return ''
          }
          return word
        })
        .join(' ')
        .trim()

      // capitalize first letter of description
      return `${customDescription
        .charAt(0)
        .toUpperCase()}${customDescription.slice(1)}`
    }

    if (confirmedSig.err) {
      return t('generic.error')
    }

    return t('activityScreen.transactionSuccessful')
  }, [t, transaction])

  const handleOpenExplorer = useCallback(async () => {
    const url = createExplorerUrl('txn', transaction.signature)
    await Linking.openURL(url)
  }, [createExplorerUrl, transaction.signature])

  const toggleActionSheet = useCallback(
    (open) => () => {
      setOptionsOpen(open)
    },
    [],
  )

  const handleCopyAddress = useCallback(() => {
    if (!selectedAddress) return
    triggerImpact('light')
    copyText({
      message: ellipsizeAddress(selectedAddress),
      copyText: selectedAddress,
    })
    setOptionsOpen(false)
  }, [copyText, selectedAddress, triggerImpact])

  const accountOptions = useCallback(
    () => (
      <>
        <ListItem
          key="copyAddress"
          title={t('settings.sections.account.copyAddress')}
          onPress={handleCopyAddress}
          selected={false}
          hasPressedState={false}
        />
      </>
    ),
    [handleCopyAddress, t],
  )

  return (
    <ReAnimatedBox entering={DelayedFadeIn} style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <BackScreen
          title={t('activityScreen.activityDetails')}
          flex={1}
          headerTopMargin="m"
        >
          <Box alignItems="center" justifyContent="center" flex={1}>
            <Box justifyContent="center" alignItems="center" marginTop="m">
              {activityImage}
              <Text
                variant="h1Medium"
                marginTop="m"
                marginBottom="s"
                textAlign="center"
              >
                {title}
              </Text>
              <Text
                variant="subtitle3"
                color="offWhite"
                marginBottom="s"
                textAlign="center"
              >
                {description}
              </Text>
              <Text variant="body3" textAlign="center" color="secondaryText">
                {dateLabel}
              </Text>
            </Box>
            {AccountAddressListItems}
            <Box width="100%">
              <ButtonPressable
                marginTop="xl"
                marginHorizontal="m"
                borderRadius="round"
                backgroundColor="white"
                titleColorDisabled="grey600"
                backgroundColorDisabled="white"
                backgroundColorDisabledOpacity={0.1}
                title={t('activityScreen.viewOnExplorer')}
                titleColor="black"
                onPress={handleOpenExplorer}
              />
            </Box>
          </Box>
          <BlurActionSheet
            title={t('collectablesScreen.transferActions')}
            open={optionsOpen}
            onClose={toggleActionSheet(false)}
          >
            {accountOptions()}
          </BlurActionSheet>
        </BackScreen>
      </ScrollView>
    </ReAnimatedBox>
  )
}

export default ActivityDetailsScreen
