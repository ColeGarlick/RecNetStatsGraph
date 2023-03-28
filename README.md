# RecNetStatsGraph
A simple Javascript Userscript to inject some fancy code into your page that will take your internal API data and gather you an accurate donut chart of your earnings distribution by type as well as showing you your best selling key, consumable, and currency!

# Example:
![example1](https://raw.githubusercontent.com/ColeGarlick/RecNetStatsGraph/main/images/example.png)


# What you need:
To use this script, you will need to be using either Google Chrome, Mozzila Firefox, or any browser that supports the extension named `Tampermonkey`.
- [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/ "Tampermonkey for Firefox")
- [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en "Tampermonkey for Chrome")

# Getting the script into Tampermonkey:

Create a new project file by clicking the + symbol in the top right corner of the Tampermonkey dashboard.

![example2](https://raw.githubusercontent.com/ColeGarlick/RecNetStatsGraph/main/images/example2.png)

Then copy and paste the code straight from Github into Tampermonkey's built-in IDE.

![example3](https://raw.githubusercontent.com/ColeGarlick/RecNetStatsGraph/main/images/example3.png)

After this, hit ctrl+s and go head over to [RecNet](https://rec.net/stats "RecNet")!

# Limitations:
- Currently, it is best used only in light-mode. It's possible to see using dark-mode but, it's not optimal.
- RecNet is very weirdly coded and because of this, elements like to shift around on the page and change their class names between page loads. Because of this, the script may not properly run in some cases. If it's not running, just reload the page and it should come right back!
