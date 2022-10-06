//The content of the Dialog box
const content = `
  <form>
    <h2>Council Success Tracker</h2>
    <p class='instructions'>Retrieve data from the most recently-created Council by clicking the button below:</p> 
    <div class='tracker'>
      <button id="retrieve" name="retrieve">Retrieve Council Data from Chat</button>
      <p class='info' id="p1"></p>
      <div class="results-group">
        <button id="success" class="results" name="success">Add Success</button>
        <button id="fail" class="results" name="fail">Add Fail</button>
        <button id="additional" class="results" name="additional">Add Additional Success</button>
      </div>
      <p class='final' id="closeText"></p>
    </div>
  </form>
`;

//CSS Styling for Dialog box content
const style = `
  <style>
    .dialog.window-app > .window-content {
      background: url(ui/parchment.jpg);
    }
    .window-app {
      height: 430px;
      width: auto;
    }
    .dialog form {
      margin: 10px 4px;
    }
    #success {
      visibility: hidden;
    }
    #fail {
      visibility: hidden;
    }
    #additional {
      visibility: hidden;
    }
    button {
      cursor: pointer;
    }
    .tracker {
      text-align: center;
    }
    #retrieve {
      width: 300px;
    }
    .dialog button:active {
      background: rgba(0, 0, 0, 0.2);
    }
    .results {
      width: 300px;
      margin: 0 auto;
    }
    .results-group {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-itmes: center;
      flex-direction: column;
    }
    #outcome {
      visibility: hidden;
    }
    .dialog .tracker {
      margin: 10px 4px;
    }
    .dialog h2 {
      text-align: center;
      font-size: 1.5rem;
    }
    p.instructions {
      font-size: 1rem;
      color: #333;
    }
    p.final {
      font-size: .75rem;
      color: #333;
      text-align: center;
      margin-top: 48px;
    }
    p.info {
      font-size: 1.15rem;
      text-align: center;
      font-weight: bold;
    }
  </style>
`;

const SET_VISIBILITY_VISIBLE = 'visible';
const SET_VISIBILITY_HIDDEN = 'hidden';

let timeLimit;
let resistVal;
let council;

let successTally = 0;
let failTally = 0;
let adtlSuccTally = 0;

function getElements() {
  const DATA_BTN = document.getElementById('retrieve');
  const SUCC_BTN = document.getElementById('success');
  const FAIL_BTN = document.getElementById('fail');
  const ADTL_SUCC_BTN = document.getElementById('additional');
  const P1_TEXT = document.getElementById('p1');
  const CLOSE_TEXT = document.getElementById('closeText');
  return { DATA_BTN, SUCC_BTN, FAIL_BTN, ADTL_SUCC_BTN, P1_TEXT, CLOSE_TEXT };
}

//Retrieve the most recent Council message and return the values for Resistance (Successes needed) and Time Limit
function getCouncil() {
  const msgs = game.messages.contents;
  const lastCouncil = [...msgs]
    .reverse()
    .find((msg) => msg.data.flags.hasOwnProperty('successes' && 'time-limit'));

  if (lastCouncil) {
    ui.notifications.info('Your Council data has successfully been retrieved.');

    timeLimit = lastCouncil.data.flags['time-limit'];
    resistVal = lastCouncil.data.flags['successes'];
    audience = lastCouncil.data.flags['audience'];

    return {
      'time-limit': timeLimit,
      target: resistVal,
      audience: audience,
    };
  } else {
    ui.notifications.error('No Council was found in the chat.');
  }
}

//Add additional text to the Dialog content containing the pertinent Council parameters
function addParameters() {
  const elem = getElements();
  const succBtn = elem.SUCC_BTN;
  const failBtn = elem.FAIL_BTN;
  const adtlSuccBtn = elem.ADTL_SUCC_BTN;
  const p1 = elem.P1_TEXT;
  p1.innerText = `Time Limit: ${council['time-limit']} | Successes Needed: ${council['target']}`;
  succBtn.style.visibility = SET_VISIBILITY_VISIBLE;
  failBtn.style.visibility = SET_VISIBILITY_VISIBLE;
  adtlSuccBtn.style.visibility = SET_VISIBILITY_VISIBLE;
}

//When Add Success/Add Failure buttons are pressed, output a message to chat that tallies each
function addSuccess() {
  successTally++;
  let chatData = {
    speaker: ChatMessage.getSpeaker({
      alias: `Council with ${council.audience}`,
    }),
    flags: {
      'success-tally': successTally,
      'fail-tally': failTally,
    },
    content: `
      <h2 style="text-align: center; color: #33803c;">Success!</h2>
      <p><strong>Successes: </strong>${
        successTally + adtlSuccTally
      }/${resistVal}</p>
      <p><strong>Failures: </strong>${failTally}</p>
      <hr>
      <p><strong>Attempt: </strong>${successTally + +failTally}/${timeLimit}</p>
    `,
  };

  ChatMessage.create(chatData, {});
  checkTally();
}

function addFailure() {
  failTally++;
  let chatData = {
    speaker: ChatMessage.getSpeaker({
      alias: `Council with ${council.audience}`,
    }),
    flags: {
      'success-tally': successTally,
      'fail-tally': failTally,
    },
    content: `
      <h2 style="text-align: center; color: #780c0c;">Fail!</h2>
      <p><strong>Successes: </strong>${
        successTally + adtlSuccTally
      }/${resistVal}</p>
      <p><strong>Failures: </strong>${failTally}</p>
      <hr>
      <p><strong>Attempt: </strong>${successTally + +failTally}/${timeLimit}</p>
    `,
  };

  ChatMessage.create(chatData, {});
  checkTally();
}

function addAdtlSucc() {
  adtlSuccTally++;
  let chatData = {
    speaker: ChatMessage.getSpeaker({
      alias: `Council with ${council.audience}`,
    }),
    flags: {
      'success-tally': successTally,
      'fail-tally': failTally,
    },
    content: `
      <h2 style="text-align: center; color: #33803c;">Success!</h2>
      <p><strong>Successes: </strong>${
        successTally + adtlSuccTally
      }/${resistVal}</p>
      <p><strong>Failures: </strong>${failTally}</p>
      <hr>
      <p><strong>Attempt: </strong>${successTally + +failTally}/${timeLimit}</p>
    `,
  };

  ChatMessage.create(chatData, {});
  checkTally();
}

//Check when Current Successes = Successes Needed, if so automatically sends Council Success message to chat
function checkTally() {
  const elem = getElements();
  if (successTally == resistVal) {
    let chatData = {
      speaker: ChatMessage.getSpeaker({
        alias: `Council with ${council.audience}`,
      }),
      content: `
          <h2 style="text-align: center; color: #33803c;">Council Success</h2>
          <p>You have succeeded in your Council with ${council.audience}!</p>
        `,
    };

    ChatMessage.create(chatData, {});

    const dataBtn = elem.DATA_BTN;
    const succBtn = elem.SUCC_BTN;
    const failBtn = elem.FAIL_BTN;
    const adtlSuccBtn = elem.ADTL_SUCC_BTN;
    const closeText = elem.CLOSE_TEXT;

    succBtn.style.visibility = SET_VISIBILITY_HIDDEN;
    failBtn.style.visibility = SET_VISIBILITY_HIDDEN;
    adtlSuccBtn.style.visibility = SET_VISIBILITY_HIDDEN;

    closeText.innerText = `This Council is now complete. Please Close this window.`;
    closeText.style.visibility = SET_VISIBILITY_VISIBLE;
    dataBtn.style.visibility = SET_VISIBILITY_HIDDEN;

    //If # of total attempts is reached without required number of successes, send Council Failure message to chat
  } else if (
    (timeLimit - (successTally + failTally) < resistVal - successTally &&
      successTally < resistVal) ||
    (successTally + failTally === timeLimit && successTally < resistVal)
  ) {
    let chatData = {
      speaker: ChatMessage.getSpeaker({
        alias: `Council with ${council.audience}`,
      }),
      content: `
          <h2 style="text-align: center; color: #780c0c;">Council Failure</h2>
          <p>You have failed in your Council with ${council.audience}.</p>
        `,
    };

    ChatMessage.create(chatData, {});

    const dataBtn = elem.DATA_BTN;
    const succBtn = elem.SUCC_BTN;
    const failBtn = elem.FAIL_BTN;
    const adtlSuccBtn = elem.ADTL_SUCC_BTN;
    const closeText = elem.CLOSE_TEXT;

    succBtn.style.visibility = SET_VISIBILITY_HIDDEN;
    failBtn.style.visibility = SET_VISIBILITY_HIDDEN;
    adtlSuccBtn.style.visibility = SET_VISIBILITY_HIDDEN;

    closeText.innerText = `This Council is now complete. Please Close this window.`;
    closeText.style.visibility = SET_VISIBILITY_VISIBLE;
    dataBtn.style.visibility = SET_VISIBILITY_HIDDEN;
  }
}

new Dialog({
  title: 'Council Tracker',
  content: style + content,
  buttons: {
    close: {
      label: 'Close',
      icon: `<i class="fas fa-times"></i>`,
    },
  },
  render: (html) => {
    const dataBtn = document.getElementById('retrieve');
    const succBtn = document.getElementById('success');
    const failBtn = document.getElementById('fail');
    const adtlSuccBtn = document.getElementById('additional');

    dataBtn.addEventListener('click', () => {
      council = getCouncil();
      addParameters();

      return;
    });
    succBtn.addEventListener('click', addSuccess);
    failBtn.addEventListener('click', addFailure);
    adtlSuccBtn.addEventListener('click', addAdtlSucc);
  },
}).render(true);
