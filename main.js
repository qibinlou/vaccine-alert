const fetch = require('node-fetch');
const notify = require('./notify');

function checkCVSResponse(response) {
    const resposneJson = JSON.parse(response);
    const data = resposneJson.responseMetaData;

    if (data.statusCode !== '1010' || data.statusDesc !== 'No stores with immunizations found') {
        notify('CVS has an open slot now!' + JSON.stringify(data));
        console.log(data);
    }
    // console.debug(data);
}

async function cvs() {
    const response = await fetch("https://www.cvs.com/Services/ICEAGPV1/immunization/1.0.0/getIMZStores", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"requestMetaData\":{\"appName\":\"CVS_WEB\",\"lineOfBusiness\":\"RETAIL\",\"channelName\":\"WEB\",\"deviceType\":\"DESKTOP\",\"deviceToken\":\"7777\",\"apiKey\":\"a2ff75c6-2da7-4299-929d-d670d827ab4a\",\"source\":\"ICE_WEB\",\"securityType\":\"apiKey\",\"responseFormat\":\"JSON\",\"type\":\"cn-dep\"},\"requestPayloadData\":{\"selectedImmunization\":[\"CVD\"],\"distanceInMiles\":35,\"imzData\":[{\"imzType\":\"CVD\",\"ndc\":[\"59267100002\",\"59267100003\",\"59676058015\",\"80777027399\"],\"allocationType\":\"1\"}],\"searchCriteria\":{\"addressLine\":\"10023\"}}}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    checkCVSResponse(await response.text());

    // console.debug(data)
}

async function cvsNewYork() {
    const response = await fetch("https://www.cvs.com/Services/ICEAGPV1/immunization/1.0.0/getIMZStores", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"requestMetaData\":{\"appName\":\"CVS_WEB\",\"lineOfBusiness\":\"RETAIL\",\"channelName\":\"WEB\",\"deviceType\":\"DESKTOP\",\"deviceToken\":\"7777\",\"apiKey\":\"a2ff75c6-2da7-4299-929d-d670d827ab4a\",\"source\":\"ICE_WEB\",\"securityType\":\"apiKey\",\"responseFormat\":\"JSON\",\"type\":\"cn-dep\"},\"requestPayloadData\":{\"selectedImmunization\":[\"CVD\"],\"distanceInMiles\":35,\"imzData\":[{\"imzType\":\"CVD\",\"ndc\":[\"59267100002\",\"59267100003\",\"59676058015\",\"80777027399\"],\"allocationType\":\"1\"}],\"searchCriteria\":{\"addressLine\":\"New York, NY\"}}}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    checkCVSResponse(await response.text());
}

async function riteAid(storeNumber) {
    const response = await fetch(`https://www.riteaid.com/services/ext/v2/vaccine/checkSlots?storeNumber=${storeNumber}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.riteaid.com/pharmacy/apt-scheduler",
        "referrerPolicy": "origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });
    const resposneJson = JSON.parse(await response.text());
    if (resposneJson.Data.slots['1'] === true) {
        notify(`Rite Aid has an open slot now!\n storeNumber is ${storeNumber}\n responseJson is ${JSON.stringify(resposneJson)}`);
        console.log(storeNumber, resposneJson);
    }

    //console.debug(resposneJson);
}

async function main() {
    cvs();
    cvsNewYork();

    riteAid('4885');
    riteAid('3110');
    riteAid('4189');
    riteAid('4215');
    riteAid('4964');
    riteAid('4688');
    riteAid('7767');

    setTimeout(main, 1000);
};

main();
