
### Yum App Builder is a NodeJS based compiler for YumJS component based apps.

__YumJS__ is a reactive JavaScript library for building web apps with the **smallest amount of overhead code** all within a familiar syntax.


Aside from the JQuery like syntax,  __YumJS__ has tons of cool things like function queues, utilities, observers, and stuff for reactivity. You can read more about __YumJS__ on the **[SITE](https://yumjs.net)**  and in my Introducing __YumJS__ Dev.to article **[HERE](https://dev.to/bretgeek/introducing-yumjs-16bi)**.




### Compile Your App with Yum App Builder

Setting up is easy...

__1.__ Install node (if not already installed).

__2.__ Clone the _yumapp_ repo.

```javascript
git clone https://github.com/bretgeek/yumapp.git 
```

__3.__ Navigate to the build directory - yumapp/build.

```javascript
cd yumapp/build
```

__4.__  Run _npm install_ to install the dependencies for minification and that node needs.

```javascript
npm install 
```


__5.__  Run the example app which will launch the boilerplate app in your default browser.

```javascript
node buildyum --min --web 
```


__6.__ Edit the example _App_ to create your own... 

```javascript
cd yumapp/src
```
then edit App.js and the other files. If you mess it up re-clone!


### More ways to build
- Build an un-minified file with __no web__ start  `node buildyum`
- Build an un-minified file with __web__ start  `node buildyum -- --web`
- Build a minified file __with no web__ start `node buildyum --min`
- Build a minified file __with web__ start  `node buildyum --min --web`



## The Output file

Running `node buildyum` without the --web option will give you a notice on the screen as to where to find your output file:

Minifed files are in `../out/chunk.min.js` while un-minified is in `../out/chunk.js`


You can use these output files in your project by first including __YumJS__ in a script tag and then your output file.

Something like:

```Javascript
  <script src='https://cdn.jsdelivr.net/gh/bretgeek/yumjs@main/yum.min.js'></script>
  <script src='https://mycoolsite.com/js/chunk.min.js'></script>
```
 

