# TravelPinApp

This applicaton allows users to pin and review their favoutite locations on world map and allows a bunch of users to pin and rewiew together their visited places and the app maintains log of all their activities.

## Technology Used

**MERN Stack**

* MongoDB - Atlas as a cloud Database
* Express JS - For Maintaining the Backend
* React - To make attractive dynamic webpage along with HTML/CSS
* Node - As backend


## Functioning of the App

![image](https://user-images.githubusercontent.com/86547119/161558602-5a343c05-8c0e-45c9-a267-b8bf131002cc.png)

### 1. Register/Login

It allows users to create their account on the on the app with unique username, email and password and then in turn allows them to Login to use the App. Password of Registered User is hashed using Bycrypt and stored in the database. Credentials are verified during Login and and then allow the user to use the app.

#### Register Useer
![image](https://user-images.githubusercontent.com/86547119/161560706-6b3f799b-d176-4d5f-9ddd-c12ec7e03414.png)

#### Login User
![image](https://user-images.githubusercontent.com/86547119/161560832-dd753cf3-8c5e-48c5-b9be-ccd0500e8ba3.png)

#### After Sucessful Login and Logout
![image](https://user-images.githubusercontent.com/86547119/161560925-3766ce77-9d6f-4c44-82f4-68e017641205.png)


### 2. Pin Your Desired Location

It allows the user to double click on the region and pin it

![image](https://user-images.githubusercontent.com/86547119/161561778-e08df1d1-6e1c-4db7-b5b4-bc06a143d8af.png)
![image](https://user-images.githubusercontent.com/86547119/161561892-fc5e603f-f7b6-4209-8c95-22e36e508021.png)

##### Pins of Current user turns Green
![image](https://user-images.githubusercontent.com/86547119/161562124-f22531c6-8f38-47cd-a276-dd254e73b738.png)
![image](https://user-images.githubusercontent.com/86547119/161562275-001b2af5-891a-437d-b23d-18d6a12a138d.png)

### 3. Delete a pin

It allows admin to delete all the Pins while each user to delete their own created pins.
![image](https://user-images.githubusercontent.com/86547119/161562954-d04f407d-2111-48e5-b7ef-81b9f60803fc.png)

After deleting the pin
![image](https://user-images.githubusercontent.com/86547119/161563058-320d8102-9ba0-4e29-a57f-4d02883186b5.png)


