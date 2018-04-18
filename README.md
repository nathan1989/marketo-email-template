Email template builder
This project is used for Marketo email templates. It makes creating multiple modules and themes much easier.

Testing
This project was built with the following email clients/browsers to test against:

Email clients
Apple Mail 9
Apple Mail 10
Outlook 2010
Outlook 2013
Outlook 2016
 
Mobile clients
Android Gmail 6
Android Gmail 7
iPhone 5s (iOS 9)
iPhone 6 (iOS 10.2)
iPhone 7 (iOS 10.2)
iPhone 7+ (iOS 10.2) 
iPad Air (iOS 10)
iPad Mini (iOS 10)
iPad Pro - 12.9in (iOS 10)
iPad Retina (iOS 10)
 
Common web clients

Gmail
Chrome/Windows
Firefox/Windows
IE11/Windows
Safari/Mac

Google Apps
Chrome/Windows
Firefox/Windows
IE11/Windows

Office 365
Chrome/Windows
Firefox/Windows
IE11/Windows

Outlook.com
Chrome/Windows
Firefox/Windows
IE11/Windows
Safari/Mac

Commands
Run `gulp serve` to run development mode
Run `gulp` to build project

Styles
In /styles/includes is basic styling which can be used in multiple email templates
Use /styles/modules for custom styles

Markup
Add modules in /includes, making sure to reference them in index.njk

Theme switcher
Change the variable `$current-theme` to either $theme-1 (customer), $theme-2 (internal) or $theme-3 (adviser) to see the different themes
Make sure to also change the image path in the partial `/app/includes/arrow-button.njk` to the appropriate image (arrow-theme-1.png, arrow-theme-1.png or arrow-theme-3.png)