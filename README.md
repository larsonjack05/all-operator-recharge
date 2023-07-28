# Fetch All Rechrage by operator name and circle
This is an implementation of freecharge scraper that will output all available plans by operator name and circle. Moreover it will also show type of recharge plan.

## Installation
```
cd src
```

```
npm install
```
This might take a while beacause it will install puppeteer and chromium ~250 mb 
## Usage


```
node recharge
```


```
https://localhost:3000/:operator/:circle
```

## Output
```
{"allTypes":["CRICKET PLANS","TRULY UNLIMITED","DATA ADD ON","TOP UP","INTERNATIONAL ROAMING"],
"plans":[{"type":"CRICKET PLANS","price":"₹ 499","validity":"28 Days","data":"3 GB/Day"},{"type":"CRICKET PLANS","price":"₹ 839","validity":"84 Days","data":"2 GB/Day"},
{"type":"CRICKET PLANS","price":"₹ 3359","validity":"365 Days","data":"2.5 GB/Day"},{"type":"TRULY UNLIMITED","price":"₹ 155","validity":"24 Days","data":"1 GB"},...{"type":"INTERNATIONAL ROAMING","price":"₹ 2998","validity":"30 Days","data":"5 GB"}]}
```
