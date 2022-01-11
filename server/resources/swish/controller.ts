
export {}
import {Request, Response} from "express";
import path from "path";
import fs from 'fs';
import request from 'request';


const ROOT_DIR = path.resolve(__dirname, '../../../');

const testConfig = {	
	payeeAlias: "1231181189",
	host: "https://mss.cpc.getswish.net/swish-cpcapi",
	qrHost: "https://mpc.getswish.net/qrg-swish",
	cert: path.resolve(ROOT_DIR, 'ssl/Swish_Merchant_TestCertificate_1234679304.pem'),
	key: path.resolve(ROOT_DIR, 'ssl/Swish_Merchant_TestCertificate_1234679304.key'),
	ca: path.resolve(ROOT_DIR, 'ssl/Swish_TLS_RootCA.pem'),
	passphrase: "swish"
}

const prodConfig = {
	payeeAlias: "YOUR_PAYEE_ALIAS",
	host: "https://cpc.getswish.net/swish-cpcapi",
	qrHost: "https://mpc.getswish.net/qrg-swish",
	cert: path.resolve(__dirname, 'ssl/prod.pem'),
	key: path.resolve(__dirname, 'ssl/prod.key'),
	passphrase: null
}

const config = testConfig

exports.paymentRequests = async(req: Request, res: Response) => {

	const json = {
		payeePaymentReference: "0123456789",
		callbackUrl: "https://webhook.site/a8f9b5c2-f2da-4bb8-8181-fcb84a6659ea",
		payeeAlias: config.payeeAlias,
		payerAlias: req.body.payerAlias,
		amount: req.body.amount,
		currency: "SEK",
		message: req.body.message
	}

  
	const options: any = requestOptions('POST', `${config.host}/api/v1/paymentrequests`, json)

	request(options, (error: any, response: { statusCode: any; headers: any; body?: any; }, body: any) => { 
		logResult(error, response)
		if (!response) {
			res.status(500).send(error)
			return
		}
		res.status(response.statusCode)
		if (response.statusCode == 201) { 
			const location = response.headers['location']
			const token = response.headers['paymentrequesttoken']
			const opt: any = requestOptions('GET', location)
			request(opt, (err: any, resp: { body: { [x: string]: any; }; }, bod: any) => {
				logResult(err, resp)
				if (!response) {
					res.status(500).send(error)
					return
				}
				const id = resp.body['id']
				res.json({
					url: location,
					token: token,
					id: id,
          body: resp.body,
          paymentType: "swish"
				})
			})
		} else {
			res.send(body)
			return
		} 	
	})
}

// Get Payment Request
exports.paymentRequestsId = async (req: Request, res: Response) => {

	const options: any = requestOptions('GET', `${config.host}/api/v1/paymentrequests/${req.params.requestId}`)

	request(options, (error: any, response: { statusCode: number; body: { [x: string]: any; }; }, body: any) => {

		logResult(error, response)

		if (!response) {
			res.status(500).send(error)
			return
		}

		res.status(response.statusCode)
		if (response.statusCode == 200) {
			res.json({
				id: response.body['id'],
				paymentReference: response.body['paymentReference'] || "",
				status: response.body['status']
			})

		} else { 
			res.send(body)
			return
		}
	})
}

// Create Refund
exports.refunds = async (req: Request, res: Response) => {

	const json = {
		payeePaymentReference: "0123456789",
		originalPaymentReference: req.body.originalPaymentReference,
		callbackUrl: "https://webhook.site/a8f9b5c2-f2da-4bb8-8181-fcb84a6659ea",
		payerAlias: config.payeeAlias,
		amount: req.body.amount,
		currency: "SEK",
		message: req.body.message
	}

	const options: any = requestOptions('POST', `${config.host}/api/v1/refunds`, json)

	request(options, (error: any, response: { statusCode: number; headers: { [x: string]: any; }; }, body: any) => {

		logResult(error, response)

		if (!response) {
			res.status(500).send(error)
			return
		}
		
		res.status(response.statusCode)
		if (response.statusCode == 201) { 

			const location = response.headers['location']
			const token = response.headers['paymentrequesttoken']
			const opt: any = requestOptions('GET', location)

			request(opt, (err: any, resp: { body: { [x: string]: any; }; }, bod: any) => {
				logResult(err, resp)

				const id = resp.body['id']
				const originalPaymentReference = resp.body['originalPaymentReference']
				const status = resp.body['status']

				res.json({
					url: location,
					token: token,
					originalPaymentReference: originalPaymentReference,
					status: status,
					id: id
				})
			})

		} else { 
			res.send(body)
			return
		} 	
	})
}

// Get Refund
exports.refundsId = async (req: Request, res: Response) => {

	const options: any = requestOptions('GET', `${config.host}/api/v1/refunds/${req.params.refundId}`)

	console.log(req)

	request(options, (error: any, response: { statusCode: number; body: { [x: string]: any; }; }, body: any) => {

		logResult(error, response)

		if (!response) {
			res.status(500).send(error)
			return
		}

		res.status(response.statusCode)
		if (response.statusCode == 200) {

			res.json({
				id: response.body['id'],
				originalPaymentReference: response.body['originalPaymentReference'] || "",
				status: response.body['status']
			})

		} else { 
			res.send(body)
			return
		}
	})
}

// Get QR Code
/* app.get('/qr/:token', function (req, res) {

	const token = req.params.token

	const json = {
		token: token,
		size: "600",
		format: "png",
		border: "0"
	}

	const options = requestOptions('POST', `${config.qrHost}/api/v1/commerce`, json)

	request(options, (error, response, body) => {

		logResult(error, response)

		if (!response) {
			res.status(500).send(error)
			return
		}
		
	}).pipe(res)
}) */

function requestOptions(method?: any, uri?: any, body?: any) {
	return {
		method: method,
		uri: uri,
		json: true,
		body: body,
		'content-type': 'application/json',
		cert: fs.readFileSync(config.cert),
		key: fs.readFileSync(config.key),
		ca: config.ca ? fs.readFileSync(config.ca) : null,
		passphrase: config.passphrase
	}
}

function logResult(error: any, response: any) {
	if (error) {			
		console.log(error)
	} 
	if (response) {
		console.log(response.statusCode)
		console.log(response.headers)
		console.log(response.body)
	}
}