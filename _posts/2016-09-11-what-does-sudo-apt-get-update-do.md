---
layout: post
title:  "What does “sudo apt-get update” do?"
categories: linux
tags:  linux
---

* content
{:toc}


In a nutshell, apt-get update doesn't actually install new versions of software.

`apt-get update` downloads the package lists from the repositories and "updates" them to get information on the newest versions of packages and their dependencies. It will do this for all repositories and PPAs. 

<a href="http://linux.die.net/man/8/apt-get" target="_blank">http://linux.die.net/man/8/apt-get</a>

> Used to re-synchronize the package index files from their sources. The indexes of available packages are fetched from the location(s) specified in /etc/apt/sources.list(5). An update should always be performed before an upgrade or dist-upgrade.


Do we always need to run sudo apt-get update command whenever we install packages? What's the disadvantage if we don't do so?

If you do not run that command then you may get an out-of-date package installed. For some packages it's quite important that your package lists be up to date. Examples of such packages include security-critical software.

