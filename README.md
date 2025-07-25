# DA Atticus Form

- This is a dup of the OG atticus form 

Below is important information on the structure of the code and how to update or get updated code using your temrinal. You will also have more information of what the code does in the actual JS files.

## Important Note:
The form will look different on local host than it will on the live wordpress site. This is because on wordpress has some other styles that can affect the css of the project. Therefore when making changes please reference the wordpress site and not what you see on local host. Local host is better for checking functionality. 

Also, there are env variables in place for test urls, zapier urls and the sheet best connection url. 

## Extra Information:
This form uses a lot of session storage rather than local storage. I did this because local storage stores data persistently, meaning it remains even when the browser is closed and reopened. I choose session storage because it stores data only for the duration of the current browser session, which ends when the browser tab or window is closed. This way there is no persistent data in the users browser(kind of like cookies).

### Reminder on how to update and pull to or from github along with how to run locally:
### How to update:
1. git add -A
2. git commit -m "EXPLAIN IN DETAIL YOUR CHANGES HERE"
3. git push "branch name or origin main"

### How to get:
1. git pull "branch name or origin main"
- You need to do this if someone has updated the code. Better to go this before working on the code because you will run into conflicting files.

### How to run locally: 
1. npm run start
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
2. You can also add UTM paramters for it to pull into the sheet and confirm its working.

## How to update the wordpress site
1. You need to SFTP into the site to update the folders and code. You need to ask Damien for the creds or have him do it. 
2. After making all your changes, open a terminal and npm run build.
3. Open your local folder for the project to get the build folder. 
4. Find the plugin for the form/app. It should be /wp-content/plugins/react-form-atticus/
5. From the local folder for the project drag the build folder to replace the current one. 
6. Once that is done you need to edit the react-form-project.php file to update the CSS and JS name. To do that right click and edit with VS Code or Xcode.
7. You will find: 'build/static/css/main.47da0b4b.css' on there twice and you will find 'build/static/js/main.7b1b4e11.js' on there once. You will need to update this because when you change the CSS or JS files the numbers update.
8. Open your local folder for the project. Open build then static. You will see the CSS and JS folder. In there you will open both and just copy the name of the main css and js in that folder and replace it with the name thats in the react-form-project.php file. 
![Example of react-form-project.php code to update](/images/react-form-project-php-exampe.png)
- Here is the code for that incase it is needed: 
```php
<?php
/*
Plugin Name: React Form
Description: A form built in react
Version: 1.0
Author: Phillip
*/
function ryp_enqueue_scripts() {
    $plugin_url = plugin_dir_url(__FILE__) . 'build/static/css/MAIN_CSS_FILE_IN_BUILD_FOLDER';

    // Only enqueue if the file actually exists
    if (file_exists(plugin_dir_path(__FILE__) . 'build/static/css/MAIN_CSS_FILE_IN_BUILD_FOLDER')) {
        wp_enqueue_style('react-form-style', $plugin_url);
    } else {
        error_log("React CSS file not found: " . $plugin_url);
    }

    // Enqueue JavaScript
    wp_enqueue_script(
        'react-form-script',
        plugin_dir_url(__FILE__) . 'build/static/js/MAIN_JS_FILE_IN_BUILD_FOLDER',
        array('wp-element'), // Ensure React dependencies load
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'ryp_enqueue_scripts');

function ryp_render_react_app() {
    return '<div id="root"></div>';
}
add_shortcode('my_custom_form', 'ryp_render_react_app');
// Call my_custom_form to load the react form
```
9. Once that is done you need to edit the functions.php file to deregister any elementor styles from loading on the spcific page. Double check with Damien on this. The script is below.<br>
```javascript
function disable_elementor_styles_on_react_page() {
    if (is_page(PAGE_ID_HERE)) { // Change PAGE_ID_HERE to your actual React page ID
        // Remove Elementor styles
        wp_dequeue_style('elementor-frontend');
        wp_dequeue_style('elementor-global');
        wp_dequeue_style('elementor-icons');
        wp_dequeue_style('elementor-common');
        wp_dequeue_style('elementor-post-PAGE_ID_HERE'); // replace 

        wp_deregister_style('elementor-frontend');
        wp_deregister_style('elementor-global');
        wp_deregister_style('elementor-icons');
        wp_deregister_style('elementor-common');
        wp_deregister_style('elementor-post-PAGE_ID_HERE'); / replace PAGE_ID_HERE

        // Remove Elementor scripts (optional, only if needed)
        wp_dequeue_script('elementor-frontend');
        wp_dequeue_script('elementor-common');
    }
}
add_action('wp_enqueue_scripts', 'disable_elementor_styles_on_react_page', 99);
```

10. Once that is done youll want to add the short code into the wordpress editor to call the react form: 
``` [my_custom_form] ```. This is defined in the php file for the plugin. There is no reason to edit with elementor on this page
11. You will also want to add an html block to add the css below in a style tag. You add extra classes to hide them from the page. <br>
``` HTML
<style
#root{
width:100%;
min-width:100%;
max-width:100%;
}>
</style>
```
12. Make sure to remove any global templates like the header, footer, and chat that is in elementor custom code.
13. You also should add or confirm custom code for the form using elementor custom code. Youll want to preload the images only for the steps so they load faster: <br>
``` HTML
<link rel="preload" as="image" href="/pathtoimage.webp" />
```
14. You will also need to add or confirm the trusted form script is also in elementor custom code. This one should load before the body end tag. If needed you can ask David for the script. An important note is that on the react form the hidden field needs to be inside of a form tag in order for this to work properly. 

## Folder Structure 
|Atticus-Form/<br>
|<br>
|/build/<br>
|/images/ - Images for readme file. You can ignore this<br>
|/node_modules/ - You can ignore this<br>
|/public/ <br>
|/src/<br>
|/src/assets/<br>
|/src/assets/components/<br>
|/src/assets/components/Button.js - Footer.js - Header.js<br>
|/src/assets/fonts/<br>
|/src/assets/images/<br>
|/src/containers/<br>
|/src/containers/form<br>
|/src/containers/stepController<br>
|/src/services/<br>
|/src/App.css<br>
|/src/App.js<br>
|/src/App.test.js  - You can ignore this<br>
|/src/index.css<br>
|/src/index.js<br>
|/src/reportWebVitals.js  - You can ignore this<br>
|/src/setupTests.js  - You can ignore this<br>
|.gitignore - You can ignore this<br>
|package-lock.json - You can ignore this<br>
|package.json<br>
|README.md<br>

### Build Folder
This is the directory containing the production-ready output of the application. Usually after making a change you will run "npm run build" in your terminal to create/update this directory. 

This is important when updating env variables even on your local machine. After updating env variables you have to rebuild the folder so it can update.

### Public Folder
The public folder serves as a directory for static assets that are not processed by Webpack. An example of this would be your favicon.ico file or robots.txt file and many other things. Remeber if your app references something it most likely should be in the src folder

### Src folder and its children
The src folder serves as the primary location for the application's source code.

Across many of these files you will find code for the next button styling and the buttons that the user clicks to answer the quesiton. 

#### /src/assets/components/
Here you have components that are used such as the code for the button, footer and header. You likely wont have to touch this. This isn't anything too important to worry about. Header and Footer is called once and the button is not really used much. 

##### /src/assets/fonts/ & /src/assets/images/
These 2 folders are simply for organization and best practice. Having a place to keep everything seperate and call them only when needed. 

#### /src/assets/containers/
This holds basically all the code of the form and step controller. 

##### /src/assets/containers/form/
Form.js is the parent that controlls it all basically while the other files are the steps in the form. The steps are controlled but the buttons and functions in the form controller. 

Form.js holds the state for the form data along with the functions to update it like handeling the the changes that happen on a field when a user answers or types. manageNextStepValidation function has checks to make sure values are correct for their fields along with styles for error fields like trying to skip a question or invalid zipcode, email or phone number. The form state is stored in session storage like this if the user refreshes nothing is lost.

In this file there is a google sheet function that works with sheet best api tool. It posts the data using fetch which in turn updates the sheet connected with the tool. This is called after the user successfully answers a question so no data is lost if they close the tab or browser. This function also has another inside of it to properly check what step the user is on. Starts at 0 and goes until 9. If they submit the form and get redirected that is consider step 10. There is also a useEffect in the main form function that calls this onload to ensure even if the user opens the form we receive the data in sheet for analytics. 

You will also find handleSubmit and sendToZapier which is called at the end of the form. handleSubmit will bring all the data together like the UTM parameters(another function) and the form data with the trustedform cert and pass it into sendToZapier. It also has the user IP address which you get in a function in the useEffect so when the page loads it gets the users IP and updates the state to hold the IP address. In the useEffect is also the call back to getUTMParams function. sendToZapier then passes it into the webhook and redirects the user based on their answers in the form and finally resets the state. 

<b>Important Note: Trusted Form needs to be in a form tag to actually load the value you need to pull.</b>

In this folder you also have all the steps. In step 1 you will find notes on what is used throughout all the steps. Such as hiding the next button and button styling using session storage.

##### /src/assets/containers/stepController/
This holds important functions on the form like how the form goes next or back a step along with scroll to top and the progress bar. The step state is stored in session storage like this if the user refreshes the step they're on is not lost.

#### /src/assets/services/
This has one JS file used for managaing the validaiton of what the user answers to ensure its the correct step and variable being filled out. 

#### /src/assets/App.css/ & /src/assets/App.js/
App.css holds all the css for the code. You can search for a class or ID and update the css in here. You will also find media screens for tablet and mobile.

App.js brings everything together. Header, Form, and the Footer. It also calls the App.css so its applied everywhere in the form. 

### package.json File
The package.json is used to store the metadata associated with the project as well as to store the list of dependency packages. Examples would be the name, version, dependencies, scripts but also where the homepage of the site is. For example to run this properly on wordpress we had to add "homepage": "/wp-content/plugins/react-form-atticus/build/". This points the app in the correct directions on where to serve the files from. This is crucial for displaying the CSS and images of your app. If you name your plugin something else then the homepage path would be different, for exmaple: "/wp-content/plugins/PLUGIN_FOLDER_NAME/build/".