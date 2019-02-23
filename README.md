> **Update!!** this repo has been merged to the parent repo [https://github.com/zurb/tribute](https://github.com/zurb/tribute).
you can your normal Tributejs with flag `autocompleteMode:true` to make it function as an autocomplete.

# Tribute autocomplete
This is a fork of [tributejs](https://github.com/zurb/tribute) modified to work as a autocomplete-typehead. Also works with normal @mentions tribute configs also.

Pass `autoCompleteMode:true` to the collection object of Tribute and it should function as a autocomplete.
For rest of the configuration checkout [Tributejs](https://github.com/zurb/tribute).

A cross-browser `autocomplete typeahead` engine written in ES6, no dependencies. Tested in Firefox, Chrome, iOS Safari, Safari, IE 9+, Edge 12+, Android 4+, and Windows Phone.

## Installing
There are a few ways to install Tribute; [Bower](http://bower.io/), as an [NPM Module](https://npmjs.com/package/tributejs-autocomplete), or by [downloading] from the `dist` folder in this repo.

### Bower
Bower is a great way to manage your JS dependencies. You can install Tribute by running the following command:

```shell
bower install tributejs-autocomplete
```

You can then link to Tribute autocomplete in your code with the following markup:

```html
<link rel="stylesheet" href="bower_components/tributejs-autocomplete/dist/tribute.css" />
<script src="bower_components/tributejs-autocomplete/dist/tribute.js"></script>
```

### NPM Module
You can install Tribute by running:

```shell
npm install tributejs-autocomplete
```

Or by adding Tribute autocomplete to your `package.json` file.

Import into your ES6 code.
```js
import Tribute from "tributejs-autocomplete";
```

### Webpack
To add Tribute to your webpack build process, start by adding it to your package.json and running `npm install`.

After installing, you need to update your Babel module loader to not exclude Tribute from being compiled by Webpack:

```js
{
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules\/(?!tributejs)/
}
```

### Download or Clone
Or you can [download the repo](https://github.com/MalayaliRobz/tribute-autocomplete) or clone it localy with this command:

```shell
git clone git@github.com:MalayaliRobz/tribute-autocomplete.git
```

You can then copy the files in the `dist` directory to your project.

```html
<link rel="stylesheet" href="js/tribute.css" />
<script src="js/tribute.js"></script>
```

That's it! Now you are ready to initialize Tribute-autocomplete.
