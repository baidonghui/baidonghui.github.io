---
layout: post
title:  "Android ProGuard"
categories: Android
tags:  Android
---

* content
{:toc}

<h1>Code in Java Decompiler</h1>

<p><img src="http://i5.tietuku.com/e86f657af8a47a60.png" alt="" /></p>

<h1>修改配置文件实现代码混淆</h1>

<p>The ProGuard tool shrinks, optimizes, and obfuscates your code by removing unused code and renaming classes, fields, and methods with semantically obscure names. The result is a smaller sized .apk file that is more difficult to reverse engineer. Because ProGuard makes your application harder to reverse engineer, it is important that you use it when your application utilizes features that are sensitive to security like when you are Licensing Your Applications.</p>

<p>ProGuard is integrated into the Android build system, so you do not have to invoke it manually. ProGuard runs only when you build your application in release mode, so you do not have to deal with obfuscated code when you build your application in debug mode. Having ProGuard run is completely optional, but highly recommended.</p>

<p>This document describes how to enable and configure ProGuard as well as use the retrace tool to decode obfuscated stack traces.</p>

<h2>Enabling ProGuard (Gradle Builds)</h2>

<p>When you create a project in Android Studio or with the Gradle build system, the minifyEnabled property in the build.gradle file enables and disables ProGuard for release builds. The minifyEnabled property is part of the buildTypes release block that controls the settings applied to release builds. Set the minifyEnabled property to true to enable ProGuard, as shown in this example.</p>

<pre class="lang:xhtml decode:true " >  android {
   ...
 
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'),
            'proguard-rules.pro'
        }
    }
  }</pre>

<p>The getDefaultProguardFile('proguard-android.txt') method obtains the default ProGuard settings from the Android SDK tools/proguard/ folder. The proguard-android-optimize.txt file is also available in this Android SDK folder with the same rules but with optimizations enabled. ProGuard optimizations perform analysis at the bytecode level, inside and across methods to help make your app smaller and run faster. Android Studio adds the proguard-rules.pro file at the root of the module, so you can also easily add custom ProGuard rules specific to the current module.</p>

<p>以上来自<a href="http://developer.android.com/tools/help/proguard.html">Android官网</a></p>

<p>在 Android Studio 中，对代码进行混淆只需修改<code>build.grandle</code>文件，也可以在<code>proguard-rules.pro</code>中写一些自定义的规则。修改完配置文件，下一步就是制作发行包。</p>

<h1>制作 Release 版本的发行包</h1>

<p>To sign your app in release mode in Android Studio, follow these steps:</p>

<p>On the menu bar, click Build > Generate Signed APK.
On the Generate Signed APK Wizard window, click Create new to create a new keystore.
If you already have a keystore, go to step 4.
On the New Key Store window, provide the required information as shown in figure 1.
Your key should be valid for at least 25 years, so you can sign app updates with the same key through the lifespan of your app.</p>

<p><img src="http://developer.android.com/images/tools/signstudio2.png" alt="" />
Figure 1. Create a new keystore in Android Studio.</p>

<p>On the Generate Signed APK Wizard window, select a keystore, a private key, and enter the passwords for both. Then click Next.</p>

<p><img src="http://developer.android.com/images/tools/signstudio1.png" alt="" />
Figure 2. Select a private key in Android Studio.</p>

<p>On the next window, select a destination for the signed APK and click Finish.</p>

<p><img src="http://developer.android.com/images/tools/signstudio3.png" alt="" />
Figure 3. Generate a signed APK in Android Studio.</p>

<h2>Automatically Signing Your App</h2>

<p>In Android Studio, you can configure your project to sign your release APK automatically during the build process:</p>

<p>On the project browser, right click on your app and select Open Module Settings.
On the Project Structure window, select your app's module under Modules.
Click on the Signing tab.
Select your keystore file, enter a name for this signing configuration (as you may create more than one), and enter the required information.</p>

<p><img src="http://developer.android.com/images/tools/signstudio10.png" alt="" />
Figure 4. Create a signing configuration in Android Studio.</p>

<p>Click on the Build Types tab.
Select the release build.
Under Signing Config, select the signing configuration you just created.</p>

<p><img src="http://developer.android.com/images/tools/signstudio11.png" alt="" />
Figure 5. Select a signing configuration in Android Studio.</p>

<p>Click OK.
You can also specify your signing settings in Gradle configuration files. For more information, see Configuring Gradle Builds.</p>

<p>以上来自<a href="http://developer.android.com/tools/publishing/app-signing.html#studio">Android官网</a></p>
