# Royal-Appliance-Services
Royal Appliance Services to generate invoices and track employee work flow

This README is for running the program with Visual Studio Code, Android Studio, and Github Desktop installed.
Running the source code over launching in app store pressumes basic familiarity with source-code editors.

Android Emulator Setup:
1. In the Android Studio Home Page, click the vertical elipsis ⋮ near the top right corner.
2. Click 'Vertical Device Manager' in the dropdown
3. Click 'Create device' and 'Finish' once configurations are processed.
4. Back in Android Studio Home Page, go to 'SDK Manager' in the ⋮ dropdown bar.
5. Copy the directory inside 'Android SDK location' and in your Control Panel, create a new environment variable using that as a value 
6. Double click your 'Path' environment variable and click the 'New' button near the top right window
7. Paste the directory and edit the directory to end in '...Android\Sdk\platform-tools'
8. Click 'OK'

Both Royal-Appliance-Services and Royal-Appliance-Services-API must be launched for the application to work.

To run:
1. Launch the android emulator in Android Studio.
2. Open an integrated terminal from the frontend folder.
3. Run 'npm install' to ensure the dependencies are properly updated.
4. Launch the app with 'expo start'

To run Backend API:
1. Requriements that need to be installed:
<br>
*https://blog.alivate.com.au/poppler-windows/
*https://wkhtmltopdf.org/downloads.html
*https://www.python.org/downloads/
<br>
2. After install popler-windows and wkhtmltopdf, make sure those bin folder path is in your environment path.

3. Then download the source code

4. Open a terminal in the code folder with vscode or pycharm:

5. Type: pip install -r requirements.txt

6. After that, if no error with the packages, you can run: python3 app.py to run the api
