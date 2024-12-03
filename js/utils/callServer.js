async function callServer(parameter) {
  myApp.myModal.waiting("Attendere ...");

  const myUrl = getServerUrl()+"server/api.php";
  // const compressedData = pako.deflate(dataToCompress, { to: 'string' });
  var resultTxt = "";
  console.log(myUrl+btoa(JSON.stringify(parameter)));
  try {
    const response = await fetch(myUrl, {
      method: "POST", // or 'GET' depending on your PHP service
      body: btoa(JSON.stringify(parameter)), // Data to send to the PHP service
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new FatalError(`HTTP error! Status: ${response.status}`);
    }

    resultTxt = await response.text();

    const result = JSON.parse(resultTxt);

    if (result.result === "KO") {
      throw new FatalError(`Functional error: ${result.description}`);
    }
    myApp.myModal.hide();
    return result.data;
  } catch (error) {
      myApp.myModal.error(error, resultTxt);
      console.log(error + "\n" + resultTxt);
      return false;
  }
}
