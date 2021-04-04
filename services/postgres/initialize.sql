create table original_transactions
(
	account text,
	datetime timestamp not null,
	dt int,
	asset text not null,
	transactiontype text not null,
	qty decimal not null,
	coinprice decimal,
	fee decimal default 0,
	feecurrency text,
	totalamount decimal,
	amount_per_coin decimal,
	seqid int,
	lotid text,
	transaction_notes text
);

