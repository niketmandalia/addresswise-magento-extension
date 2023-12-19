# AddressWise for Magento 2

The AddressWise module for Magento 2 allows you to find verified Australia and New Zealand addresses with an intuitive, search-as-you-type interface.

## 1. Installation

The module can be installed one way:

1. Composer

### 1.1 Via Composer

To install the module via Composer, from the root directory of your Magento installation:


**composer require addresswise/addresswise**

This will automatically fetch the latest compatible version of the module available to your Magento installation. From the root directory of your Magento installation:


**bin/magento module:enable addresswise/addresswise**

**bin/magento setup:upgrade**

**bin/magento setup:di:compile**

**bin/magento setup:static-content:deploy**

**bin/magento c:f**

## 2. Configuring the module

The module's settings are controlled within `Stores -> Configuration -> AddressWise -> AddressWise`.

> Most settings in Magento 2 are guarded with sensible defaults. To customise settings,  you'll need to uncheck the **use system value** for any settings you would like to customise.




### 3.1 Basic functionality

1. Change **Enabled** to **Yes**.
2. Enter the token
3. Existing users can obtain their API key from the https://addresswise.co.nz/
4. Read more on the AddressWise for installation guide https://addresswise.co.nz/pages/magento-plugin-documentation






## 4. Forms

we support the following frontend forms:

1. Checkout billing address
2. Checkout shipping address
3. Customer address book

In addition, we support the following admin forms:

1. Order billing address
2. Order shipping address


