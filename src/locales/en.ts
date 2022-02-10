export default {
  generic: {
    clear: 'Clear',
    cancel: 'Cancel',
    ok: 'OK',
    next: 'Next',
    total: 'Total',
    fee: 'Fee',
    copied: 'Copied',
    back: 'Back',
    skip: 'Skip',
    confirm: 'Confirm',
    error: 'Error',
    success: 'Success',
  },
  ordinals: [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
    '13th',
    '14th',
    '15th',
    '16th',
    '17th',
    '18th',
    '19th',
    '20th',
    '21st',
    '22nd',
    '23rd',
    '24th',
  ],
  placeholder: {
    enterAccountAddress: 'Enter Account Address',
    getAccountData: 'Get Account Data',
    accountBalanceValue: 'Account Balance: {{balance}}',
    fetchMoreActivity: 'Fetch More Activity',
  },
  onboarding: {
    import: '+ Import',
    create: '+ New',
    mainnet: 'Mainnet',
    testnet: 'Testnet',
  },
  accountSetup: {
    createImport: {
      title: 'What would\nyou like to do?',
      helperText:
        'Coming from Helium App? Use the same 12\nwords to import a Wallet.',
      create: 'Create a new Wallet',
      import: 'Import a Wallet',
    },
    passphrase: {
      next: 'I have written these down',
    },
    confirm: {
      title: 'Confirm\nYour Words',
      subtitle: 'Which word below was your <b>{{ordinal}} word?</b>',
      forgot: 'I forgot my words',
    },
    createPin: {
      title: 'Set PIN Code',
      subtitle: 'Let’s secure your account with a PIN Code.',
    },
    confirmPin: {
      title: 'Repeat PIN',
      subtitle: 'Re-enter your PIN',
    },
  },
  accountImport: {
    wordEntry: {
      placeholder: '{{ordinal}} word',
      title:
        "Enter your\naccount's <secondaryText>{{totalWords}} word</secondaryText>\nsecurity key...",
    },
    confirm: {
      title: 'Please Confirm\nSeed Phrase',
      subtitle:
        'Here are the {{totalWords}} words you’ve entered. Tap on any of them if you need to edit.',
      next: 'Submit Seed Phrase',
    },
    complete: {
      title: 'Recovering Account...',
      subtitle: 'This will just take a moment.',
    },
    alert: {
      title: 'Error',
      body: "This seed phrase doesn't correspond to a Helium account",
    },
    restoreChoice: 'Restore {{totalWords}} Word Account',
  },
  accountAssign: {
    AccountNamePlaceholder: 'Account Name',
  },
  auth: {
    title: 'Enter Your PIN',
    error: 'Incorrect PIN',
    enterCurrent: 'Enter your current PIN to continue',
    signOut: 'Sign Out',
    signOutAlert: {
      title: 'Warning!',
      body: 'You are signing out of your account. Do you have your 12 recovery words? If you don’t, you will lose access to:\n\n- your Hotspots\n- your HNT\n- your Wallet',
    },
  },
  accountHeader: {
    timeAgo: 'Updated {{formattedChange}}',
    last24: 'Last 24h',
  },
  accountView: {
    balance: 'Balance',
    send: 'Send',
    payment: 'Payment',
    request: 'Request',
    stake: 'Stake',
    lock: 'Lock',
  },
  accountsScreen: {
    myTransactions: 'My Transactions',
  },
  transactions: {
    pending: 'Pending',
    mining: 'Mining Rewards',
    sent: 'Sent {{ticker}}',
    stakeValidator: 'Stake {{ticker}}',
    unstakeValidator: 'Unstake {{ticker}}',
    transferValidator: 'Transfer Stake',
    burnHNT: 'Burn {{ticker}}',
    received: 'Received {{ticker}}',
    added: 'Hotspot Added to Blockchain',
    location: 'Confirm Location',
    location_v2: 'Update Hotspot',
    transfer: 'Hotspot Transfer',
    transferSell: 'Transfer Hotspot (Sell)',
    transferBuy: 'Transfer Hotspot (Buy)',
  },
  payment: {
    title: 'Send {{ticker}}',
    selectContact: 'Select Contact',
    enterMemo: 'Enter Memo (Optional)',
    memoBytes: '{{used}}/{{total}} Bytes',
    sendButton: 'Swipe to Send {{ticker}}',
    fee: '+{{value}} Fee',
    enterAmount: 'Enter {{ticker}} Amount',
    max: 'Max',
    submitError:
      'There was an error submitting this transaction. Please try again.\n\n{{details}}',
    submitSuccess: 'Your payment transaction has been submitted\n\n{{hash}}',
  },
  hntKeyboard: {
    enterAmount: 'Enter {{ticker}} Amount',
    fee: '+{{value}} Fee ⓘ',
    validFor: 'valid for {{time}}',
    hntAvailable: '{{amount}} Available',
  },
  wifi: {
    howMuch: 'How much data',
    data: 'Data',
    minutes: 'Minutes',
    confirmPayment: 'Confirm Payment',
    done: 'Done',
    change: 'Change',
    remainingBalance: 'Remaining\nBalance',
    insufficientFunds: 'Insufficient Funds',
    macFailed: 'Failed to enable mac',
    authFailed: 'Failed to authorize',
    burnFailed: 'Failed to burn',
  },
  addressBook: {
    title: 'Address Book',
    addNext: 'Add New...',
    searchContacts: 'Search Contacts...',
  },
  addNewContact: {
    title: 'Add New Contact',
    addContact: 'Add Contact',
    address: {
      title: 'Enter Helium Address',
      placeholder: 'e.g. 9h9h9r3hfi04nf0j083...',
    },
    nickname: {
      title: 'Enter Nickname',
      placeholder: 'e.g. Loki Laufeyson',
    },
  },
  settings: {
    title: 'Settings',
    sections: {
      account: {
        title: '{{alias}} Account Settings',
        alias: 'Account Alias',
        revealWords: 'Reveal Words',
        signOut: 'Sign Out',
        signOutAlert: {
          title: 'Sign Out of {{alias}}',
          body: 'You are signing out of your account {{alias}}. Do you have your recovery words? If you don’t, you will lose access to:\n\n- your HNT\n- your Wallet',
        },
      },
      security: {
        title: 'Security Settings',
        enablePin: 'Enable PIN',
        requirePin: 'Require PIN',
        resetPin: 'Reset PIN',
        requirePinForPayments: 'Require PIN for Payments',
        authIntervals: {
          immediately: 'Immediately',
          after_1_min: 'After 1 minute',
          after_5_min: 'After 5 minutes',
          after_15_min: 'After 15 minutes',
          after_1_hr: 'After 1 hour',
          after_4_hr: 'After 4 hours',
        },
      },
      app: {
        title: 'App Settings',
        convertHntToCurrency: 'Convert HNT to Currency',
        language: 'Language',
        currency: 'Currency',
        version: 'App Version',
      },
    },
    revealWords: {
      title: 'Your {{numWords}} Word\nPassword',
      subtitle:
        'It is crucial you write all of these\n{{numWords}} words down, in order.\n\nHelium cannot recover these words.',
      warning: 'Helium cannot recover these words',
      next: 'I have written these down',
    },
  },
}
