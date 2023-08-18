# Ecommerce App Demo

This project was built with AWS Amplify, a suite of everything required for building a fullstack application such as Cognito, S3 Buckets, etc.

While I've had experience using AWS Amplify, I noticed when I started this project that there was a feature called AWS Amplify Studio. It was released back in December 2021 as a visual interface that can be used to create AWS Amplify backed applications a bit easier according to the documentation.

I decided I would attempt to use Amplify Studio to see how much easier it would make this process. Essentially, the visual interfaces seem to make adding features such as storage and authentication much easier, as instead of running commands in the Amplify CLI, it could all be done with a click of a button. It also surprisingly included rich frontend development features.

I started off by adding Cognito based authentication, which was easily done with the visual interface. Then added some data, in this case I felt like having some fun and added various items from the Mario games as sample data for ecommerce products. Images of the products were added as Cloudfront links although the images themselves were being stored on an S3 bucket.

The visual interface was extremely useful due to its ability to give a preview of what components look like when populated with the sample data (products) provided. There is a great integration of Figma, so I used a recommended Figma template build specifically for Amplify projects from the AWS documentation, and studio even automatically generates React components directly from Figma if you link the project to a Figma file. Components generated this way will always make use of components from the Amplify React library. Studio allows you to change and add props to components through the interface, and the clean visualization of the process really helped out with developing some components. I did however use some MaterialUI components to quickly build out some features I wanted which were not available in the Amplify library, such as a Modal being used when the user wants to checkout. Surprisingly, there wasn't too much styling conflict when using MaterialUI and AmplifyUI libraries together.

One issue I did get stuck with for a while was dealing with how to override props and other aspects of Amplify UI components. After searching around for a bit, I realized Amplify components utilize an `overrides` prop where you can pass in which component and what prop overrides you want. Then there was the difficulty of finding out how to do this with an Amplify Collections component, which is essentially just a list or grid component made out of a bunch of Amplify components. I wasn't sure how to apply an override to individual components in this list/grid component, but managed to find out that the `overrideItems` prop was provided which passes in the item and index for each component in the collection. Some details regarding how to override values like this in Amplify Studio components were not very obvious at first, and so here are some of the useful documentation links I found:

https://dev.to/aws-builders/step-by-step-build-your-first-aws-amplify-and-react-app-1agn
https://docs.amplify.aws/console/uibuilder/override/#extend-generated-components-via-overrides-prop
https://aws.amazon.com/blogs/mobile/write-your-own-code-with-aws-amplify-studio/

Overall, while it took some time to understand how to use since this was my time using it, I would say if I had to remake this project again with the knowledge I have now, it would definitely be more time efficient to use AWS Amplify Studio, and I see myself using it again in the future if I need to quickly build out a project.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
