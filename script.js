document.addEventListener("DOMContentLoaded", () => {
  SegmentDisplayApp.init();
});

const SegmentDisplayApp = {
  initData: Telegram.WebApp.initData || "",
  MainButton: Telegram.WebApp.MainButton,

  init() {
    document.body.style.visibility = "";

    Telegram.WebApp.ready();
    Telegram.WebApp.MainButton.setParams({
      text: "CLOSE WEBVIEW",
      is_visible: true,
    }).onClick(Telegram.WebApp.close);
  },

  handleSendDataClick() {
    const displayText = document.getElementById("displayText").value;
    
    if (!displayText) {
        alert("Error: Text field cannot be empty!");
        return;
    }

    const effect = 'text';

    const color = document.getElementById("colorPicker").value;
    const redCommand = ` /red=${hexToInt(color.substring(1, 3))}`;
    const greenCommand = ` /green=${hexToInt(color.substring(3, 5))}`;
    const blueCommand = ` /blue=${hexToInt(color.substring(5, 7))}`;

    const displayMode = document.querySelector('input[name="display_mode"]:checked').value;
    const displayModeCommand = displayMode !== 'static' ? ` /${displayMode}` : "";

    let countCommand = '';
    if (displayMode === 'roll' || displayMode === 'blink') {
      countCommand = ' /count=5';
    }

    const displayTextCommand = ` ${displayText}`;

    const command =
      `/${effect}` +
      displayModeCommand +
      redCommand +
      greenCommand +
      blueCommand +
      countCommand +
      displayTextCommand;

    console.log("Sending data: ", command);
    Telegram.WebApp.sendData(command);
  },
};

function hexToInt(hexString) {
  let intValue = parseInt(hexString, 16);

  // Clamp the value between 0 and 255
  if (intValue < 0) {
    intValue = 0;
  } else if (intValue > 255) {
    intValue = 255;
  }

  return intValue;
}

