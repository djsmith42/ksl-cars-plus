KSL Cars Plus
=============

A Chrome extension that improves KSL cars.

## To build the extension:
 - git clone this repository
 - ```cd ksl-cars-plus```
 - ```npm install```
 - ```npm run build```
 - The built zip file is in the root of the project: ```ksl-cars-plus-$VERSION.zip```
 
## To install the extension locally:
 - Navigate to [chrome://extensions]
 - Check the "Developer mode" checkbox
 - Click "Load unpacked extension..."
 - Browse to the ```ksl-cars-plus``` folder (where you git cloned it)

## To hack on the extension:
 - Run ```npm run build```
 - Make your changes
 - Refresh the [chrome://extensions] page (why is this necessary? this sucks)
 - Go to a KSL cars listing page and refresh it
 - You'll see this in the console if it worked: ``` ----- KSL Cars Plus extension -----```
