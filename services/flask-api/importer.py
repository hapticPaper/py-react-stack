from sqlalchemy import create_engine

from pathlib import Path
import os
import pandas as pd

DB_TYPE='postgres'
DB_HOST=os.getenv('DB_HOST', 'localhost')
DB_PORT=os.getenv('DB_PORT', 5432)
DB_DB=os.getenv('DB_DB', 'taxtime')
DB_USER=os.getenv('DB_USER', 'ian')
DB_PASS=os.getenv('DB_PASS', '!QAZ2wsx')

DB_STRING=f"{DB_TYPE}://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_DB}"


db = create_engine(DB_STRING)

pgtime = db.execute("SET TIMEZONE='America/New_York'; SELECT NOW();").fetchall()[0]
print(pgtime)

COINS = ['BNB', 'ETH', 'BTC', 'XRP', 'LTC', 'LSK', 'USDT', 'IOTA', 'VEN', 'TRX', 'ADA', 'QTUM', 'XLM']

"""
Gemini importer:
Date	Time (UTC)	Type	Symbol	Specification	Liquidity Indicator	Trading Fee Rate (bps)	USD Amount USD	Fee (USD) USD	USD Balance USD	BTC Amount BTC	Fee (BTC) BTC	BTC Balance BTC	ETH Amount ETH	Fee (ETH) ETH	ETH Balance ETH	Trade ID	Order ID	Order Date	Order Time	Client Order ID	API Session	Tx Hash	Deposit Destination	Deposit Tx Output	Withdrawal Destination	Withdrawal Tx Output	
12/28/2017	16:35.6	Credit	USD	Deposit (Instant ACH Transfer)			$500.00 	$0.00 	$500.00 			0.0 BTC 			0.0 ETH 												
12/28/2017	09:25.4	Buy	BTCUSD	Limit	Maker	25	($498.75)	($1.25)	$0.00 	0.03562499 BTC 		0.03562499 BTC 			0.0 ETH 	2572266759	2571869611	12/28/2017	21:57.7								
12/28/2017	59:46.1	Credit	USD	Deposit (Instant ACH Transfer)			$500.00 	$0.00 	$500.00 			0.03562499 BTC 			0.0 ETH 												

"""

def parsePair(pair):
    if pair[-1]=='T':
        #USDT
        return (pair[:-4], 'USDT')
    else:
        return (pair[:-3], pair[len(pair)-3:])


def parseAmount(amount):
    if amount[-1] in ['T','A','M', 'C', 'O']:
        #USDT #IOTA, #QTUM #USDC
        if amount[len(amount)-4:] in ['USDT','IOTA','QTUM', 'USDC', 'VTHO']:
            return (float(amount[:-4].replace(",","")), amount[len(amount)-4:])
        
  
    return  (float(amount[:-3].replace(",","")), amount[len(amount)-3:])

geminiCsvFields = "Date	Time (UTC)	Type	Symbol	Specification	Liquidity Indicator	Trading Fee Rate (bps)	USD Amount USD	Fee (USD) USD	USD Balance USD	BTC Amount BTC	Fee (BTC) BTC	BTC Balance BTC	ETH Amount ETH	Fee (ETH) ETH	ETH Balance ETH	Trade ID	Order ID	Order Date	Order Time	Client Order ID	API Session	Tx Hash	Deposit Destination	Deposit Tx Output	Withdrawal Destination	Withdrawal Tx Output".split("\t")


GEM_FILE = os.path.join(Path(__file__).parents[2],"volumes","raw_data","gemini_history.csv")
BFILE  = os.path.join(Path(__file__).parents[2],"volumes","raw_data","binance2020.csv")
print(BFILE)

bdata = pd.read_csv(BFILE).to_dict(orient='record')
exportData = []

for record in bdata:
    if record['Side']=='SELL':
        recAmount, recCoin = parseAmount(record['Amount'])
        sentAmount, sentCoin = parseAmount(record['Executed'])
    else: 
        recAmount, recCoin = parseAmount(record['Executed'])
        sentAmount, sentCoin = parseAmount(record['Amount'])
    feeAmount, feeCoin = parseAmount(record['Fee'])
    
    newRecord = {
        'Date':record['Date(UTC)'],
        'Received Quantity': recAmount,
        'Received Currency': recCoin,
        'Sent Quantity': sentAmount,
        'Sent Currency': sentCoin,
        'Fee Amount': feeAmount,
        'Fee Currency': feeCoin
    }
    exportData.append(newRecord)
    print(newRecord)



pd.DataFrame(exportData).to_csv('binanceExport2020.csv', header=True, index=False)

with open(GEM_FILE, 'r', encoding='utf8') as gf:
    data = gf.read().split("\n")

print(f"header: {data[0]}")