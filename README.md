# origintrail_challenge

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Ethereum transactions crawler task

Create an application that will allow a user to view transaction data from the Ethereum blockchain associated with a specific wallet address W that the user inputs, starting with block B. The application should get information on:

    wallets (addresses) and 

    amounts of ETH associated with transactions made to and from the given wallet W and

    show them in a simple human-readable way (ideally, through a web page). 

The application should collect and display ALL transaction data starting from the given block B. 

### Example: 

If a user requests to view transactions associated with the address 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f from block 9000000 to the current block, your application should be able to crawl and visualize all transaction data (addresses that have sent and received tokens from the address 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f , and how much ETH was used for a given transaction) in that period of time.

### For bonus points:

    Given a date in YYYY-MM-DD format, the program should return the exact value of ETH that was available on the given address at YYYY-MM-DD 00:00 UTC time.

    Do the same task above to include tokens amounts (other than ETH)

### Instructions

    Use any technology you would like/are familiar with (language, database)

    Please include instructions on how to run the project together with the code (so our team members can run it in one of our environments)

    A list of officially available ethereum clients can be found here: http://ethdocs.org/en/latest/connecting-to-clients/. Other implementations can be found on the web. Additionally, you can utilize an API from a service such as https://etherscan.io/apis or register an account on infura.io service to access data from the blockchain directly.

    See https://etherscan.io/ for an example of how data can be visualized.