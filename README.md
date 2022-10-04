# TOR2e Council Tracker

## Description

This module provides two macros that can be used in The One Ring 2nd Edition system to easily and manually track successes and failures during Councils. See details below on how to install and use the macros.

## How to Install

If you wish, you can simply copy the two macro scripts in the macros folder above and create a "New Council" macro and "Council Tracker" macro respectively. Alternatively, you can download the macros via a module using the instructions below.

### #1: Package Installation
For now, this module is not yet officially available directly through Foundry's package installer interface. If you wish to install this module, go to your Foundry's setup page, go to the "Add-On Modules" tab, click "Install Module" at the bottom of the window. Where it says "Manifest URL", paste the following link: https://github.com/cineasteroid/tor2e-council-tracker/releases/latest/download/module.json

### #2: Activate the Module

Make sure you have the "TOR2e Council Tracker" enabled in the "Manage Modules" menu under Settings.

### #3: Open the Compendium

![module-compendium](https://user-images.githubusercontent.com/113319516/193915385-9bf864e7-7f5a-4491-bcc9-53625f60c6f3.png)

This module will download a new compendium titled "TOR2e Council Tracker Macros". Inside will be the two macros you need: **New Council** and **Council Tracker**.  

You can either drag the macros directly into you macro folders/hotbar or right-click the compendium and select "Import All Content". You need **BOTH** macros in order to get the full functionality. 

Now the macros are ready to use!

## How to Use

**IMPORTANT:** *Please note that it is crucial to not rename the "Council Tracker" macro. These macros are intended to execute simultaneously and the second macro ("Council Tracker") is called by name. If for whatever you reason you need to change the name of "Council Tracker", this change must also be reflected in the script of the "New Council" macro. For similar reasons, you must not have another macro also named "Council Tracker".*

### Execute "New Council" Macro

When you wish to start a new council, execute the New Council macro. This will bring up a dialog box which you can fill in with the necessary information.

![new-council-dialog](https://user-images.githubusercontent.com/113319516/193917905-971ddbe6-3bde-4a2e-a8c9-e0ba1c4091fa.png)

Please note that "Set Resistance" must be set or the macro will not work. Audience will default to "Name" and Introduction bonus will default to 0 if no values are input.

When you have finished filling in all the fields, press "Send to Chat". This will send a new message to the chat log that contains the parameters of your Council.

![new-council-chat-card](https://user-images.githubusercontent.com/113319516/193918393-7ba46f28-ecd3-4bd4-add8-ac58878dd30f.png)

### "Council Tracker" Macro

In addition to the New Council chat card, the "Council Tracker" module should automatically execute, opening up a new "Council Success Tracker" dialog box.

![council-tracker-dialog](https://user-images.githubusercontent.com/113319516/193918666-0807de7c-c807-45d2-8118-8d615c9a1d94.png)

### Retrieve Council Data

Press "Retrieve Council Data from Chat". This will automatically find the **most recent** New Council message from the chat log and retrieve the parameters of that Council. The "Council Success Tracker" will now look like this:

![council-tracker-dialog-updated](https://user-images.githubusercontent.com/113319516/193919011-f7023ac6-65ce-4017-b63c-11058ebd8879.png)

### Tally Successes/Failures

As your Players succeed and fail on their rolls, you can keep a tally by pressing the "Add Success" and "Add Failure" respectively. New chat messages will appear reflecting the updated tally.

![success-chat-card](https://user-images.githubusercontent.com/113319516/193919474-fc76d492-979e-425d-8646-04e8768d87a1.png)

### Completing Councils

Once your players have accumulated enough successes to complete the Council -- or conversely accumulate enough failures to make an overall success impossible -- a new chat message will appear displaying the final result.

![success-complete-chat-card](https://user-images.githubusercontent.com/113319516/193920141-9c086a73-1281-4a6e-9c3e-3cea023acc8a.png)

You will note that the "Council Success Tracker" dialog will have changed now. The buttons will have disappeared and new text will appear instructing you to close the dialog box.

![council-tracker-dialog-complete](https://user-images.githubusercontent.com/113319516/193920369-afc1b8f8-040b-4eeb-829a-e85f74ba82c2.png)

### More Information

Though the "New Council" macro is the only one that needs to be executed, the "Council Tracker" macro can still be executed on its own to retrieve the most recent Council from the chat and work as intended. So, for example, if you were to accidentally close the "Council Success Tracker" dialog, you can simply execute the "Council Tracker" macro on its own. However, this will reset the Success/Fail tallies back to zero.

