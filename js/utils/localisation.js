async function loadTranslation() {
  const userLanguage = navigator.language.split("-")[0]; // Extract language code without region

  try {
    const nomeFile = getServerUrl() + `languages/${userLanguage}.json`;
    const response = await fetch(nomeFile);
    myApp.labels = await response.json();

    // console.log(myApp.labels); // This will log the content of the file to the console
  } catch (error) {
    myApp.labels = {};
    console.error("There was a problem fetching the file:", error);
  }
}

async function addTerm(label, value) {

  const userLanguage = navigator.language.split("-")[0];
  const addTermScript = getServerUrl() + `/languages/addTerm.php`;

  const fileName = `./${userLanguage}.json`;

  const response = await fetch(addTermScript, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'file_name': fileName,
      'label': label,
      'value': value
    })
  });

  const result = await response.json();
  console.log(result.message); 
}

loadTranslation();