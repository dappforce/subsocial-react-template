# subsocial-react-example

This repository is a complete boilerplate to build your own dApp with Subsocial.

For a better understanding of the project, please have a look in main Subsocial sources and utils:

⚒ Main Github repo: https://github.com/dappforce

⚒ Subsocial dApp: https://app.subsocial.network/?tab=posts&type=suggested&date=day

⚒ Subsocial SDK: https://github.com/dappforce/subsocial-js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Setup local development env


### Linux

Commands below focus on Linux based OS (Ubuntu 20.04, Debian 9).


#### Git

`sudo apt install git-all`


#### Node / NVM

NVM is a Node Version Manager tool. Using the NVM utility, you can install multiple node.js versions on a single system and switch between them.

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

This will install the nvm script to your user account. To use it, you must first source your .bashrc file:

`source ~/.bashrc`

If you are using the interactive terminal to test installing Node.js with nvm, you will need to source your the ~/.bash_profile file instead. Use the following command to do so:

`source ~/.bash_profile`

Install latest LTS version (you can check with `ǹpm list-remote` command):

`nvm install v14.19.1`


#### Yarn

In order to correctly build the application, Yarn needs to be used:

`npm install yarn -g`
 
If you try to use NPM, you may face issues with some NPM packages.


## Clone repo and install

`git clone https://github.com/dappforce/subsocial-react-example.git && cd subsocial-react-example && yarn install`


## Run dApp in development server

First, run the development server:

`yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Build

Run `yurn run build` to build the project.


## Storybook development server

Run `yarn storybook`. Navigate to [http://localhost:6006](http://localhost:6006).


## Build storybook

Run `yarn build-storybook`.


## Setup in external env

Using free hosting or basic shared hosting is not recommended, as it comes with preinstalled packages and centralized security rules which may block ports or network packages related to blockchain technology.

You can get a VPS (Virtual Private Server) with well-know providers (2vCPU, 4GB RAM recommended).

Steps are the same as with local development env, with additional config depending on your setup:

* domain name
* reverse-proxy Apache/Nginx
* SSL cert
* other running apps

Don't forget to secure server (ufw, fail2ban).


### MacOS

n/a


### Windows

n/a
