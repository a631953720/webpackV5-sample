# webpackV5-sample
according to the webpack official document to write this sample

# developing env
- node v16.13.0
- npm 8.1.2
- system Windows10

# reference
- [webpack offical document](https://webpack.js.org/guides/) (I'm very like this document writing style)

# UI sample
## Quick start
```
npm i

npm run start
```

## Sample site
![image](https://user-images.githubusercontent.com/71483852/191008012-a78087f1-0ecc-40f4-bed0-f8fcb01801b9.png)


## Features
### 1. Dialog
- You can custom your dialog
  - Sample code
    ```js
      const dialog = buildDialog({
        html: inputHTML, // can be a string or html files
        title: 'title123',
        okOnClick: () => {
          console.log(getSchedulerFormValues());
        },
        cancelOnClick: () => {
          dialog.remove();
        },
      });
      
      dialog.render();
    ```
  - Text dialog
    ![image](https://user-images.githubusercontent.com/71483852/191005968-cc00041f-b9c1-487d-8a6e-be7f60ec6145.png)
  - Inputs dialog
    ![image](https://user-images.githubusercontent.com/71483852/191006147-443f5dea-9895-4924-9423-db7127589c0a.png)

### 2. Alert
- You can show the alert. It will be removed after 2s.
  - Sample code
    ```js
      showSuccessAlert('123');
      
      showErrorAlert('456');
    ```
  - Success Alert
    ![image](https://user-images.githubusercontent.com/71483852/191007168-9951de6e-a555-4343-af71-009329a25f8f.png)
  - Error Alert!

    ![image](https://user-images.githubusercontent.com/71483852/191007200-da8a6744-ddd6-404d-9818-4823e29d0953.png)
### 3. Loading
- You can add the loading to your page or some element
  - Sample code
    ```js
      const body = document.body; // or any element
      addLoadingElement(body, 'background-color: rgba(0,0,0,0.12);');
      
      // remove loading after 2s
      setTimeout(() => removeLoadingElement(body), 2000);
    ```
  - Some element
    ![1663586797845](https://user-images.githubusercontent.com/71483852/191007383-7bcc46e8-001b-4933-9f11-4cab676d9406.gif)
  - All page
    ![image](https://user-images.githubusercontent.com/71483852/191007628-fdfc5fbc-f654-4d87-bb7d-b8f7144c79f6.png)
