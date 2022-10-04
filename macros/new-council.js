const content = `
  <div class="text-block">
    <h2 style="text-align: center">Create New Council</h2>
    <h3 class="titles">Audience:</h3>
    <div class="audience">
      <label for="audience-name">Council Audience: </label>
      <input type="text" value="Name" name="audience-name" id="audience-name"/>
      <hr>
    <h3 class="titles">Set Resistance:</h3>
    <div class="resist-options">
      <span class="radios">
      <input type="radio" id="reasonable" name="resistance" value="Reasonable (3)">
        <label>Reasonable (3)</label>
      </span>
      <span class="radios">
      <input type="radio" id="bold" name="resistance" value="Bold (6)">
        <label>Bold (6)</label>
      </span>
      <span class="radios">
      <input type="radio" id="outrageous" name="resistance" value="Outrageous (9)">
        <label>Outrageous (9)</label>
      </span>
    </div>
    <hr>
    <h3 class="titles">Introduction:</h3>
    <div class="introduction">
      <label for="intro-value"># of Special Successes: </label>
      <input type="number" value="0" pattern="[0-9]*" min="0" name="intro-value" id="intro-value"/>
    </div>
  </div>
`;

const style = `
  <style>
    .dialog.window-app > .window-content {
      background: url(ui/parchment.jpg);
    }
    .text-block {
      margin: 10px 4px;
    }
    h3.titles {
      font-size: 1.15rem;
      font-weight: bold;
      margin-top: 16px;
    }
    .dialog input {
      margin: 4px auto 12px auto;
    }
    .dialog .dialog-button:active {
      background: rgba(0, 0, 0, 0.2);
    }
    .dialog .dialog-button:hover {
      cursor: pointer;
    }
    .dialog input[name="resistance"] {
      display: inline;
    }
    .dialog input[name="resistance"]:hover {
      cursor: pointer;
    }
    .resist-options {
      margin: auto;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: space-evenly;
    }
    .dialog label {
      font-size: 1rem;
    }
  </style>
`;

new Dialog({
  title: 'New Council',
  content: style + content,
  buttons: {
    ok: {
      label: 'Send to Chat',
      icon: `<i class="fas fa-check"></i>`,
      callback: (html) => {
        let target = html[0].querySelector('#audience-name').value;
        let resistLevel = html[0].querySelector(
          "input[name='resistance']:checked"
        ).value;
        let resistVal;
        if (resistLevel === 'Reasonable (3)') {
          resistVal = 3;
        } else if (resistLevel === 'Bold (6)') {
          resistVal = 6;
        } else if (resistLevel === 'Outrageous (9)') {
          resistVal = 9;
        } else {
          resistVal = 0;
        }
        let introBonus = html[0].querySelector('#intro-value').value;
        let timeLimit = resistVal + +introBonus;
        let chatData = {
          speaker: ChatMessage.getSpeaker({ alias: 'New Council' }),
          flags: {
            'time-limit': timeLimit,
            successes: resistVal,
            audience: target,
          },
          content: `
            <div class='container'>
              <h2 style='text-align: center;'>Council with ${target}</h2>
              <p><strong>Resistance Level: </strong>${resistLevel}</p>
              <p><strong>Introduction Bonus: </strong>${introBonus}</p><hr>
              <p><strong>Total Time Limit: </strong>${timeLimit}</p>
            </div>
          `,
        };
        let msg = ChatMessage.create(chatData, {});
        console.log(msg);

        game.macros.getName('Council Tracker').execute();
      },
    },
  },
}).render(true);
