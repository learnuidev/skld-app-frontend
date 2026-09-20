function getTranscript(transcriptItem) {
  const [time, text] = [...transcriptItem.children];

  return {
    start: time.innerText,
    input: text.innerText,
  };
}

function getTranscripts() {
  return [
    ...document.getElementById("js-tab-content-inner").children[1].children[0]
      .children,
  ].map(getTranscript);
}

getTranscripts();
