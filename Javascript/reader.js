let DBR = require('dynamsoft-javascript-barcode');
// Please visit https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=github to get a trial license
DBR.BarcodeReader.productKeys = '<your license key>';

let pReader = null;
(async()=>{
    let reader = await DBR.BarcodeReader.createInstance();
    let settings = await reader.getRuntimeSettings();
    settings.barcodeFormatIds = DBR.EnumBarcodeFormat.BF_QR_CODE;
    await reader.updateRuntimeSettings(settings);
    let startTime = new Date().getTime();
    for(let result of await reader.decode('test.jpg')){
        console.log(result.barcodeText);
    }
    console.log(new Date().getTime() - startTime);
    reader.destroy();

    // Since the worker keep alive, you can call
    await DBR.BarcodeReader._dbrWorker.terminate();
    // when you need to exit this process.
    // Or call
    process.exit();
    // directly.
})();